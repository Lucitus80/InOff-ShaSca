/**
 * Core dice and action helpers for Shadow Scar.
 *
 * v0.6.4 includes the previous roll/resource passes and adds a guided damage
 * application workflow from weapon chat cards. The system still leaves rules
 * judgment to the table: defense/resistance and final damage are edited before
 * Vitality is reduced.
 */
import { SHADOW_SCAR } from "../config.mjs";

export class ShadowScarRolls {
  /** Returns active Condition items in a template-friendly shape. */
  static getActiveConditions(actor) {
    return actor.items.contents
      .filter((item) => item.type === SHADOW_SCAR.itemTypes.condition && Boolean(item.system?.active))
      .map((item) => ({
        id: item.id,
        name: item.name,
        intensity: Number(item.system?.intensity ?? 0),
        category: item.system?.category ?? "",
        modifier: Number(item.system?.modifier ?? 0),
        penalty: item.system?.penalty ?? ""
      }));
  }

  static getActiveConditionModifier(actor) {
    return this.getActiveConditions(actor).reduce((total, condition) => {
      const modifier = Number(condition.modifier ?? 0);
      return total + (Number.isFinite(modifier) ? modifier : 0);
    }, 0);
  }

  static async rollAttribute({ actor, attributeKey, attributeLabel }) {
    const attributeValue = actor.getAttribute(attributeKey);
    const activeConditions = this.getActiveConditions(actor);
    const conditionModifier = this.getActiveConditionModifier(actor);

    const dialogData = await this.#showAttributeRollDialog({
      actor,
      attributeLabel,
      attributeValue,
      activeConditions,
      conditionModifier
    });

    if (!dialogData) return null;

    const modifier = dialogData.modifier;
    const difficulty = dialogData.difficulty;
    const pool = Math.max(0, attributeValue + modifier);

    const roll = new Roll(`${pool}d6`);
    await roll.evaluate();

    const dice = this.#getDiceResults(roll);
    const successes = this.#countSuccesses(dice);
    const margin = successes - difficulty;
    const success = margin >= 0;

    const content = await renderTemplate(
      "systems/shadow-scar/templates/chat/attribute-roll-card.hbs",
      {
        actor,
        actorName: actor.name,
        attributeKey,
        attributeLabel,
        attributeValue,
        modifier,
        conditionModifier,
        activeConditions,
        difficulty,
        margin,
        pool,
        dice,
        successes,
        success,
        resultLabel: success ? "Success" : "Failure"
      }
    );

    return roll.toMessage({
      speaker: ChatMessage.getSpeaker({ actor }),
      flavor: `${actor.name} rolls ${attributeLabel}`,
      content
    });
  }

  static async rollSkill({ actor, attributeKey, skillKey, attributeLabel, skillLabel }) {
    const attributeValue = actor.getAttribute(attributeKey);
    const skillValue = actor.getSkill(attributeKey, skillKey);
    const activeConditions = this.getActiveConditions(actor);
    const conditionModifier = this.getActiveConditionModifier(actor);

    const dialogData = await this.#showSkillRollDialog({
      actor,
      attributeLabel,
      skillLabel,
      attributeValue,
      skillValue,
      activeConditions,
      conditionModifier
    });

    if (!dialogData) return null;

    const modifier = dialogData.modifier;
    const difficulty = dialogData.difficulty;
    const pool = Math.max(0, attributeValue + skillValue + modifier);

    const roll = new Roll(`${pool}d6`);
    await roll.evaluate();

    const dice = this.#getDiceResults(roll);
    const successes = this.#countSuccesses(dice);
    const margin = successes - difficulty;
    const success = margin >= 0;

    const content = await renderTemplate(
      "systems/shadow-scar/templates/chat/skill-roll-card.hbs",
      {
        actor,
        actorName: actor.name,
        attributeKey,
        attributeLabel,
        attributeValue,
        skillKey,
        skillLabel,
        skillValue,
        modifier,
        conditionModifier,
        activeConditions,
        difficulty,
        margin,
        pool,
        dice,
        successes,
        success,
        resultLabel: success ? "Success" : "Failure"
      }
    );

    return roll.toMessage({
      speaker: ChatMessage.getSpeaker({ actor }),
      flavor: `${actor.name} rolls ${skillLabel} with ${attributeLabel}`,
      content
    });
  }

  /** Rolls a weapon from the actor sheet using item.system.skill. */
  static async rollWeapon({ actor, item }) {
    const skillRef = String(item.system?.skill ?? "");
    const resolvedSkill = this.#resolveSkillReference(skillRef);

    if (!resolvedSkill) {
      ui.notifications?.warn(`${item.name} has no valid attack skill configured.`);
      return null;
    }

    const { attributeKey, skillKey } = resolvedSkill;
    const attributeLabel = SHADOW_SCAR.attributes[attributeKey] ?? attributeKey;
    const skillLabel = SHADOW_SCAR.skills[attributeKey]?.[skillKey] ?? skillKey;
    const attributeValue = actor.getAttribute(attributeKey);
    const skillValue = actor.getSkill(attributeKey, skillKey);
    const activeConditions = this.getActiveConditions(actor);
    const conditionModifier = this.getActiveConditionModifier(actor);
    const weaponDamage = String(item.system?.damage ?? "");
    const numericDamage = this.#parseDamageValue(weaponDamage);

    const dialogData = await this.#showWeaponRollDialog({
      actor,
      item,
      attributeLabel,
      skillLabel,
      attributeValue,
      skillValue,
      activeConditions,
      conditionModifier
    });

    if (!dialogData) return null;

    const modifier = dialogData.modifier;
    const difficulty = dialogData.difficulty;
    const pool = Math.max(0, attributeValue + skillValue + modifier);

    const roll = new Roll(`${pool}d6`);
    await roll.evaluate();

    const dice = this.#getDiceResults(roll);
    const successes = this.#countSuccesses(dice);
    const margin = successes - difficulty;
    const success = margin >= 0;

    const content = await renderTemplate(
      "systems/shadow-scar/templates/chat/weapon-roll-card.hbs",
      {
        actor,
        actorName: actor.name,
        actorUuid: actor.uuid,
        item,
        itemUuid: item.uuid,
        weaponName: item.name,
        weaponDamage,
        numericDamage,
        hasDamage: weaponDamage.trim().length > 0,
        range: item.system?.range ?? "",
        category: item.system?.category ?? "",
        attributeKey,
        attributeLabel,
        attributeValue,
        skillKey,
        skillLabel,
        skillValue,
        modifier,
        conditionModifier,
        activeConditions,
        difficulty,
        margin,
        pool,
        dice,
        successes,
        success,
        resultLabel: success ? "Success" : "Failure"
      }
    );

    return roll.toMessage({
      speaker: ChatMessage.getSpeaker({ actor }),
      flavor: `${actor.name} attacks with ${item.name}`,
      content
    });
  }

  /** Creates a chat card for using a Gear item. */
  static async useGearItem({ actor, item }) {
    const content = await renderTemplate(
      "systems/shadow-scar/templates/chat/gear-use-card.hbs",
      {
        actor,
        actorName: actor.name,
        item,
        itemName: item.name,
        category: item.system?.category ?? "",
        quantity: Number(item.system?.quantity ?? 0),
        equipped: Boolean(item.system?.equipped),
        effect: item.system?.effect ?? "",
        tags: item.system?.tags ?? ""
      }
    );

    return ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor }),
      flavor: `${actor.name} uses ${item.name}`,
      content
    });
  }

  /** Uses a Technique or Mikkyo item and optionally spends Ki. */
  static async useKiItem({ actor, item }) {
    const kiCost = Math.max(0, Number(item.system?.kiCost ?? 0));
    const currentKi = Math.max(0, Number(actor.system?.resources?.ki?.value ?? 0));
    const maxKi = Math.max(0, Number(actor.system?.resources?.ki?.max ?? 0));
    const itemTypeLabel = item.type === "mikkyo" ? "Mikkyo" : "Technique";

    const dialogData = await this.#showKiItemDialog({ actor, item, itemTypeLabel, kiCost, currentKi, maxKi });
    if (!dialogData) return null;

    const spendKi = Boolean(dialogData.spendKi);
    const ignoreInsufficientKi = Boolean(dialogData.ignoreInsufficientKi);

    if (spendKi && kiCost > currentKi && !ignoreInsufficientKi) {
      ui.notifications?.warn(`${actor.name} does not have enough Ki Reserve for ${item.name}.`);
      return null;
    }

    let remainingKi = currentKi;
    if (spendKi) {
      remainingKi = Math.max(0, currentKi - kiCost);
      await actor.update({ "system.resources.ki.value": remainingKi });
    }

    const content = await renderTemplate(
      "systems/shadow-scar/templates/chat/ki-item-use-card.hbs",
      {
        actor,
        actorName: actor.name,
        item,
        itemName: item.name,
        itemType: item.type,
        itemTypeLabel,
        kiCost,
        currentKi,
        remainingKi,
        spendKi,
        timing: item.system?.timing,
        trigger: item.system?.trigger,
        range: item.system?.range,
        duration: item.system?.duration,
        effect: item.system?.effect,
        tags: item.system?.tags
      }
    );

    return ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor }),
      flavor: `${actor.name} uses ${item.name}`,
      content
    });
  }

  static async changeResource(actor, resourceKey, delta) {
    const current = Number(foundry.utils.getProperty(actor.system, `resources.${resourceKey}.value`) ?? 0);
    const max = Number(foundry.utils.getProperty(actor.system, `resources.${resourceKey}.max`) ?? 0);
    const next = this.#clampResource(current + delta, max);

    return actor.update({ [`system.resources.${resourceKey}.value`]: next });
  }

  static async setResourceToMax(actor, resourceKey) {
    const max = Number(foundry.utils.getProperty(actor.system, `resources.${resourceKey}.max`) ?? 0);
    return actor.update({ [`system.resources.${resourceKey}.value`]: Math.max(0, max) });
  }

  static async openVitalityChangeDialog(actor, mode) {
    const current = Number(actor.system?.resources?.vitality?.value ?? 0);
    const max = Number(actor.system?.resources?.vitality?.max ?? 0);
    const isDamage = mode === "damage";

    const content = await renderTemplate(
      "systems/shadow-scar/templates/dialogs/resource-change-dialog.hbs",
      {
        actor,
        actorName: actor.name,
        mode,
        title: isDamage ? "Apply Damage" : "Heal Vitality",
        amountLabel: isDamage ? "Damage" : "Healing",
        current,
        max
      }
    );

    const dialogData = await new Promise((resolve) => {
      let resolved = false;
      const finish = (value) => {
        if (resolved) return;
        resolved = true;
        resolve(value);
      };

      new Dialog({
        title: isDamage ? "Apply Damage" : "Heal Vitality",
        content,
        buttons: {
          apply: {
            icon: isDamage ? '<i class="fas fa-heart-crack"></i>' : '<i class="fas fa-heart"></i>',
            label: isDamage ? "Apply Damage" : "Heal",
            callback: (html) => {
              const amount = this.#readNumber(html, "amount", 0);
              finish({ amount: Math.max(0, amount) });
            }
          },
          cancel: {
            icon: '<i class="fas fa-times"></i>',
            label: "Cancel",
            callback: () => finish(null)
          }
        },
        default: "apply",
        close: () => finish(null)
      }).render(true);
    });

    if (!dialogData) return null;

    const signedDelta = isDamage ? -dialogData.amount : dialogData.amount;
    return this.changeResource(actor, "vitality", signedDelta);
  }

  /** Adds chat-card button behavior after Foundry renders a chat message. */
  static activateChatListeners(html, _message) {
    const root = html?.find ? html : $(html);
    root.find("[data-action='shadow-scar-apply-damage']").on("click", this.#onApplyDamageClick.bind(this));
  }

  static #countSuccesses(dice) {
    return dice.reduce((total, die) => {
      if (die === 6) return total + 2;
      if (die >= 4) return total + 1;
      return total;
    }, 0);
  }

  static #getDiceResults(roll) {
    return roll.dice.flatMap((die) => die.results.map((result) => Number(result.result)));
  }

  static #resolveSkillReference(skillRef) {
    const [attributeKey, skillKey] = String(skillRef ?? "").split(".");
    if (!attributeKey || !skillKey) return null;
    if (!SHADOW_SCAR.attributes[attributeKey]) return null;
    if (!SHADOW_SCAR.skills[attributeKey]?.[skillKey]) return null;
    return { attributeKey, skillKey };
  }

  static #parseDamageValue(damageText) {
    const match = String(damageText ?? "").match(/-?\d+/);
    if (!match) return 0;
    const value = Number(match[0]);
    return Number.isFinite(value) ? Math.max(0, value) : 0;
  }

  static #clampResource(value, max) {
    const safeMax = Math.max(0, Number(max ?? 0));
    const safeValue = Number(value ?? 0);
    return Math.min(safeMax, Math.max(0, Number.isFinite(safeValue) ? safeValue : 0));
  }

  static #readNumber(html, name, fallback = 0) {
    const raw = html.find(`[name='${name}']`).val();
    const value = Number(raw ?? fallback);
    return Number.isFinite(value) ? value : fallback;
  }

  static async #showKiItemDialog({ actor, item, itemTypeLabel, kiCost, currentKi, maxKi }) {
    const content = await renderTemplate(
      "systems/shadow-scar/templates/dialogs/ki-item-use-dialog.hbs",
      {
        actor,
        actorName: actor.name,
        item,
        itemName: item.name,
        itemTypeLabel,
        kiCost,
        currentKi,
        maxKi,
        hasCost: kiCost > 0,
        enoughKi: currentKi >= kiCost
      }
    );

    return new Promise((resolve) => {
      let resolved = false;
      const finish = (value) => {
        if (resolved) return;
        resolved = true;
        resolve(value);
      };

      new Dialog({
        title: `Use ${item.name}`,
        content,
        buttons: {
          use: {
            icon: '<i class="fas fa-bolt"></i>',
            label: "Use",
            callback: (html) => {
              const spendKi = html.find("[name='spendKi']").is(":checked");
              const ignoreInsufficientKi = html.find("[name='ignoreInsufficientKi']").is(":checked");
              finish({ spendKi, ignoreInsufficientKi });
            }
          },
          cancel: {
            icon: '<i class="fas fa-times"></i>',
            label: "Cancel",
            callback: () => finish(null)
          }
        },
        default: "use",
        close: () => finish(null)
      }).render(true);
    });
  }

  static async #showAttributeRollDialog({ actor, attributeLabel, attributeValue, activeConditions, conditionModifier }) {
    const content = await renderTemplate(
      "systems/shadow-scar/templates/dialogs/attribute-roll-dialog.hbs",
      {
        actor,
        actorName: actor.name,
        attributeLabel,
        attributeValue,
        activeConditions,
        conditionModifier
      }
    );

    return this.#showRollDialog({
      title: `${attributeLabel} Test`,
      content,
      defaultModifier: conditionModifier
    });
  }

  static async #showSkillRollDialog({ actor, attributeLabel, skillLabel, attributeValue, skillValue, activeConditions, conditionModifier }) {
    const content = await renderTemplate(
      "systems/shadow-scar/templates/dialogs/skill-roll-dialog.hbs",
      {
        actor,
        actorName: actor.name,
        attributeLabel,
        skillLabel,
        attributeValue,
        skillValue,
        basePool: attributeValue + skillValue,
        activeConditions,
        conditionModifier
      }
    );

    return this.#showRollDialog({
      title: `${skillLabel} Check`,
      content,
      defaultModifier: conditionModifier
    });
  }

  static async #showWeaponRollDialog({ actor, item, attributeLabel, skillLabel, attributeValue, skillValue, activeConditions, conditionModifier }) {
    const content = await renderTemplate(
      "systems/shadow-scar/templates/dialogs/weapon-roll-dialog.hbs",
      {
        actor,
        actorName: actor.name,
        item,
        weaponName: item.name,
        weaponDamage: item.system?.damage ?? "",
        range: item.system?.range ?? "",
        attributeLabel,
        skillLabel,
        attributeValue,
        skillValue,
        basePool: attributeValue + skillValue,
        activeConditions,
        conditionModifier
      }
    );

    return this.#showRollDialog({
      title: `${item.name} Attack`,
      content,
      defaultModifier: conditionModifier
    });
  }

  static async #showRollDialog({ title, content, defaultModifier = 0 }) {
    return new Promise((resolve) => {
      let resolved = false;
      const finish = (value) => {
        if (resolved) return;
        resolved = true;
        resolve(value);
      };

      new Dialog({
        title,
        content,
        buttons: {
          roll: {
            icon: '<i class="fas fa-dice-d6"></i>',
            label: "Roll",
            callback: (html) => {
              const modifier = this.#readNumber(html, "modifier", defaultModifier);
              const difficulty = this.#readNumber(html, "difficulty", 1);

              finish({
                modifier,
                difficulty: Math.max(0, difficulty)
              });
            }
          },
          cancel: {
            icon: '<i class="fas fa-times"></i>',
            label: "Cancel",
            callback: () => finish(null)
          }
        },
        default: "roll",
        close: () => finish(null)
      }).render(true);
    });
  }

  static #getDamageTargetActors() {
    const targetedTokens = Array.from(game.user?.targets ?? []);
    const controlledTokens = Array.from(canvas?.tokens?.controlled ?? []);
    const tokens = targetedTokens.length > 0 ? targetedTokens : controlledTokens;
    const actorsById = new Map();

    for (const token of tokens) {
      const actor = token?.actor;
      if (!actor) continue;
      actorsById.set(actor.id, actor);
    }

    return Array.from(actorsById.values());
  }

  static async #onApplyDamageClick(event) {
    event.preventDefault();

    const button = event.currentTarget;
    const baseDamage = Math.max(0, Number(button.dataset.baseDamage ?? 0));
    const damageText = button.dataset.damageText ?? "";
    const margin = Number(button.dataset.margin ?? 0);
    const weaponName = button.dataset.weaponName ?? "Weapon";
    const targetActors = this.#getDamageTargetActors();

    if (targetActors.length === 0) {
      ui.notifications?.warn("Target or select one or more tokens before applying damage.");
      return null;
    }

    const dialogData = await this.#showApplyDamageDialog({
      weaponName,
      targetActors,
      baseDamage,
      damageText,
      margin
    });

    if (!dialogData) return null;

    const finalDamage = Math.max(0, Number(dialogData.finalDamage ?? 0));
    const results = [];

    for (const actor of targetActors) {
      const current = Number(actor.system?.resources?.vitality?.value ?? 0);
      const max = Number(actor.system?.resources?.vitality?.max ?? 0);
      const next = this.#clampResource(current - finalDamage, max);
      await actor.update({ "system.resources.vitality.value": next });
      results.push({ name: actor.name, before: current, after: next, damage: finalDamage });
    }

    const rows = results
      .map((result) => `<li><strong>${result.name}</strong>: ${result.before} → ${result.after} Vitality (${result.damage} damage)</li>`)
      .join("");

    return ChatMessage.create({
      speaker: ChatMessage.getSpeaker(),
      flavor: `Damage applied from ${weaponName}`,
      content: `<div class="shadow-scar chat-card damage-application-card"><header><h2>Damage Applied</h2><p>${weaponName}</p></header><ul>${rows}</ul></div>`
    });
  }

  static async #showApplyDamageDialog({ weaponName, targetActors, baseDamage, damageText, margin }) {
    const content = await renderTemplate(
      "systems/shadow-scar/templates/dialogs/damage-application-dialog.hbs",
      {
        weaponName,
        targetNames: targetActors.map((actor) => actor.name).join(", "),
        baseDamage,
        damageText,
        margin,
        finalDamage: baseDamage
      }
    );

    return new Promise((resolve) => {
      let resolved = false;
      const finish = (value) => {
        if (resolved) return;
        resolved = true;
        resolve(value);
      };

      new Dialog({
        title: `Apply Damage: ${weaponName}`,
        content,
        buttons: {
          apply: {
            icon: '<i class="fas fa-heart-crack"></i>',
            label: "Apply",
            callback: (html) => {
              const finalDamage = this.#readNumber(html, "finalDamage", baseDamage);
              finish({ finalDamage });
            }
          },
          cancel: {
            icon: '<i class="fas fa-times"></i>',
            label: "Cancel",
            callback: () => finish(null)
          }
        },
        default: "apply",
        close: () => finish(null)
      }).render(true);
    });
  }
}

export async function rollAttribute(actor, attributeKey, attributeLabel) {
  return ShadowScarRolls.rollAttribute({ actor, attributeKey, attributeLabel });
}

export async function rollSkill(actor, attributeKey, skillKey, attributeLabel, skillLabel) {
  return ShadowScarRolls.rollSkill({ actor, attributeKey, skillKey, attributeLabel, skillLabel });
}

export async function rollWeapon(actor, item) {
  return ShadowScarRolls.rollWeapon({ actor, item });
}

export async function useGearItem(actor, item) {
  return ShadowScarRolls.useGearItem({ actor, item });
}

export async function useKiItem(actor, item) {
  return ShadowScarRolls.useKiItem({ actor, item });
}

export function getActiveConditions(actor) {
  return ShadowScarRolls.getActiveConditions(actor);
}

export async function changeResource(actor, resourceKey, delta) {
  return ShadowScarRolls.changeResource(actor, resourceKey, delta);
}

export async function setResourceToMax(actor, resourceKey) {
  return ShadowScarRolls.setResourceToMax(actor, resourceKey);
}

export async function openVitalityChangeDialog(actor, mode) {
  return ShadowScarRolls.openVitalityChangeDialog(actor, mode);
}
