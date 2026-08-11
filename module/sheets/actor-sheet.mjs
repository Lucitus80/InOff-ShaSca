/**
 * Actor sheet for Shadow Scar.
 *
 * v0.7.0 adds clickable rating symbols for attributes and skills while reusing
 * the same roll, item, resource and condition handlers as before.
 */
import { SHADOW_SCAR } from "../config.mjs";
import {
  changeResource,
  getActiveConditions,
  openVitalityChangeDialog,
  rollAttribute,
  rollSkill,
  rollWeapon,
  setResourceToMax,
  useGearItem,
  useKiItem
} from "../dice/rolls.mjs";

const CHARACTER_TABS = ["general", "techniques", "equipment", "background", "conditions"];
const NPC_TABS = ["combat", "equipment", "conditions", "notes"];

export class ShadowScarActorSheet extends ActorSheet {
  _activeTab = "general";

  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["shadow-scar", "sheet", "actor"],
      template: "systems/shadow-scar/templates/actor/character-sheet.hbs",
      width: 920,
      height: 860,
      resizable: true
    });
  }

  get template() {
    if (this.actor.type === SHADOW_SCAR.actorTypes.npc) {
      return "systems/shadow-scar/templates/actor/npc-sheet.hbs";
    }

    return "systems/shadow-scar/templates/actor/character-sheet.hbs";
  }

  async getData(options = {}) {
    const context = await super.getData(options);
    const isNPC = this.actor.type === SHADOW_SCAR.actorTypes.npc;
    const validTabs = isNPC ? NPC_TABS : CHARACTER_TABS;

    if (!validTabs.includes(this._activeTab)) {
      this._activeTab = isNPC ? "combat" : "general";
    }

    context.config = SHADOW_SCAR;
    context.system = this.actor.system;
    context.isNPC = isNPC;
    context.isCharacter = !isNPC;
    context.actorTypeLabel = SHADOW_SCAR.actorTypeLabels[this.actor.type] ?? this.actor.type;
    context.activeTab = this._activeTab;
    context.activeConditions = getActiveConditions(this.actor);

    const items = this.actor.items.contents;

    context.itemsByType = {
      gear: items.filter((item) => item.type === SHADOW_SCAR.itemTypes.gear),
      weapon: items.filter((item) => item.type === SHADOW_SCAR.itemTypes.weapon),
      technique: items.filter((item) => item.type === SHADOW_SCAR.itemTypes.technique),
      mikkyo: items.filter((item) => item.type === SHADOW_SCAR.itemTypes.mikkyo),
      condition: items.filter((item) => item.type === SHADOW_SCAR.itemTypes.condition),
      quirk: items.filter((item) => item.type === SHADOW_SCAR.itemTypes.quirk),
      homelandAbility: items.filter((item) => item.type === SHADOW_SCAR.itemTypes.homelandAbility)
    };

    context.equippedWeapons = context.itemsByType.weapon.filter((item) => Boolean(item.system?.equipped));
    context.equippedGear = context.itemsByType.gear.filter((item) => Boolean(item.system?.equipped));
    context.protectionGear = context.equippedGear.filter((item) => this.#hasProtection(item));
    context.npcKeySkills = isNPC ? this.#buildNPCKeySkills() : [];
    context.npcThreatLevelLabel = SHADOW_SCAR.npcThreatLevels[this.actor.system?.npc?.threatLevel] ?? this.actor.system?.npc?.threatLevel ?? "";

    return context;
  }

  activateListeners(html) {
    super.activateListeners(html);

    html.find("[data-action='tab']").on("click", this._onTabClick.bind(this));

    if (!this.isEditable) return;

    html.find("[data-action='roll-attribute']").on("click", this._onRollAttribute.bind(this));
    html.find("[data-action='roll-skill']").on("click", this._onRollSkill.bind(this));
    html.find("[data-action='roll-weapon']").on("click", this._onRollWeapon.bind(this));
    html.find("[data-action='item-open']").on("click", this._onItemOpen.bind(this));
    html.find("[data-action='item-create']").on("click", this._onItemCreate.bind(this));
    html.find("[data-action='use-gear-item']").on("click", this._onUseGearItem.bind(this));
    html.find("[data-action='use-ki-item']").on("click", this._onUseKiItem.bind(this));
    html.find("[data-action='item-delete']").on("click", this._onItemDelete.bind(this));
    html.find("[data-action='condition-toggle']").on("change", this._onConditionToggle.bind(this));
    html.find("[data-action='gear-equipped-toggle']").on("change", this._onItemEquippedToggle.bind(this));
    html.find("[data-action='weapon-equipped-toggle']").on("change", this._onItemEquippedToggle.bind(this));
    html.find("[data-action='resource-adjust']").on("click", this._onResourceAdjust.bind(this));
    html.find("[data-action='resource-set-max']").on("click", this._onResourceSetMax.bind(this));
    html.find("[data-action='resource-damage-dialog']").on("click", this._onResourceDamageDialog.bind(this));
    html.find("[data-action='resource-heal-dialog']").on("click", this._onResourceHealDialog.bind(this));
    html.find("[data-action='set-rating']").on("click", this._onSetRating.bind(this));
  }

  async _onTabClick(event) {
    event.preventDefault();

    const tab = event.currentTarget.dataset.tab;
    if (!tab) return;

    this._activeTab = tab;
    return this.render(false);
  }

  async _onRollAttribute(event) {
    event.preventDefault();

    const button = event.currentTarget;
    const attributeKey = button.dataset.attribute;
    const attributeLabel = SHADOW_SCAR.attributes[attributeKey] ?? attributeKey;

    return rollAttribute(this.actor, attributeKey, attributeLabel);
  }

  async _onRollSkill(event) {
    event.preventDefault();

    const button = event.currentTarget;
    const attributeKey = button.dataset.attribute;
    const skillKey = button.dataset.skill;

    const attributeLabel = SHADOW_SCAR.attributes[attributeKey] ?? attributeKey;
    const skillLabel = SHADOW_SCAR.skills[attributeKey]?.[skillKey] ?? skillKey;

    return rollSkill(this.actor, attributeKey, skillKey, attributeLabel, skillLabel);
  }

  async _onRollWeapon(event) {
    event.preventDefault();

    const item = this._getItemFromEvent(event);
    if (!item) return null;

    return rollWeapon(this.actor, item);
  }

  async _onItemOpen(event) {
    event.preventDefault();

    const item = this._getItemFromEvent(event);
    return item?.sheet?.render(true);
  }


  async _onItemCreate(event) {
    event.preventDefault();

    const type = event.currentTarget.dataset.itemType;
    if (!type || !Object.values(SHADOW_SCAR.itemTypes).includes(type)) return null;

    const label = SHADOW_SCAR.itemTypeLabels[type] ?? type;
    const data = {
      name: `New ${label}`,
      type,
      system: this.#getDefaultItemSystem(type)
    };

    const created = await this.actor.createEmbeddedDocuments("Item", [data]);
    const item = created?.[0];
    if (item?.sheet) item.sheet.render(true);
    return item;
  }

  async _onUseGearItem(event) {
    event.preventDefault();

    const item = this._getItemFromEvent(event);
    if (!item) return null;

    return useGearItem(this.actor, item);
  }

  async _onUseKiItem(event) {
    event.preventDefault();

    const item = this._getItemFromEvent(event);
    if (!item) return null;

    return useKiItem(this.actor, item);
  }

  async _onItemDelete(event) {
    event.preventDefault();

    const item = this._getItemFromEvent(event);
    if (!item) return;

    const confirmed = await Dialog.confirm({
      title: "Delete Item",
      content: `<p>Really delete ${item.name}?</p>`
    });

    if (confirmed) return this.actor.deleteEmbeddedDocuments("Item", [item.id]);
  }

  async _onConditionToggle(event) {
    const item = this._getItemFromEvent(event);
    if (!item) return;

    return item.update({ "system.active": event.currentTarget.checked });
  }

  async _onItemEquippedToggle(event) {
    const item = this._getItemFromEvent(event);
    if (!item) return;

    return item.update({ "system.equipped": event.currentTarget.checked });
  }

  async _onResourceAdjust(event) {
    event.preventDefault();

    const resourceKey = event.currentTarget.dataset.resource;
    const delta = Number(event.currentTarget.dataset.delta ?? 0);
    if (!resourceKey || !Number.isFinite(delta)) return null;

    return changeResource(this.actor, resourceKey, delta);
  }

  async _onResourceSetMax(event) {
    event.preventDefault();

    const resourceKey = event.currentTarget.dataset.resource;
    if (!resourceKey) return null;

    return setResourceToMax(this.actor, resourceKey);
  }

  async _onResourceDamageDialog(event) {
    event.preventDefault();
    return openVitalityChangeDialog(this.actor, "damage");
  }

  async _onResourceHealDialog(event) {
    event.preventDefault();
    return openVitalityChangeDialog(this.actor, "heal");
  }

  async _onSetRating(event) {
    event.preventDefault();

    const button = event.currentTarget;
    const path = button.dataset.path;
    const clickedValue = Number(button.dataset.value ?? 0);
    const maximum = Number(button.dataset.max ?? clickedValue);

    if (!path || !Number.isFinite(clickedValue) || !Number.isFinite(maximum)) return null;

    const systemPath = path.replace(/^system\./, "");
    const currentValue = Number(foundry.utils.getProperty(this.actor.system, systemPath) ?? 0);
    const unclampedValue = clickedValue === currentValue ? clickedValue - 1 : clickedValue;
    const nextValue = Math.max(0, Math.min(maximum, unclampedValue));

    return this.actor.update({ [path]: nextValue });
  }

  _getItemFromEvent(event) {
    const itemId = event.currentTarget.closest(".item-row")?.dataset.itemId;
    if (!itemId) return null;
    return this.actor.items.get(itemId);
  }

  #buildNPCKeySkills() {
    const rows = [];

    for (const [attributeKey, skills] of Object.entries(SHADOW_SCAR.skills)) {
      const attributeLabel = SHADOW_SCAR.attributes[attributeKey] ?? attributeKey;
      const attributeValue = this.actor.getAttribute(attributeKey);

      for (const [skillKey, skillLabel] of Object.entries(skills)) {
        const skillValue = this.actor.getSkill(attributeKey, skillKey);
        if (skillValue <= 0) continue;

        rows.push({
          attributeKey,
          attributeLabel,
          attributeValue,
          skillKey,
          skillLabel,
          skillValue,
          path: `system.skills.${attributeKey}.${skillKey}`,
          pool: attributeValue + skillValue
        });
      }
    }

    return rows.sort((left, right) => {
      if (right.pool !== left.pool) return right.pool - left.pool;
      return left.skillLabel.localeCompare(right.skillLabel);
    });
  }


  #getDefaultItemSystem(type) {
    switch (type) {
      case SHADOW_SCAR.itemTypes.technique:
        return {
          clan: "general",
          rank: "genin",
          description: ""
        };
      case SHADOW_SCAR.itemTypes.mikkyo:
        return {
          clan: "general",
          rank: "genin",
          kiCost: SHADOW_SCAR.mikkyoKiCosts?.genin ?? 1,
          description: ""
        };
      case SHADOW_SCAR.itemTypes.weapon:
        return {
          description: "",
          skill: "body.melee",
          damage: "1",
          range: "",
          category: "melee",
          equipped: false,
          tags: ""
        };
      case SHADOW_SCAR.itemTypes.gear:
        return {
          description: "",
          quantity: 1,
          category: "general",
          equipped: false,
          effect: "",
          armorValue: 0,
          resistanceValue: 0,
          defenseBonus: 0,
          damageReduction: 0,
          notes: "",
          tags: ""
        };
      case SHADOW_SCAR.itemTypes.condition:
        return {
          description: "",
          active: false,
          intensity: 1,
          category: "other",
          modifier: 0,
          penalty: ""
        };
      case SHADOW_SCAR.itemTypes.quirk:
      case SHADOW_SCAR.itemTypes.homelandAbility:
        return {
          description: ""
        };
      default:
        return {};
    }
  }

  #hasProtection(item) {
    if (!item || item.type !== SHADOW_SCAR.itemTypes.gear) return false;

    const armorValue = Number(item.system?.armorValue ?? 0);
    const resistanceValue = Number(item.system?.resistanceValue ?? 0);
    const defenseBonus = Number(item.system?.defenseBonus ?? 0);
    const damageReduction = Number(item.system?.damageReduction ?? 0);
    const notes = String(item.system?.notes ?? "");

    return (
      armorValue > 0 ||
      resistanceValue > 0 ||
      defenseBonus !== 0 ||
      damageReduction > 0 ||
      notes.trim().length > 0 ||
      item.system?.category === "armor"
    );
  }
}
