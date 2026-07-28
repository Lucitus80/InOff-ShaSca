/**
 * Data model for Actor type "npc".
 *
 * v0.6.6 keeps NPCs compatible with characters for rolls, resources, gear,
 * weapons and conditions, but adds a small adversary block for GM-facing data.
 */
import { ShadowScarCharacterData } from "./actor-character.mjs";

const fields = foundry.data.fields;

export class ShadowScarNPCData extends ShadowScarCharacterData {
  static defineSchema() {
    const schema = super.defineSchema();

    schema.npc = new fields.SchemaField({
      role: new fields.StringField({ required: true, nullable: false, initial: "" }),
      adversaryType: new fields.StringField({ required: true, nullable: false, initial: "" }),
      threatLevel: new fields.StringField({ required: true, nullable: false, initial: "standard" }),
      tactics: new fields.StringField({ required: true, nullable: false, initial: "" })
    });

    return schema;
  }
}
