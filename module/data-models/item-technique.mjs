/**
 * Data model for Item type "technique".
 *
 * v0.56 makes techniques rule-ready without yet implementing technique use.
 * The sheet can now store the linked attribute/skill, Ki cost, timing and tags.
 *
 * Important Foundry concept:
 * A TypeDataModel defines which fields are valid inside item.system for this
 * specific Item type. Foundry validates and persists these fields for us.
 */
const fields = foundry.data.fields;

export class ShadowScarTechniqueData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      description: new fields.HTMLField({ required: true, nullable: false, initial: "" }),
      attribute: new fields.StringField({ required: true, nullable: false, initial: "mind" }),
      skill: new fields.StringField({ required: true, nullable: false, initial: "" }),
      kiCost: new fields.NumberField({ required: true, nullable: false, integer: true, initial: 0, min: 0 }),
      timing: new fields.StringField({ required: true, nullable: false, initial: "" }),
      trigger: new fields.StringField({ required: true, nullable: false, initial: "" }),
      effect: new fields.StringField({ required: true, nullable: false, initial: "" }),
      tags: new fields.StringField({ required: true, nullable: false, initial: "" })
    };
  }
}
