/**
 * Datenmodell für Actor vom Typ "character".
 *
 * Ein DataModel beschreibt, welche Felder unter actor.system existieren dürfen
 * und welchen Typ diese Felder haben. Foundry kann dadurch Daten validieren,
 * Standardwerte setzen und falsche Werte besser erkennen.
 */

const fields = foundry.data.fields;

/**
 * Kleines Hilfsmodell für Ressourcen wie Vitality oder Ki Reserve.
 *
 * Jede Ressource hat:
 * - value: aktueller Wert
 * - max: Maximalwert
 */
function resourceField({ value = 0, max = 0 } = {}) {
  return new fields.SchemaField({
    value: new fields.NumberField({ required: true, nullable: false, integer: true, initial: value, min: 0 }),
    max: new fields.NumberField({ required: true, nullable: false, integer: true, initial: max, min: 0 })
  });
}

/**
 * Hilfsfunktion für Skill-Werte.
 *
 * Shadow Scar stores skill ratings numerically, but v0.7.0 displays them as
 * symbols on the sheet. Skills are capped at 3 filled symbols.
 */
function skillField(initial = 0) {
  return new fields.NumberField({
    required: true,
    nullable: false,
    integer: true,
    initial,
    min: 0,
    max: 3
  });
}

export class ShadowScarCharacterData extends foundry.abstract.TypeDataModel {
  /**
   * defineSchema() ist die wichtigste Methode eines DataModels.
   * Sie gibt Foundry eine Karte der erlaubten system-Daten zurück.
   */
  static defineSchema() {
    return {
      attributes: new fields.SchemaField({
        mind: new fields.NumberField({ required: true, nullable: false, integer: true, initial: 1, min: 0, max: 5 }),
        body: new fields.NumberField({ required: true, nullable: false, integer: true, initial: 1, min: 0, max: 5 }),
        spirit: new fields.NumberField({ required: true, nullable: false, integer: true, initial: 1, min: 0, max: 5 })
      }),

      /**
       * Skills sind genauso gruppiert wie in config.mjs:
       * system.skills.<attribut>.<skill>
       *
       * Beispiel:
       * system.skills.mind.awareness
       */
      skills: new fields.SchemaField({
        mind: new fields.SchemaField({
          awareness: skillField(),
          disguise: skillField(),
          engineering: skillField(),
          knowledge: skillField(),
          marksmanship: skillField(),
          medicine: skillField()
        }),
        body: new fields.SchemaField({
          athletics: skillField(),
          endurance: skillField(),
          maneuver: skillField(),
          melee: skillField(),
          stealth: skillField(),
          strength: skillField()
        }),
        spirit: new fields.SchemaField({
          artistry: skillField(),
          insight: skillField(),
          focus: skillField(),
          manipulation: skillField(),
          performance: skillField(),
          resistance: skillField()
        })
      }),

      resources: new fields.SchemaField({
        vitality: resourceField({ value: 10, max: 10 }),
        ki: resourceField({ value: 3, max: 3 })
      }),

      details: new fields.SchemaField({
        concept: new fields.StringField({ required: true, nullable: false, initial: "" }),
        homeland: new fields.StringField({ required: true, nullable: false, initial: "" }),
        shinobiClan: new fields.StringField({ required: true, nullable: false, initial: "" }),
        armor: new fields.StringField({ required: true, nullable: false, initial: "" }),
        speed: new fields.StringField({ required: true, nullable: false, initial: "" }),
        specialSenses: new fields.StringField({ required: true, nullable: false, initial: "" }),
        inyo: new fields.NumberField({ required: true, nullable: false, integer: true, initial: 0, min: 0, max: 1 }),
        rank: new fields.StringField({ required: true, nullable: false, initial: "" }),
        rp: new fields.StringField({ required: true, nullable: false, initial: "" }),
        wealth: new fields.StringField({ required: true, nullable: false, initial: "" }),
        di: new fields.StringField({ required: true, nullable: false, initial: "" }),
        quirks: new fields.StringField({ required: true, nullable: false, initial: "" }),
        background: new fields.StringField({ required: true, nullable: false, initial: "" }),
        contacts: new fields.StringField({ required: true, nullable: false, initial: "" }),
        notes: new fields.StringField({ required: true, nullable: false, initial: "" })
      })
    };
  }
}
