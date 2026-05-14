/**
 * Data model for Item type "weapon".
 *
 * Weapons are separated from general gear so we can later add attack buttons,
 * damage handling and range logic without overloading all equipment items.
 */
const fields = foundry.data.fields;

export class ShadowScarWeaponData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      description: new fields.HTMLField({ required: true, nullable: false, initial: "" }),
      skill: new fields.StringField({ required: true, nullable: false, initial: "body.melee" }),
      damage: new fields.StringField({ required: true, nullable: false, initial: "" }),
      range: new fields.StringField({ required: true, nullable: false, initial: "" }),
      category: new fields.StringField({ required: true, nullable: false, initial: "" }),
      equipped: new fields.BooleanField({ required: true, nullable: false, initial: false }),
      tags: new fields.StringField({ required: true, nullable: false, initial: "" })
    };
  }
}
