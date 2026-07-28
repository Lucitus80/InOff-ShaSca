/**
 * Item sheet for Shadow Scar.
 *
 * One sheet class is enough for the prototype because the Handlebars template
 * switches its visible fields based on item.type. Later, we can split this into
 * separate classes if a type needs complex behavior.
 */
import { SHADOW_SCAR } from "../config.mjs";

export class ShadowScarItemSheet extends ItemSheet {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["shadow-scar", "sheet", "item"],
      template: "systems/shadow-scar/templates/item/item-sheet.hbs",
      width: 560,
      height: 620,
      resizable: true
    });
  }

  /**
   * getData prepares the object that the .hbs template can read.
   *
   * Foundry already provides item, system, editable, cssClass, etc. We add our
   * central config object so the template can render dropdown choices from one
   * reliable place instead of hardcoding options directly in HTML.
   */
  async getData(options = {}) {
    const context = await super.getData(options);

    context.config = SHADOW_SCAR;
    context.system = this.item.system;
    context.itemTypeLabel = SHADOW_SCAR.itemTypeLabels[this.item.type] ?? this.item.type;
    context.clan = this.item.system?.clan || this.item.system?.techniqueType || "general";
    context.rank = this.item.system?.rank || "genin";
    context.rankLabel = SHADOW_SCAR.ranks?.[context.rank] ?? context.rank;
    context.mikkyoKiCost = this.item.type === SHADOW_SCAR.itemTypes.mikkyo
      ? this.#getMikkyoKiCost(context.rank)
      : 0;

    return context;
  }

  activateListeners(html) {
    // Register the rank listener before Foundry's built-in form-change handler.
    // Otherwise the sheet can submit the old hidden kiCost value first, then
    // re-render and appear to jump back to the previous cost.
    html.find("select[name='system.rank'][data-action='mikkyo-rank-change']").on("change.shadowScarMikkyoCost", (event) => {
      this.#syncMikkyoKiCostDisplay(html, event.currentTarget.value);
    });

    super.activateListeners(html);

    this.#syncMikkyoKiCostDisplay(html, this.item.system?.rank || "genin");
  }

  async _updateObject(event, formData) {
    if (this.item.type === SHADOW_SCAR.itemTypes.mikkyo) {
      const rank = formData["system.rank"] || formData.system?.rank || this.item.system?.rank || "genin";
      const kiCost = this.#getMikkyoKiCost(rank);

      // Classic ItemSheet submit data is usually flat ("system.rank"), but
      // keep nested data safe as well so this remains robust across Foundry
      // submit-data variants.
      if (formData.system && typeof formData.system === "object") {
        formData.system.kiCost = kiCost;
      }
      formData["system.kiCost"] = kiCost;
    }

    return super._updateObject(event, formData);
  }

  #syncMikkyoKiCostDisplay(html, rank) {
    if (this.item.type !== SHADOW_SCAR.itemTypes.mikkyo) return;

    const kiCost = this.#getMikkyoKiCost(rank);
    html.find("[data-field='mikkyo-ki-cost']").val(`${kiCost} Ki`).text(`${kiCost} Ki`);
    html.find("input[name='system.kiCost']").val(kiCost);
  }

  #getMikkyoKiCost(rank) {
    const key = rank || "genin";
    return Math.max(0, Number(SHADOW_SCAR.mikkyoKiCosts?.[key] ?? SHADOW_SCAR.mikkyoKiCosts?.genin ?? 1));
  }
}
