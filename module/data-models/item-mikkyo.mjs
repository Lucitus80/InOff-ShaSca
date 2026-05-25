/**
 * Data model for Item type "mikkyo".
 *
 * Mikkyo is kept separate from techniques because it will likely need its own
 * rules later. For now, this model stores cost, duration, range and effect
 * text in a structured way.
 */
const fields = foundry.data.fields;

export class ShadowScarMikkyoData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      description: new fields.HTMLField({ required: true, nullable: false, initial: "" }),
      kiCost: new fields.NumberField({ required: true, nullable: false, integer: true, initial: 0, min: 0 }),
      timing: new fields.StringField({ required: true, nullable: false, initial: "" }),
      range: new fields.StringField({ required: true, nullable: false, initial: "" }),
      duration: new fields.StringField({ required: true, nullable: false, initial: "" }),
      effect: new fields.StringField({ required: true, nullable: false, initial: "" }),
      tags: new fields.StringField({ required: true, nullable: false, initial: "" })
    };
  }
}
