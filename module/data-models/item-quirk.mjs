/**
 * Data model for Item type "quirk".
 *
 * Quirks are small character traits, habits, flaws, or narrative hooks.
 */
const fields = foundry.data.fields;

export class ShadowScarQuirkData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      description: new fields.HTMLField({ required: true, nullable: false, initial: "" })
    };
  }
}
