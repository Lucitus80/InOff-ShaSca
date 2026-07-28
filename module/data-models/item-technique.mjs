/**
 * Data model for Item type "technique".
 *
 * v0.7.2 renames the old Technique "Type" field to "Clan". The visible sheet
 * exposes Clan + Rank + editable rules text. The old techniqueType field is
 * kept only as a hidden compatibility field for v0.7.1 items.
 */
const fields = foundry.data.fields;

export class ShadowScarTechniqueData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      description: new fields.HTMLField({ required: true, nullable: false, initial: "" }),
      clan: new fields.StringField({ required: true, nullable: false, initial: "general" }),
      techniqueType: new fields.StringField({ required: false, nullable: true, initial: "" }),
      rank: new fields.StringField({ required: true, nullable: false, initial: "genin" })
    };
  }

  static migrateData(source) {
    const data = super.migrateData?.(source) ?? source;
    if (!data.clan && data.techniqueType) data.clan = data.techniqueType;
    return data;
  }

  prepareBaseData() {
    if (!this.clan && this.techniqueType) this.clan = this.techniqueType;
    if (!this.clan) this.clan = "general";
    if (!this.rank) this.rank = "genin";
  }
}
