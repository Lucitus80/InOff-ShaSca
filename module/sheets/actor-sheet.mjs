/**
 * Actor sheet for Shadow Scar.
 *
 * v0.7.13 adds drag-and-drop movement for embedded Items while reusing
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

    context.advantages = context.itemsByType.quirk.filter((item) => (item.system?.quirkType || "advantage") === "advantage");
    context.disadvantages = context.itemsByType.quirk.filter((item) => (item.system?.quirkType || "advantage") === "disadvantage");
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
    this.#activateItemDragAndDrop(html);
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

    const itemSystem = this.#getDefaultItemSystem(type, event.currentTarget.dataset);
    const label = SHADOW_SCAR.itemTypeLabels[type] ?? type;
    const name = type === SHADOW_SCAR.itemTypes.quirk
      ? `New ${itemSystem.quirkType === "disadvantage" ? "Disadvantage" : "Advantage"}`
      : `New ${label}`;
    const data = {
      name,
      type,
      img: this.#getDefaultItemImage(type),
      system: itemSystem
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

  #activateItemDragAndDrop(html) {
    const itemRows = html.find(".item-row[data-item-id]");
    itemRows.attr("draggable", true);
    itemRows.on("dragstart", this._onItemDragStart.bind(this));
    itemRows.on("dragend", (event) => {
      event.currentTarget.classList.remove("dragging");
      html.find(".item-drop-zone.drag-over").removeClass("drag-over");
    });

    const dropZones = html.find(".item-drop-zone[data-drop-type]");
    dropZones.on("dragenter dragover", this._onItemDragOver.bind(this));
    dropZones.on("dragleave", this._onItemDragLeave.bind(this));
    dropZones.on("drop", this._onItemDrop.bind(this));
  }

  _onItemDragStart(event) {
    const dragEvent = event.originalEvent ?? event;
    const item = this._getItemFromEvent(event);
    if (!item) return;

    const dragData = {
      type: "Item",
      uuid: item.uuid,
      itemId: item.id,
      actorUuid: this.actor.uuid,
      shadowScar: {
        sourceActorUuid: this.actor.uuid,
        sourceItemId: item.id
      }
    };

    dragEvent.dataTransfer?.setData("text/plain", JSON.stringify(dragData));
    dragEvent.dataTransfer?.setData("application/json", JSON.stringify(dragData));
    if (dragEvent.dataTransfer) dragEvent.dataTransfer.effectAllowed = "copyMove";
    event.currentTarget.classList.add("dragging");
  }

  _onItemDragOver(event) {
    const dragEvent = event.originalEvent ?? event;
    event.preventDefault();
    const dropZone = event.currentTarget;
    dropZone.classList.add("drag-over");
    if (dragEvent.dataTransfer) dragEvent.dataTransfer.dropEffect = dragEvent.altKey || dragEvent.ctrlKey ? "copy" : "move";
  }

  _onItemDragLeave(event) {
    const relatedTarget = event.relatedTarget ?? event.originalEvent?.relatedTarget;
    if (relatedTarget && event.currentTarget.contains(relatedTarget)) return;
    event.currentTarget.classList.remove("drag-over");
  }

  async _onItemDrop(event) {
    const dragEvent = event.originalEvent ?? event;
    event.preventDefault();
    event.stopPropagation();

    const dropZone = event.currentTarget.closest?.(".item-drop-zone[data-drop-type]") ?? event.currentTarget;
    dropZone.classList.remove("drag-over");

    const data = this.#getDropData(dragEvent);
    if (!data || data.type !== "Item") return null;

    const item = await this.#getDroppedItem(data);
    if (!item) {
      ui.notifications?.warn("Dropped item could not be resolved.");
      return null;
    }

    const targetType = dropZone.dataset.dropType;
    const targetQuirkType = dropZone.dataset.quirkType;
    const setEquipped = dropZone.dataset.setEquipped === "true";

    if (!this.#isCompatibleDrop(item, targetType)) {
      const targetLabel = SHADOW_SCAR.itemTypeLabels?.[targetType] ?? targetType;
      ui.notifications?.warn(`${item.name} is a ${item.type} item and cannot be dropped into ${targetLabel}.`);
      return null;
    }

    const sourceActor = await this.#getSourceActor(data, item);
    const sourceItem = this.#getSourceItem(data, item, sourceActor);
    const isSameActor = sourceActor?.uuid === this.actor.uuid;

    if (isSameActor) {
      const updateData = this.#buildDropUpdateData({ item, targetType, targetQuirkType, setEquipped });
      if (Object.keys(updateData).length) {
        await sourceItem.update(updateData);
        ui.notifications?.info(`${sourceItem.name} moved.`);
      }
      return this.render(false);
    }

    const itemData = this.#buildDroppedItemData({ item, targetType, targetQuirkType, setEquipped });
    const created = await this.actor.createEmbeddedDocuments("Item", [itemData]);

    const shouldCopy = dragEvent.altKey || dragEvent.ctrlKey || !sourceActor || !sourceItem || !sourceActor.isOwner;
    if (!shouldCopy) {
      await sourceActor.deleteEmbeddedDocuments("Item", [sourceItem.id]);
      ui.notifications?.info(`${item.name} moved to ${this.actor.name}.`);
    } else if (created?.length) {
      ui.notifications?.info(`${item.name} copied to ${this.actor.name}.`);
    }

    return this.render(false);
  }

  #getDropData(dragEvent) {
    try {
      if (TextEditor?.getDragEventData) return TextEditor.getDragEventData(dragEvent);
    } catch (_error) {
      // Fall back to plain JSON below.
    }

    const raw = dragEvent.dataTransfer?.getData("application/json") || dragEvent.dataTransfer?.getData("text/plain");
    if (!raw) return null;

    try {
      return JSON.parse(raw);
    } catch (_error) {
      return null;
    }
  }

  async #getDroppedItem(data) {
    if (data.uuid) {
      const item = await fromUuid(data.uuid);
      if (item) return item;
    }

    const sourceActor = await this.#getSourceActor(data, null);
    if (sourceActor && data.itemId) return sourceActor.items.get(data.itemId) ?? null;

    if (Item?.implementation?.fromDropData) {
      try {
        return await Item.implementation.fromDropData(data);
      } catch (_error) {
        return null;
      }
    }

    return null;
  }

  async #getSourceActor(data, item) {
    const sourceActorUuid = data.actorUuid || data.actorId || data.shadowScar?.sourceActorUuid || item?.parent?.uuid;
    if (!sourceActorUuid) return item?.parent instanceof Actor ? item.parent : null;

    if (String(sourceActorUuid).startsWith("Actor.")) {
      return await fromUuid(sourceActorUuid);
    }

    return game.actors?.get(sourceActorUuid) ?? null;
  }

  #getSourceItem(data, item, sourceActor) {
    const itemId = data.itemId || data.shadowScar?.sourceItemId || item?.id;
    return sourceActor?.items?.get(itemId) ?? item;
  }

  #isCompatibleDrop(item, targetType) {
    if (!targetType) return true;
    if (!item?.type) return false;
    return item.type === targetType;
  }

  #buildDropUpdateData({ item, targetType, targetQuirkType, setEquipped }) {
    const updateData = {};

    if (targetType === SHADOW_SCAR.itemTypes.quirk && targetQuirkType) {
      const nextType = targetQuirkType === "disadvantage" ? "disadvantage" : "advantage";
      if ((item.system?.quirkType || "advantage") !== nextType) updateData["system.quirkType"] = nextType;
    }

    if (setEquipped && item.type === SHADOW_SCAR.itemTypes.weapon && !item.system?.equipped) {
      updateData["system.equipped"] = true;
    }

    return updateData;
  }

  #buildDroppedItemData({ item, targetType, targetQuirkType, setEquipped }) {
    const itemData = item.toObject ? item.toObject() : foundry.utils.duplicate(item);
    delete itemData._id;
    itemData.system = foundry.utils.duplicate(itemData.system ?? {});

    if (targetType === SHADOW_SCAR.itemTypes.quirk && targetQuirkType) {
      itemData.system.quirkType = targetQuirkType === "disadvantage" ? "disadvantage" : "advantage";
    }

    if (setEquipped && itemData.type === SHADOW_SCAR.itemTypes.weapon) {
      itemData.system.equipped = true;
    }

    return itemData;
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


  #getDefaultItemImage(type) {
    return SHADOW_SCAR.itemDefaultIcons?.[type] ?? "icons/svg/item-bag.svg";
  }

  #getDefaultItemSystem(type, dataset = {}) {
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
          rpCost: 0,
          category: "melee",
          equipped: false,
          tags: ""
        };
      case SHADOW_SCAR.itemTypes.gear:
        return {
          description: "",
          quantity: 1,
          rpCost: 0,
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
        return {
          quirkType: dataset.quirkType === "disadvantage" ? "disadvantage" : "advantage",
          description: ""
        };
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
