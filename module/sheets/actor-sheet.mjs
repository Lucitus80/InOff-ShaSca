/**
 * Character sheet for Shadow Scar.
 *
 * Foundry separates data and presentation:
 * - The Actor stores the character data.
 * - This sheet class prepares data for the template.
 * - The Handlebars template builds the visible HTML sheet.
 *
 * v0.5.5 introduces a tabbed character sheet. Tabs are only UI state; they do
 * not change the Actor data structure. This keeps existing test characters safe.
 */
import { SHADOW_SCAR } from "../config.mjs";
import { rollAttribute, rollSkill, useKiItem, rollWeapon, useGear } from "../dice/rolls.mjs";

export class ShadowScarActorSheet extends ActorSheet {
  /**
   * A small piece of sheet-only state.
   *
   * Foundry re-renders sheets often. Keeping the selected tab on the sheet
   * instance lets us return to the same page after changing a value.
   */
  _activeTab = "general";

  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["shadow-scar", "sheet", "actor"],
      template: "systems/shadow-scar/templates/actor/character-sheet.hbs",
      width: 900,
      height: 840,
      resizable: true
    });
  }

  /**
   * getData() collects all data the template needs.
   */
  async getData(options = {}) {
    const context = await super.getData(options);

    context.config = SHADOW_SCAR;
    context.system = this.actor.system;
    context.activeTab = this._activeTab;

    const items = this.actor.items.contents;
    const activeConditions = items.filter((item) => item.type === SHADOW_SCAR.itemTypes.condition && item.system?.active);

    context.activeConditions = activeConditions;
    context.activeConditionNotes = activeConditions
      .map((item) => `${item.name}${item.system?.penalty ? `: ${item.system.penalty}` : ""}`)
      .join("; ");

    context.itemsByType = {
      gear: items.filter((item) => item.type === SHADOW_SCAR.itemTypes.gear),
      weapon: items.filter((item) => item.type === SHADOW_SCAR.itemTypes.weapon),
      technique: items.filter((item) => item.type === SHADOW_SCAR.itemTypes.technique),
      mikkyo: items.filter((item) => item.type === SHADOW_SCAR.itemTypes.mikkyo),
      condition: items.filter((item) => item.type === SHADOW_SCAR.itemTypes.condition)
    };

    return context;
  }

  /**
   * activateListeners() runs after the sheet HTML has been rendered.
   */
  activateListeners(html) {
    super.activateListeners(html);

    html.find("[data-action='tab']").on("click", this._onTabClick.bind(this));

    if (!this.isEditable) return;

    html.find("[data-action='roll-attribute']").on("click", this._onRollAttribute.bind(this));
    html.find("[data-action='roll-skill']").on("click", this._onRollSkill.bind(this));
    html.find("[data-action='item-open']").on("click", this._onItemOpen.bind(this));
    html.find("[data-action='use-ki-item']").on("click", this._onUseKiItem.bind(this));
    html.find("[data-action='roll-weapon']").on("click", this._onRollWeapon.bind(this));
    html.find("[data-action='use-gear']").on("click", this._onUseGear.bind(this));
    html.find("[data-action='item-toggle-equipped']").on("change", this._onItemToggleEquipped.bind(this));
    html.find("[data-action='item-delete']").on("click", this._onItemDelete.bind(this));
    html.find("[data-action='condition-toggle']").on("change", this._onConditionToggle.bind(this));
  }

  /**
   * Switches between the five character-sheet pages.
   *
   * We do not need Foundry's built-in tab helper here. The sheet has only a few
   * tabs, so storing the clicked tab key and re-rendering is straightforward and
   * easy to understand.
   */
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

  async _onItemOpen(event) {
    event.preventDefault();

    const itemId = event.currentTarget.closest(".item-row")?.dataset.itemId;
    const item = this.actor.items.get(itemId);

    return item?.sheet?.render(true);
  }

  /**
   * Uses a Technique or Mikkyo item from the character sheet.
   *
   * In v0.58 Techniques create chat output without Ki costs. Mikkyo still reads
   * system.kiCost and can optionally spend Ki from the Actor.
   */
  async _onUseKiItem(event) {
    event.preventDefault();

    const itemId = event.currentTarget.closest(".item-row")?.dataset.itemId;
    const item = this.actor.items.get(itemId);
    if (!item) return;

    return useKiItem(this.actor, item);
  }

  async _onRollWeapon(event) {
    event.preventDefault();

    const itemId = event.currentTarget.closest(".item-row")?.dataset.itemId;
    const item = this.actor.items.get(itemId);
    if (!item) return;

    return rollWeapon(this.actor, item);
  }

  async _onUseGear(event) {
    event.preventDefault();

    const itemId = event.currentTarget.closest(".item-row")?.dataset.itemId;
    const item = this.actor.items.get(itemId);
    if (!item) return;

    return useGear(this.actor, item);
  }

  async _onItemToggleEquipped(event) {
    const itemId = event.currentTarget.closest(".item-row")?.dataset.itemId;
    const item = this.actor.items.get(itemId);
    if (!item) return;

    return item.update({ "system.equipped": event.currentTarget.checked });
  }

  async _onItemDelete(event) {
    event.preventDefault();

    const itemId = event.currentTarget.closest(".item-row")?.dataset.itemId;
    const item = this.actor.items.get(itemId);
    if (!item) return;

    const confirmed = await Dialog.confirm({
      title: "Delete Item",
      content: `<p>Really delete ${item.name}?</p>`
    });

    if (confirmed) return this.actor.deleteEmbeddedDocuments("Item", [itemId]);
  }

  /**
   * Updates the active checkbox on an embedded Condition item.
   *
   * Embedded Items are separate documents inside the Actor. Because the checkbox
   * belongs to an Item, not directly to actor.system, we update the Item document
   * explicitly with item.update().
   */
  async _onConditionToggle(event) {
    const itemId = event.currentTarget.closest(".item-row")?.dataset.itemId;
    const item = this.actor.items.get(itemId);
    if (!item) return;

    return item.update({ "system.active": event.currentTarget.checked });
  }
}
