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
      .map((item) => `${item.name}${item.system?.modifier ? ` (${item.system.modifier} dice)` : ""}${item.system?.penalty ? `: ${item.system.penalty}` : ""}`)
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
    html.find("[data-action='resource-adjust']").on("click", this._onResourceAdjust.bind(this));
    html.find("[data-action='resource-set-max']").on("click", this._onResourceSetMax.bind(this));
    html.find("[data-action='resource-dialog']").on("click", this._onResourceDialog.bind(this));
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
   * v0.62: quick resource controls for Vitality and Ki.
   *
   * These controls update actor.system.resources.<resource>.value directly and
   * clamp the result between 0 and the resource maximum.
   */
  async _onResourceAdjust(event) {
    event.preventDefault();

    const resource = event.currentTarget.dataset.resource;
    const delta = Number(event.currentTarget.dataset.delta || 0);

    if (!resource || !Number.isFinite(delta)) return;
    return this._adjustResource(resource, delta);
  }

  async _onResourceSetMax(event) {
    event.preventDefault();

    const resource = event.currentTarget.dataset.resource;
    if (!resource) return;

    const max = this._getResourceMax(resource);
    return this.actor.update({ [`system.resources.${resource}.value`]: max });
  }

  async _onResourceDialog(event) {
    event.preventDefault();

    const resource = event.currentTarget.dataset.resource;
    const mode = event.currentTarget.dataset.mode || "adjust";
    if (!resource) return;

    const title = mode === "damage" ? "Take Damage" : mode === "heal" ? "Heal" : "Adjust Resource";
    const label = mode === "damage" ? "Damage amount" : mode === "heal" ? "Healing amount" : "Amount";

    const amount = await new Promise((resolve) => {
      let resolved = false;
      const finish = (value) => {
        if (resolved) return;
        resolved = true;
        resolve(value);
      };

      new Dialog({
        title,
        content: `
          <form class="shadow-scar resource-dialog">
            <div class="roll-dialog-row">
              <label>${label}</label>
              <input name="amount" type="number" value="1" min="0" step="1" autofocus />
            </div>
          </form>
        `,
        buttons: {
          apply: {
            icon: '<i class="fas fa-check"></i>',
            label: "Apply",
            callback: (html) => {
              const rawAmount = html.find("[name='amount']").val();
              const parsed = Number(rawAmount || 0);
              finish(Number.isFinite(parsed) ? Math.max(0, parsed) : 0);
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

    if (amount === null) return;

    const delta = mode === "damage" ? -amount : amount;
    return this._adjustResource(resource, delta);
  }

  _getResourceValue(resource) {
    return Math.max(0, Number(this.actor.system?.resources?.[resource]?.value ?? 0));
  }

  _getResourceMax(resource) {
    return Math.max(0, Number(this.actor.system?.resources?.[resource]?.max ?? 0));
  }

  async _adjustResource(resource, delta) {
    const current = this._getResourceValue(resource);
    const max = this._getResourceMax(resource);
    const next = Math.min(max, Math.max(0, current + delta));

    return this.actor.update({ [`system.resources.${resource}.value`]: next });
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
