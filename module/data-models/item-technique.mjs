/**
 * Data model for Item type "technique".
 *
 * v0.58 separates Techniques from Ki economy. Techniques no longer have
 * Ki Cost; they store Rank and Origin instead.
 */
const fields = foundry.data.fields;

export class ShadowScarTechniqueData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      description: new fields.HTMLField({ required: true, nullable: false, initial: "" }),
      rank: new fields.StringField({ required: true, nullable: false, initial: "" }),
      origin: new fields.StringField({ required: true, nullable: false, initial: "" }),
      attribute: new fields.StringField({ required: true, nullable: false, initial: "mind" }),
      skill: new fields.StringField({ required: true, nullable: false, initial: "" }),
      timing: new fields.StringField({ required: true, nullable: false, initial: "" }),
      trigger: new fields.StringField({ required: true, nullable: false, initial: "" }),
      effect: new fields.StringField({ required: true, nullable: false, initial: "" }),
      tags: new fields.StringField({ required: true, nullable: false, initial: "" })
    };
  }
}
