/**
 * Data model for an inline Chronicle table entry.
 * Chronicle entries are embedded Items so each row can be created, edited,
 * deleted and later extended without complicating Actor array migrations.
 */
const fields = foundry.data.fields;

export class ShadowScarChronicleEntryData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      date: new fields.StringField({ required: true, nullable: false, initial: "" }),
      title: new fields.StringField({ required: true, nullable: false, initial: "" }),
      advancement: new fields.StringField({ required: true, nullable: false, initial: "" }),
      rp: new fields.NumberField({ required: true, nullable: false, integer: true, initial: 0 })
    };
  }
}
