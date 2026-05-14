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

    return context;
  }
}
