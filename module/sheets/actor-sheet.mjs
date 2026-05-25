/**
 * Character sheet for Shadow Scar.
 *
 * v0.6.4 keeps the sheet deliberately lightweight: the sheet locates the
 * clicked item/resource, while reusable roll/action logic lives in rolls.mjs.
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

  async getData(options = {}) {
    const context = await super.getData(options);

    context.config = SHADOW_SCAR;
    context.system = this.actor.system;
    context.activeTab = this._activeTab;
    context.activeConditions = getActiveConditions(this.actor);

    const items = this.actor.items.contents;

    context.itemsByType = {
      gear: items.filter((item) => item.type === SHADOW_SCAR.itemTypes.gear),
      weapon: items.filter((item) => item.type === SHADOW_SCAR.itemTypes.weapon),
      technique: items.filter((item) => item.type === SHADOW_SCAR.itemTypes.technique),
      mikkyo: items.filter((item) => item.type === SHADOW_SCAR.itemTypes.mikkyo),
      condition: items.filter((item) => item.type === SHADOW_SCAR.itemTypes.condition)
    };

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

  _getItemFromEvent(event) {
    const itemId = event.currentTarget.closest(".item-row")?.dataset.itemId;
    if (!itemId) return null;
    return this.actor.items.get(itemId);
  }
}
