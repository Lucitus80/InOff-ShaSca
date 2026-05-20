/**
 * Data model for Item type "condition".
 *
 * Conditions currently behave as visible markers on the character sheet. They
 * are not yet Foundry Active Effects, but the data below prepares for that.
 */
const fields = foundry.data.fields;

export class ShadowScarConditionData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      description: new fields.HTMLField({ required: true, nullable: false, initial: "" }),
      active: new fields.BooleanField({ required: true, nullable: false, initial: false }),
      intensity: new fields.NumberField({ required: true, nullable: false, integer: true, initial: 1, min: 0 }),
      category: new fields.StringField({ required: true, nullable: false, initial: "" }),
      modifier: new fields.NumberField({ required: true, nullable: false, integer: true, initial: 0 }),
      penalty: new fields.StringField({ required: true, nullable: false, initial: "" })
    };
  }
}
