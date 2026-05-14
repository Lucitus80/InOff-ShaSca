/**
 * Zentrale Konfiguration für das Shadow-Scar-System.
 *
 * Änderung ab v0.52:
 * -------------------
 * Die UI verwendet vorerst keine Foundry-Lokalisierungs-Keys mehr wie
 * "SHADOWSCAR.Attribute.Mind". Stattdessen stehen hier direkt lesbare
 * englische Labels wie "Mind", "Body" und "Spirit".
 *
 * Warum?
 * In der Prototypenphase ist das robuster: Wenn Foundry eine Sprachdatei nicht
 * lädt oder eine Spracheinstellung anders ist als erwartet, werden sonst die
 * technischen Keys im Charakterbogen angezeigt. Direkte Labels vermeiden das.
 */
export const SHADOW_SCAR = {
  id: "shadow-scar",
  title: "Shadow Scar",

  actorTypes: {
    character: "character",
    npc: "npc"
  },

  itemTypes: {
    gear: "gear",
    weapon: "weapon",
    technique: "technique",
    mikkyo: "mikkyo",
    condition: "condition"
  },

  itemTypeLabels: {
    gear: "Gear",
    weapon: "Weapon",
    technique: "Technique",
    mikkyo: "Mikkyo",
    condition: "Condition"
  },

  /**
   * Technische Schlüssel links, sichtbare Labels rechts.
   * Datenpfade bleiben unverändert:
   * - system.attributes.mind
   * - system.attributes.body
   * - system.attributes.spirit
   */
  attributes: {
    mind: "Mind",
    body: "Body",
    spirit: "Spirit"
  },

  /**
   * Skills sind nach dem zugehörigen Attribut gruppiert.
   *
   * Technische Datenpfade:
   * - system.skills.mind.awareness
   * - system.skills.body.melee
   * - system.skills.spirit.focus
   */
  skills: {
    mind: {
      awareness: "Awareness",
      disguise: "Disguise",
      engineering: "Engineering",
      knowledge: "Knowledge",
      marksmanship: "Marksmanship",
      medicine: "Medicine"
    },
    body: {
      athletics: "Athletics",
      endurance: "Endurance",
      maneuver: "Maneuver",
      melee: "Melee",
      stealth: "Stealth",
      strength: "Strength"
    },
    spirit: {
      artistry: "Artistry",
      insight: "Insight",
      focus: "Focus",
      manipulation: "Manipulation",
      performance: "Performance",
      resistance: "Resistance"
    }
  },

  /**
   * Technische Schlüssel links, sichtbare Labels rechts.
   * Datenpfade bleiben unverändert:
   * - system.resources.vitality.value
   * - system.resources.ki.value
   */
  resources: {
    vitality: "Vitality",
    ki: "Ki Reserve"
  },

  /**
   * Reusable item-sheet choices.
   *
   * These are UI helper lists only. The underlying data fields are still simple
   * strings, which keeps the prototype flexible while we refine the rules.
   */
  techniqueTiming: {
    action: "Action",
    reaction: "Reaction",
    passive: "Passive",
    special: "Special"
  },

  gearCategories: {
    general: "General",
    tool: "Tool",
    armor: "Armor",
    consumable: "Consumable",
    other: "Other"
  },

  weaponCategories: {
    melee: "Melee",
    ranged: "Ranged",
    thrown: "Thrown",
    special: "Special"
  },

  conditionCategories: {
    physical: "Physical",
    mental: "Mental",
    spiritual: "Spiritual",
    situational: "Situational",
    other: "Other"
  },

  /**
   * Flat skill map used by Item sheets.
   *
   * Actor sheets need skills grouped by attribute; item sheets often need one
   * dropdown with all skills. The value is the stored technical key.
   */
  flatSkills: {
    "mind.awareness": "Mind / Awareness",
    "mind.disguise": "Mind / Disguise",
    "mind.engineering": "Mind / Engineering",
    "mind.knowledge": "Mind / Knowledge",
    "mind.marksmanship": "Mind / Marksmanship",
    "mind.medicine": "Mind / Medicine",
    "body.athletics": "Body / Athletics",
    "body.endurance": "Body / Endurance",
    "body.maneuver": "Body / Maneuver",
    "body.melee": "Body / Melee",
    "body.stealth": "Body / Stealth",
    "body.strength": "Body / Strength",
    "spirit.artistry": "Spirit / Artistry",
    "spirit.insight": "Spirit / Insight",
    "spirit.focus": "Spirit / Focus",
    "spirit.manipulation": "Spirit / Manipulation",
    "spirit.performance": "Spirit / Performance",
    "spirit.resistance": "Spirit / Resistance"
  }
};
