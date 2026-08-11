/**
 * Data model for Item type "homelandAbility".
 *
 * Homeland Abilities represent the special ability granted by a character's origin.
 */
const fields = foundry.data.fields;

export class ShadowScarHomelandAbilityData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      description: new fields.HTMLField({ required: true, nullable: false, initial: "" })
    };
  }
}
