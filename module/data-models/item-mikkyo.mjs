/**
 * Data model for Item type "mikkyo".
 *
 * v0.7.2 gives Mikkyo the same Clan + Rank classifiers as Techniques. Ki cost
 * is not directly editable; it is derived from Rank by system configuration:
 * Genin 1 Ki, Chunin 3 Ki, Jounin 5 Ki.
 */
import { SHADOW_SCAR } from "../config.mjs";

const fields = foundry.data.fields;

export class ShadowScarMikkyoData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      description: new fields.HTMLField({ required: true, nullable: false, initial: "" }),
      clan: new fields.StringField({ required: true, nullable: false, initial: "general" }),
      rank: new fields.StringField({ required: true, nullable: false, initial: "genin" }),
      kiCost: new fields.NumberField({ required: true, nullable: false, integer: true, min: 0, initial: 1 })
    };
  }

  prepareBaseData() {
    if (!this.clan) this.clan = "general";
    if (!this.rank) this.rank = "genin";
    this.kiCost = this.#getKiCostForRank(this.rank);
  }

  #getKiCostForRank(rank) {
    const key = rank || "genin";
    return Math.max(0, Number(SHADOW_SCAR.mikkyoKiCosts?.[key] ?? SHADOW_SCAR.mikkyoKiCosts?.genin ?? 1));
  }
}
