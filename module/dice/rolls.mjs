/**
 * Würfel-Hilfsfunktionen für Shadow Scar.
 *
 * Warum eine eigene Datei?
 * ------------------------
 * Würfelmechanik wird im Laufe der Systementwicklung oft angepasst.
 * Wenn der Charakterbogen direkt selbst würfeln würde, müssten wir später
 * viele Stellen anfassen. Stattdessen ruft der Bogen nur diese Datei auf.
 *
 * Stand v0.51:
 * - Attributproben und Skillproben nutzen dieselbe d6-Erfolgsmechanik.
 * - Attributprobe: Würfelpool = Attribut + Bonus/Malus.
 * - Skillprobe: Würfelpool = Attribut + Skill + Bonus/Malus.
 * - 1–3 zählt als 0 Erfolge, 4–5 zählt als 1 Erfolg, 6 zählt als 2 Erfolge.
 * - Der Dialog erlaubt eine Schwierigkeit, damit die Chatkarte Erfolg/Misserfolg
 *   anzeigen kann.
 */
export class ShadowScarRolls {
  /**
   * Führt eine reine Attributprobe aus.
   *
   * Offizielle Shadow-Scar-Logik für reine Attributwürfe:
   * - Würfle eine Anzahl W6 gleich dem Attributwert plus Bonus/Malus.
   * - 1–3 zählen als 0 Erfolge.
   * - 4–5 zählen als 1 Erfolg.
   * - 6 zählt als 2 Erfolge.
   *
   * Der optionale Bonus/Malus verändert die Anzahl der Würfel, nicht das
   * Ergebnis eines einzelnen Würfels. Negative Pools werden auf 0 begrenzt.
   */
  static async rollAttribute({ actor, attributeKey, attributeLabel }) {
    const attributeValue = actor.getAttribute(attributeKey);

    const dialogData = await this.#showAttributeRollDialog({
      actor,
      attributeLabel,
      attributeValue
    });

    if (!dialogData) return null;

    const modifier = dialogData.modifier;
    const difficulty = dialogData.difficulty;
    const pool = Math.max(0, attributeValue + modifier);

    const roll = new Roll(`${pool}d6`);
    await roll.evaluate();

    const dice = this.#getDiceResults(roll);
    const successes = this.#countSuccesses(dice);
    const success = successes >= difficulty;

    const content = await renderTemplate(
      "systems/shadow-scar/templates/chat/attribute-roll-card.hbs",
      {
        actor,
        actorName: actor.name,
        attributeKey,
        attributeLabel,
        attributeValue,
        modifier,
        difficulty,
        pool,
        dice,
        successes,
        success,
        resultLabel: success ? "Success" : "Failure",
        activeConditions: this.#getActiveConditionSummaries(actor)
      }
    );

    return roll.toMessage({
      speaker: ChatMessage.getSpeaker({ actor }),
      flavor: `${actor.name} rolls ${attributeLabel}`,
      content
    });
  }

  /**
   * Führt eine Skillprobe aus.
   *
   * @param {object} options
   * @param {Actor} options.actor - Der Actor, der würfelt.
   * @param {string} options.attributeKey - Zugehöriges Attribut: mind/body/spirit.
   * @param {string} options.skillKey - Technischer Skill-Schlüssel, z. B. awareness.
   * @param {string} options.attributeLabel - Lokalisierter Attributname.
   * @param {string} options.skillLabel - Lokalisierter Skillname.
   * @returns {Promise<ChatMessage|null>}
   */
  static async rollSkill({ actor, attributeKey, skillKey, attributeLabel, skillLabel }) {
    const attributeValue = actor.getAttribute(attributeKey);
    const skillValue = actor.getSkill(attributeKey, skillKey);

    const dialogData = await this.#showSkillRollDialog({
      actor,
      attributeLabel,
      skillLabel,
      attributeValue,
      skillValue
    });

    if (!dialogData) return null;

    const modifier = dialogData.modifier;
    const difficulty = dialogData.difficulty;

    /**
     * Der Würfelpool ist Attribut + Skill + situativer Bonus/Malus.
     * Math.max(0, ...) verhindert negative Würfelpools.
     */
    const pool = Math.max(0, attributeValue + skillValue + modifier);

    /**
     * Foundry kann beliebige Würfelformeln auswerten. Wir würfeln hier nur den
     * Rohpool, zählen die Erfolge aber selbst, weil 6er zwei Erfolge zählen.
     */
    const roll = new Roll(`${pool}d6`);
    await roll.evaluate();

    const dice = this.#getDiceResults(roll);
    const successes = this.#countSuccesses(dice);
    const success = successes >= difficulty;

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
        difficulty,
        pool,
        dice,
        successes,
        success,
        resultLabel: success ? "Success" : "Failure",
        activeConditions: this.#getActiveConditionSummaries(actor)
      }
    );

    return roll.toMessage({
      speaker: ChatMessage.getSpeaker({ actor }),
      flavor: `${actor.name} rolls ${skillLabel} with ${attributeLabel}`,
      content
    });
  }

  /**
   * Uses a Technique or Mikkyo item.
   *
   * This is intentionally separate from rollSkill(). A Technique is not always
   * a test; sometimes it is a declared ability, a passive effect, or a special
   * action. v0.58 keeps Techniques free of Ki costs while Mikkyo can spend Ki.
   *
   * @param {object} options
   * @param {Actor} options.actor - Character using the item.
   * @param {Item} options.item - Embedded Technique or Mikkyo item.
   * @returns {Promise<ChatMessage|null>}
   */

  /**
   * Rolls an attack with a Weapon item.
   *
   * v0.60 keeps weapon attacks on the existing Shadow Scar d6-pool mechanic:
   * Attribute + Skill + bonus/penalty. The weapon stores its attack skill as
   * e.g. "body.melee" or "mind.marksmanship".
   */
  static async rollWeapon({ actor, item }) {
    const skillPath = String(item.system?.skill || "body.melee");
    const [attributeKey = "body", skillKey = "melee"] = skillPath.split(".");

    const attributeLabel = game.shadowScar?.config?.attributes?.[attributeKey] ?? attributeKey;
    const skillLabel = game.shadowScar?.config?.skills?.[attributeKey]?.[skillKey] ?? skillKey;
    const attributeValue = actor.getAttribute(attributeKey);
    const skillValue = actor.getSkill(attributeKey, skillKey);

    const dialogData = await this.#showWeaponRollDialog({
      actor,
      item,
      attributeLabel,
      skillLabel,
      attributeValue,
      skillValue
    });

    if (!dialogData) return null;

    const modifier = dialogData.modifier;
    const difficulty = dialogData.difficulty;
    const pool = Math.max(0, attributeValue + skillValue + modifier);

    const roll = new Roll(`${pool}d6`);
    await roll.evaluate();

    const dice = this.#getDiceResults(roll);
    const successes = this.#countSuccesses(dice);
    const success = successes >= difficulty;

    const content = await renderTemplate(
      "systems/shadow-scar/templates/chat/weapon-roll-card.hbs",
      {
        actor,
        actorName: actor.name,
        item,
        weaponName: item.name,
        attributeKey,
        attributeLabel,
        attributeValue,
        skillKey,
        skillLabel,
        skillValue,
        modifier,
        difficulty,
        pool,
        dice,
        successes,
        success,
        resultLabel: success ? "Success" : "Failure",
        damage: item.system?.damage,
        range: item.system?.range,
        category: item.system?.category,
        tags: item.system?.tags,
        activeConditions: this.#getActiveConditionSummaries(actor)
      }
    );

    return roll.toMessage({
      speaker: ChatMessage.getSpeaker({ actor }),
      flavor: `${actor.name} attacks with ${item.name}`,
      content
    });
  }

  /**
   * Posts a general Gear use card to chat.
   *
   * Gear does not roll by default; it may be a tool, armor-like object,
   * consumable, clue, or other carried object.
   */
  static async useGear({ actor, item }) {
    const content = await renderTemplate(
      "systems/shadow-scar/templates/chat/gear-use-card.hbs",
      {
        actor,
        actorName: actor.name,
        item,
        itemName: item.name,
        category: item.system?.category,
        quantity: item.system?.quantity,
        equipped: item.system?.equipped,
        tags: item.system?.tags,
        effect: item.system?.effect,
        description: item.system?.description
      }
    );

    return ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor }),
      flavor: `${actor.name} uses ${item.name}`,
      content
    });
  }

  static async useKiItem({ actor, item }) {
    const usesKi = item.type === "mikkyo";
    const kiCost = usesKi ? Math.max(0, Number(item.system?.kiCost ?? 0)) : 0;
    const currentKi = Math.max(0, Number(actor.system?.resources?.ki?.value ?? 0));
    const maxKi = Math.max(0, Number(actor.system?.resources?.ki?.max ?? 0));
    const itemTypeLabel = item.type === "mikkyo" ? "Mikkyo" : "Technique";

    const dialogData = await this.#showKiItemDialog({ actor, item, itemTypeLabel, usesKi, kiCost, currentKi, maxKi });
    if (!dialogData) return null;

    const spendKi = usesKi && Boolean(dialogData.spendKi);
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
        usesKi,
        kiCost,
        currentKi,
        remainingKi,
        spendKi,
        rank: item.system?.rank,
        origin: item.system?.origin,
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

  /**
   * Summarizes currently active Condition items for roll dialogs and chat cards.
   * Conditions are not automatically applied yet because their penalty field is
   * intentionally free text. The summary keeps their mechanical notes visible
   * while the player enters the bonus/penalty manually.
   */
  static #getActiveConditionSummaries(actor) {
    return actor.items
      .filter((item) => item.type === "condition" && item.system?.active)
      .map((item) => ({
        name: item.name,
        intensity: item.system?.intensity,
        category: item.system?.category,
        penalty: item.system?.penalty
      }));
  }

  /**
   * Zählt die Erfolge nach Shadow-Scar-Mechanik.
   *
   * Diese Hilfsfunktion wird von Attribut- und Skillwürfen gemeinsam benutzt,
   * damit die Erfolgslogik nur an einer Stelle gepflegt werden muss.
   */
  static #countSuccesses(dice) {
    return dice.reduce((total, die) => {
      if (die === 6) return total + 2;
      if (die >= 4) return total + 1;
      return total;
    }, 0);
  }

  /**
   * Extrahiert die einzelnen Würfelergebnisse aus einem Foundry Roll-Objekt.
   */
  static #getDiceResults(roll) {
    return roll.dice.flatMap((die) => die.results.map((result) => Number(result.result)));
  }

  static async #showWeaponRollDialog({ actor, item, attributeLabel, skillLabel, attributeValue, skillValue }) {
    const content = await renderTemplate(
      "systems/shadow-scar/templates/dialogs/weapon-roll-dialog.hbs",
      {
        actor,
        actorName: actor.name,
        item,
        weaponName: item.name,
        attributeLabel,
        skillLabel,
        attributeValue,
        skillValue,
        basePool: attributeValue + skillValue,
        damage: item.system?.damage,
        range: item.system?.range,
        tags: item.system?.tags,
        activeConditions: this.#getActiveConditionSummaries(actor)
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
        title: `${item.name} Attack`,
        content,
        buttons: {
          roll: {
            icon: '<i class="fas fa-dice-d6"></i>',
            label: "Roll Attack",
            callback: (html) => {
              const rawModifier = html.find("[name='modifier']").val();
              const rawDifficulty = html.find("[name='difficulty']").val();

              const modifier = Number(rawModifier || 0);
              const difficulty = Number(rawDifficulty || 1);

              finish({
                modifier: Number.isFinite(modifier) ? modifier : 0,
                difficulty: Number.isFinite(difficulty) ? Math.max(0, difficulty) : 1
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

  static async #showKiItemDialog({ actor, item, itemTypeLabel, usesKi, kiCost, currentKi, maxKi }) {
    const content = await renderTemplate(
      "systems/shadow-scar/templates/dialogs/ki-item-use-dialog.hbs",
      {
        actor,
        actorName: actor.name,
        item,
        itemName: item.name,
        itemTypeLabel,
        usesKi,
        kiCost,
        currentKi,
        maxKi,
        hasCost: usesKi && kiCost > 0,
        enoughKi: !usesKi || currentKi >= kiCost
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
              const spendKi = usesKi && html.find("[name='spendKi']").is(":checked");
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

  static async #showAttributeRollDialog({ actor, attributeLabel, attributeValue }) {
    const content = await renderTemplate(
      "systems/shadow-scar/templates/dialogs/attribute-roll-dialog.hbs",
      {
        actor,
        actorName: actor.name,
        attributeLabel,
        attributeValue,
        activeConditions: this.#getActiveConditionSummaries(actor)
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
        title: `${attributeLabel} Test`,
        content,
        buttons: {
          roll: {
            icon: '<i class="fas fa-dice-d6"></i>',
            label: "Roll",
            callback: (html) => {
              const rawModifier = html.find("[name='modifier']").val();
              const rawDifficulty = html.find("[name='difficulty']").val();

              const modifier = Number(rawModifier || 0);
              const difficulty = Number(rawDifficulty || 1);

              finish({
                modifier: Number.isFinite(modifier) ? modifier : 0,
                difficulty: Number.isFinite(difficulty) ? Math.max(0, difficulty) : 1
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

  /**
   * Zeigt den Skillwurf-Dialog.
   *
   * Der Dialog liefert nur Eingaben zurück. Er würfelt nicht selbst. Dadurch
   * bleibt die Logik zum Würfeln vollständig in rollSkill().
   */
  static async #showSkillRollDialog({ actor, attributeLabel, skillLabel, attributeValue, skillValue }) {
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
        activeConditions: this.#getActiveConditionSummaries(actor)
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
        title: `${skillLabel} Check`,
        content,
        buttons: {
          roll: {
            icon: '<i class="fas fa-dice-d6"></i>',
            label: "Roll",
            callback: (html) => {
              const rawModifier = html.find("[name='modifier']").val();
              const rawDifficulty = html.find("[name='difficulty']").val();

              const modifier = Number(rawModifier || 0);
              const difficulty = Number(rawDifficulty || 1);

              finish({
                modifier: Number.isFinite(modifier) ? modifier : 0,
                difficulty: Number.isFinite(difficulty) ? Math.max(0, difficulty) : 1
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
}

/**
 * Kompatibilitätsfunktion für den bestehenden Sheet-Code.
 */
export async function rollAttribute(actor, attributeKey, attributeLabel) {
  return ShadowScarRolls.rollAttribute({ actor, attributeKey, attributeLabel });
}

/**
 * Kleine Wrapperfunktion, damit der ActorSheet-Code kurz und lesbar bleibt.
 */
export async function rollSkill(actor, attributeKey, skillKey, attributeLabel, skillLabel) {
  return ShadowScarRolls.rollSkill({ actor, attributeKey, skillKey, attributeLabel, skillLabel });
}

/**
 * Wrapper for using a Technique or Mikkyo item from an Actor sheet.
 */
export async function useKiItem(actor, item) {
  return ShadowScarRolls.useKiItem({ actor, item });
}

/**
 * Wrapper for rolling a Weapon attack from an Actor sheet.
 */
export async function rollWeapon(actor, item) {
  return ShadowScarRolls.rollWeapon({ actor, item });
}

/**
 * Wrapper for posting Gear use from an Actor sheet.
 */
export async function useGear(actor, item) {
  return ShadowScarRolls.useGear({ actor, item });
}
