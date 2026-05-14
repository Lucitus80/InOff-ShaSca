/**
 * Data model for Item type "mikkyo".
 *
 * Mikkyo remains connected to Ki economy. v0.58 adds Rank and Origin so
 * different schools, traditions and power levels can be represented.
 */
const fields = foundry.data.fields;

export class ShadowScarMikkyoData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      description: new fields.HTMLField({ required: true, nullable: false, initial: "" }),
      rank: new fields.StringField({ required: true, nullable: false, initial: "" }),
      origin: new fields.StringField({ required: true, nullable: false, initial: "" }),
      kiCost: new fields.NumberField({ required: true, nullable: false, integer: true, initial: 0, min: 0 }),
      timing: new fields.StringField({ required: true, nullable: false, initial: "" }),
      range: new fields.StringField({ required: true, nullable: false, initial: "" }),
      duration: new fields.StringField({ required: true, nullable: false, initial: "" }),
      effect: new fields.StringField({ required: true, nullable: false, initial: "" }),
      tags: new fields.StringField({ required: true, nullable: false, initial: "" })
    };
  }
}
