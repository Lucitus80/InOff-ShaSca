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

  actorTypeLabels: {
    character: "Character",
    npc: "NPC / Adversary"
  },

  itemTypes: {
    gear: "gear",
    weapon: "weapon",
    technique: "technique",
    mikkyo: "mikkyo",
    condition: "condition",
    quirk: "quirk",
    homelandAbility: "homelandAbility"
  },

  itemTypeLabels: {
    gear: "Gear",
    weapon: "Weapon",
    technique: "Technique",
    mikkyo: "Mikkyo",
    condition: "Condition",
    quirk: "Quirk",
    homelandAbility: "Homeland Ability"
  },

  /**
   * Foundry core icon paths used for newly created embedded items.
   * These avoid the generic item-bag icon where a clearer stock symbol exists.
   */
  itemDefaultIcons: {
    gear: "icons/svg/chest.svg",
    weapon: "icons/svg/sword.svg",
    technique: "icons/svg/book.svg",
    mikkyo: "icons/svg/aura.svg",
    condition: "icons/svg/terror.svg",
    quirk: "icons/svg/upgrade.svg",
    homelandAbility: "icons/svg/book.svg"
  },

  ratings: {
    attributeMax: 5,
    skillMax: 3,
    emptySymbol: "systems/shadow-scar/assets/symbols/empty.png",
    fullSymbol: "systems/shadow-scar/assets/symbols/full.png"
  },

  icons: {
    pause: "systems/shadow-scar/assets/symbols/pause.webp"
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
   * Clan and Rank choices for Techniques and Mikkyo.
   *
   * v0.7.2 renames the old Technique "Type" classifier to "Clan" and
   * uses the same Clan + Rank dropdowns for both Techniques and Mikkyo.
   */
  clans: {
    general: "General",
    arashi: "Arashi",
    futsumashi: "Futsumashi",
    hibana: "Hibana",
    kuromaku: "Kuromaku",
    tantei: "Tantei",
    wanami: "Wanami",
    kokoro: "Kokoro"
  },

  // Backward-compatible alias for older v0.7.1 templates/macros.
  techniqueTypes: {
    general: "General",
    arashi: "Arashi",
    futsumashi: "Futsumashi",
    hibana: "Hibana",
    kuromaku: "Kuromaku",
    tantei: "Tantei",
    wanami: "Wanami",
    kokoro: "Kokoro"
  },

  ranks: {
    genin: "Genin",
    chunin: "Chunin",
    jounin: "Jounin"
  },

  // Backward-compatible alias for older v0.7.1 templates/macros.
  techniqueRanks: {
    genin: "Genin",
    chunin: "Chunin",
    jounin: "Jounin"
  },

  mikkyoKiCosts: {
    genin: 1,
    chunin: 3,
    jounin: 5
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

  quirkTypes: {
    advantage: "Advantage",
    disadvantage: "Disadvantage"
  },

  npcThreatLevels: {
    minor: "Minor",
    standard: "Standard",
    elite: "Elite",
    boss: "Boss"
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
