/**
 * Data model for Item type "gear".
 *
 * Gear is intentionally broad: tools, armor-like objects, consumables and
 * other carried items can all live here until we need more specialized types.
 */
const fields = foundry.data.fields;

export class ShadowScarGearData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      description: new fields.HTMLField({ required: true, nullable: false, initial: "" }),
      quantity: new fields.NumberField({ required: true, nullable: false, integer: true, initial: 1, min: 0 }),
      category: new fields.StringField({ required: true, nullable: false, initial: "" }),
      equipped: new fields.BooleanField({ required: true, nullable: false, initial: false }),
      effect: new fields.StringField({ required: true, nullable: false, initial: "" }),
      tags: new fields.StringField({ required: true, nullable: false, initial: "" })
    };
  }
}
