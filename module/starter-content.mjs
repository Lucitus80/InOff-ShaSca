/**
 * Starter content for Shadow Scar v0.7.2.
 *
 * The same data is also written into the package compendium .db files. These
 * helpers are exposed on game.shadowScar.starterContent for quick test-world
 * imports while the system is still in active prototype development.
 */

export const STARTER_ITEMS = [
  {
    "_id": "ScKnife00000001",
    "name": "Combat Knife",
    "type": "weapon",
    "img": "icons/svg/sword.svg",
    "system": {
      "description": "<p>A compact blade for close work and desperate defense.</p>",
      "skill": "body.melee",
      "damage": "2",
      "range": "Close",
      "category": "melee",
      "equipped": false,
      "tags": "light, concealable, blade",
      "rpCost": 1
    },
    "effects": [],
    "folder": null,
    "sort": 100000,
    "ownership": {
      "default": 0
    },
    "flags": {
      "shadow-scar": {
        "starterContent": true,
        "version": "0.7.15"
      }
    }
  },
  {
    "_id": "ScKatana0000002",
    "name": "Katana",
    "type": "weapon",
    "img": "icons/svg/sword.svg",
    "system": {
      "description": "<p>A curved sword for disciplined melee attacks.</p>",
      "skill": "body.melee",
      "damage": "4",
      "range": "Close",
      "category": "melee",
      "equipped": false,
      "tags": "blade, two-handed, precise",
      "rpCost": 5
    },
    "effects": [],
    "folder": null,
    "sort": 200000,
    "ownership": {
      "default": 0
    },
    "flags": {
      "shadow-scar": {
        "starterContent": true,
        "version": "0.7.15"
      }
    }
  },
  {
    "_id": "ScBaton00000003",
    "name": "Shock Baton",
    "type": "weapon",
    "img": "icons/svg/sword.svg",
    "system": {
      "description": "<p>A baton that delivers painful incapacitating shocks.</p>",
      "skill": "body.melee",
      "damage": "3",
      "range": "Close",
      "category": "melee",
      "equipped": false,
      "tags": "stun, nonlethal",
      "rpCost": 3
    },
    "effects": [],
    "folder": null,
    "sort": 300000,
    "ownership": {
      "default": 0
    },
    "flags": {
      "shadow-scar": {
        "starterContent": true,
        "version": "0.7.15"
      }
    }
  },
  {
    "_id": "ScHPistol000004",
    "name": "Heavy Pistol",
    "type": "weapon",
    "img": "icons/svg/sword.svg",
    "system": {
      "description": "<p>A reliable large-caliber pistol for street-level firefights.</p>",
      "skill": "mind.marksmanship",
      "damage": "4",
      "range": "Short",
      "category": "ranged",
      "equipped": false,
      "tags": "firearm, loud, sidearm",
      "rpCost": 4
    },
    "effects": [],
    "folder": null,
    "sort": 400000,
    "ownership": {
      "default": 0
    },
    "flags": {
      "shadow-scar": {
        "starterContent": true,
        "version": "0.7.15"
      }
    }
  },
  {
    "_id": "ScSmg0000000005",
    "name": "Compact SMG",
    "type": "weapon",
    "img": "icons/svg/sword.svg",
    "system": {
      "description": "<p>A compact automatic weapon for short controlled bursts.</p>",
      "skill": "mind.marksmanship",
      "damage": "5",
      "range": "Medium",
      "category": "ranged",
      "equipped": false,
      "tags": "firearm, burst, concealable",
      "rpCost": 6
    },
    "effects": [],
    "folder": null,
    "sort": 500000,
    "ownership": {
      "default": 0
    },
    "flags": {
      "shadow-scar": {
        "starterContent": true,
        "version": "0.7.15"
      }
    }
  },
  {
    "_id": "ScThrowKnife006",
    "name": "Throwing Knife",
    "type": "weapon",
    "img": "icons/svg/sword.svg",
    "system": {
      "description": "<p>A balanced blade meant to be thrown at close or short range.</p>",
      "skill": "body.maneuver",
      "damage": "2",
      "range": "Short",
      "category": "thrown",
      "equipped": false,
      "tags": "thrown, blade, silent",
      "rpCost": 1
    },
    "effects": [],
    "folder": null,
    "sort": 600000,
    "ownership": {
      "default": 0
    },
    "flags": {
      "shadow-scar": {
        "starterContent": true,
        "version": "0.7.15"
      }
    }
  },
  {
    "_id": "ScStaff00000007",
    "name": "Reinforced Staff",
    "type": "weapon",
    "img": "icons/svg/sword.svg",
    "system": {
      "description": "<p>A sturdy staff usable as a weapon and ritual focus.</p>",
      "skill": "body.melee",
      "damage": "3",
      "range": "Close",
      "category": "melee",
      "equipped": false,
      "tags": "staff, defensive, blunt",
      "rpCost": 2
    },
    "effects": [],
    "folder": null,
    "sort": 700000,
    "ownership": {
      "default": 0
    },
    "flags": {
      "shadow-scar": {
        "starterContent": true,
        "version": "0.7.15"
      }
    }
  },
  {
    "_id": "ScClub000000008",
    "name": "Heavy Club",
    "type": "weapon",
    "img": "icons/svg/sword.svg",
    "system": {
      "description": "<p>A crude heavy impact weapon for bruisers and monsters.</p>",
      "skill": "body.melee",
      "damage": "4",
      "range": "Close",
      "category": "melee",
      "equipped": false,
      "tags": "brutal, blunt, improvised",
      "rpCost": 1
    },
    "effects": [],
    "folder": null,
    "sort": 800000,
    "ownership": {
      "default": 0
    },
    "flags": {
      "shadow-scar": {
        "starterContent": true,
        "version": "0.7.15"
      }
    }
  },
  {
    "_id": "ScJacket0000001",
    "name": "Armored Jacket",
    "type": "gear",
    "img": "icons/svg/shield.svg",
    "system": {
      "description": "<p>Common street protection with modest armor plates.</p>",
      "quantity": 1,
      "category": "armor",
      "equipped": false,
      "effect": "Basic street armor. Counts as equipped protection when worn.",
      "armorValue": 2,
      "resistanceValue": 0,
      "defenseBonus": 0,
      "damageReduction": 0,
      "notes": "Flexible armor; easy to conceal under street clothing.",
      "tags": "armor, streetwear",
      "rpCost": 2
    },
    "effects": [],
    "folder": null,
    "sort": 900000,
    "ownership": {
      "default": 0
    },
    "flags": {
      "shadow-scar": {
        "starterContent": true,
        "version": "0.7.15"
      }
    }
  },
  {
    "_id": "ScVest000000002",
    "name": "Tactical Vest",
    "type": "gear",
    "img": "icons/svg/shield.svg",
    "system": {
      "description": "<p>A heavier vest for guards, mercs, and prepared runners.</p>",
      "quantity": 1,
      "category": "armor",
      "equipped": false,
      "effect": "Heavier ballistic protection for combat scenes.",
      "armorValue": 3,
      "resistanceValue": 0,
      "defenseBonus": 0,
      "damageReduction": 1,
      "notes": "Bulky but dependable; includes one point of damage reduction.",
      "tags": "armor, tactical",
      "rpCost": 3
    },
    "effects": [],
    "folder": null,
    "sort": 1000000,
    "ownership": {
      "default": 0
    },
    "flags": {
      "shadow-scar": {
        "starterContent": true,
        "version": "0.7.15"
      }
    }
  },
  {
    "_id": "ScWeave00000003",
    "name": "Shinobi Weave Coat",
    "type": "gear",
    "img": "icons/svg/shield.svg",
    "system": {
      "description": "<p>A reinforced coat designed for mobility and silent operations.</p>",
      "quantity": 1,
      "category": "armor",
      "equipped": false,
      "effect": "Light protective coat with subtle defensive weave.",
      "armorValue": 1,
      "resistanceValue": 1,
      "defenseBonus": 1,
      "damageReduction": 0,
      "notes": "Defense Bonus is shown as a reminder and is not automatically subtracted.",
      "tags": "armor, stealth, stylish",
      "rpCost": 4
    },
    "effects": [],
    "folder": null,
    "sort": 1100000,
    "ownership": {
      "default": 0
    },
    "flags": {
      "shadow-scar": {
        "starterContent": true,
        "version": "0.7.15"
      }
    }
  },
  {
    "_id": "ScMedkit0000004",
    "name": "Field Medkit",
    "type": "gear",
    "img": "icons/svg/chest.svg",
    "system": {
      "description": "<p>Bandages, sealant, antiseptic, injectors and compact trauma tools.</p>",
      "quantity": 1,
      "category": "tool",
      "equipped": false,
      "effect": "+1 situational help on appropriate Medicine checks.",
      "armorValue": 0,
      "resistanceValue": 0,
      "defenseBonus": 0,
      "damageReduction": 0,
      "notes": "",
      "tags": "medicine, tool, consumable",
      "rpCost": 2
    },
    "effects": [],
    "folder": null,
    "sort": 1200000,
    "ownership": {
      "default": 0
    },
    "flags": {
      "shadow-scar": {
        "starterContent": true,
        "version": "0.7.15"
      }
    }
  },
  {
    "_id": "ScLockkit000005",
    "name": "Lockpick Set",
    "type": "gear",
    "img": "icons/svg/chest.svg",
    "system": {
      "description": "<p>Mechanical picks, bypass tools, and small probes.</p>",
      "quantity": 1,
      "category": "tool",
      "equipped": false,
      "effect": "+1 situational help on appropriate Engineering or infiltration checks.",
      "armorValue": 0,
      "resistanceValue": 0,
      "defenseBonus": 0,
      "damageReduction": 0,
      "notes": "",
      "tags": "tool, infiltration",
      "rpCost": 2
    },
    "effects": [],
    "folder": null,
    "sort": 1300000,
    "ownership": {
      "default": 0
    },
    "flags": {
      "shadow-scar": {
        "starterContent": true,
        "version": "0.7.15"
      }
    }
  },
  {
    "_id": "ScSmoke0000006",
    "name": "Smoke Bomb",
    "type": "gear",
    "img": "icons/svg/chest.svg",
    "system": {
      "description": "<p>A compact smoke charge used for escapes, ambushes, and misdirection.</p>",
      "quantity": 1,
      "category": "consumable",
      "equipped": false,
      "effect": "Creates a short-lived cloud of concealment; apply table rulings manually.",
      "armorValue": 0,
      "resistanceValue": 0,
      "defenseBonus": 0,
      "damageReduction": 0,
      "notes": "",
      "tags": "consumable, concealment, ninja",
      "rpCost": 1
    },
    "effects": [],
    "folder": null,
    "sort": 1400000,
    "ownership": {
      "default": 0
    },
    "flags": {
      "shadow-scar": {
        "starterContent": true,
        "version": "0.7.15"
      }
    }
  },
  {
    "_id": "ScWard00000007",
    "name": "Mystic Ward Charm",
    "type": "gear",
    "img": "icons/svg/shield.svg",
    "system": {
      "description": "<p>A small charm carrying protective prayer strips and talismans.</p>",
      "quantity": 1,
      "category": "armor",
      "equipped": false,
      "effect": "Spiritual protection against hostile energies.",
      "armorValue": 0,
      "resistanceValue": 2,
      "defenseBonus": 0,
      "damageReduction": 0,
      "notes": "Resistance applies automatically in the damage dialog when equipped.",
      "tags": "mikkyo, ward, resistance",
      "rpCost": 3
    },
    "effects": [],
    "folder": null,
    "sort": 1500000,
    "ownership": {
      "default": 0
    },
    "flags": {
      "shadow-scar": {
        "starterContent": true,
        "version": "0.7.15"
      }
    }
  },
  {
    "_id": "ScWounded000001",
    "name": "Wounded",
    "type": "condition",
    "img": "icons/svg/aura.svg",
    "system": {
      "description": "<p>The character is hurt, slowed, or fighting through pain.</p>",
      "active": false,
      "intensity": 1,
      "category": "physical",
      "modifier": -1,
      "penalty": "-1 while injury meaningfully impairs the action."
    },
    "effects": [],
    "folder": null,
    "sort": 1600000,
    "ownership": {
      "default": 0
    },
    "flags": {
      "shadow-scar": {
        "starterContent": true,
        "version": "0.7.4"
      }
    }
  },
  {
    "_id": "ScBleeding00002",
    "name": "Bleeding",
    "type": "condition",
    "img": "icons/svg/aura.svg",
    "system": {
      "description": "<p>Open wounds or blood loss create pressure and risk.</p>",
      "active": false,
      "intensity": 1,
      "category": "physical",
      "modifier": -1,
      "penalty": "-1 and may worsen if ignored, depending on table rulings."
    },
    "effects": [],
    "folder": null,
    "sort": 1700000,
    "ownership": {
      "default": 0
    },
    "flags": {
      "shadow-scar": {
        "starterContent": true,
        "version": "0.7.4"
      }
    }
  },
  {
    "_id": "ScStunned000003",
    "name": "Stunned",
    "type": "condition",
    "img": "icons/svg/aura.svg",
    "system": {
      "description": "<p>The character is staggered, shocked, or mentally scrambled.</p>",
      "active": false,
      "intensity": 1,
      "category": "mental",
      "modifier": -2,
      "penalty": "-2 while disoriented or unable to fully react."
    },
    "effects": [],
    "folder": null,
    "sort": 1800000,
    "ownership": {
      "default": 0
    },
    "flags": {
      "shadow-scar": {
        "starterContent": true,
        "version": "0.7.4"
      }
    }
  },
  {
    "_id": "ScFocused00004",
    "name": "Focused",
    "type": "condition",
    "img": "icons/svg/aura.svg",
    "system": {
      "description": "<p>The character has centered breath, intent, and Ki flow.</p>",
      "active": false,
      "intensity": 1,
      "category": "spiritual",
      "modifier": 1,
      "penalty": "+1 to the next suitable focused action."
    },
    "effects": [],
    "folder": null,
    "sort": 1900000,
    "ownership": {
      "default": 0
    },
    "flags": {
      "shadow-scar": {
        "starterContent": true,
        "version": "0.7.4"
      }
    }
  },
  {
    "_id": "ScHidden000005",
    "name": "Hidden",
    "type": "condition",
    "img": "icons/svg/aura.svg",
    "system": {
      "description": "<p>The character is concealed or overlooked.</p>",
      "active": false,
      "intensity": 1,
      "category": "situational",
      "modifier": 1,
      "penalty": "+1 to suitable stealth, ambush, or escape actions."
    },
    "effects": [],
    "folder": null,
    "sort": 2000000,
    "ownership": {
      "default": 0
    },
    "flags": {
      "shadow-scar": {
        "starterContent": true,
        "version": "0.7.4"
      }
    }
  },
  {
    "_id": "ScPinned000006",
    "name": "Pinned Down",
    "type": "condition",
    "img": "icons/svg/aura.svg",
    "system": {
      "description": "<p>Incoming pressure or bad positioning limits options.</p>",
      "active": false,
      "intensity": 1,
      "category": "situational",
      "modifier": -1,
      "penalty": "-1 while suppressed or unable to move freely."
    },
    "effects": [],
    "folder": null,
    "sort": 2100000,
    "ownership": {
      "default": 0
    },
    "flags": {
      "shadow-scar": {
        "starterContent": true,
        "version": "0.7.4"
      }
    }
  },
  {
    "_id": "ScQuickDraw001",
    "name": "Quick Draw",
    "type": "technique",
    "img": "icons/svg/upgrade.svg",
    "system": {
      "description": "<p>A practiced draw that turns hesitation into action.</p><p>Trigger: Drawing or readying a weapon under pressure.</p><p>Effect: Ready a suitable weapon quickly; roll normally if the table calls for it.</p><p>Tags: combat, weapon, reaction</p>",
      "rank": "genin",
      "clan": "general"
    },
    "effects": [],
    "folder": null,
    "sort": 2200000,
    "ownership": {
      "default": 0
    },
    "flags": {
      "shadow-scar": {
        "starterContent": true,
        "version": "0.7.4"
      }
    }
  },
  {
    "_id": "ScPreciseStrike2",
    "name": "Precise Strike",
    "type": "technique",
    "img": "icons/svg/upgrade.svg",
    "system": {
      "description": "<p>A focused attack aimed at joints, weak armor, or exposed guard.</p><p>Trigger: A melee attack against a vulnerable opening.</p><p>Effect: Spend Ki if desired; on a strong hit, increase pressure or damage by table ruling.</p><p>Tags: combat, melee, ki</p>",
      "rank": "chunin",
      "clan": "general"
    },
    "effects": [],
    "folder": null,
    "sort": 2300000,
    "ownership": {
      "default": 0
    },
    "flags": {
      "shadow-scar": {
        "starterContent": true,
        "version": "0.7.4"
      }
    }
  },
  {
    "_id": "ScSilentStep03",
    "name": "Silent Step",
    "type": "technique",
    "img": "icons/svg/upgrade.svg",
    "system": {
      "description": "<p>Breath control and body discipline reduce sound and presence.</p><p>Trigger: Moving through a watched or dangerous area.</p><p>Effect: Spend Ki if desired; supports stealthy movement and escape scenes.</p><p>Tags: stealth, movement, ki</p>",
      "rank": "genin",
      "clan": "tantei"
    },
    "effects": [],
    "folder": null,
    "sort": 2400000,
    "ownership": {
      "default": 0
    },
    "flags": {
      "shadow-scar": {
        "starterContent": true,
        "version": "0.7.4"
      }
    }
  },
  {
    "_id": "ScIronPrayer1",
    "name": "Iron Skin Prayer",
    "type": "mikkyo",
    "img": "icons/svg/explosion.svg",
    "system": {
      "description": "<p>A brief mantra hardens spirit and flesh against harm.</p><p>Timing: reaction</p><p>Range: Self</p><p>Duration: One exchange</p><p>Effect: Protective prayer; use as a table-facing reminder before final damage is applied.</p><p>Tags: protection, reaction, mikkyo</p>",
      "clan": "general",
      "rank": "genin"
    },
    "effects": [],
    "folder": null,
    "sort": 2500000,
    "ownership": {
      "default": 0
    },
    "flags": {
      "shadow-scar": {
        "starterContent": true,
        "version": "0.7.4"
      }
    }
  },
  {
    "_id": "ScStillVeil02",
    "name": "Veil of Stillness",
    "type": "mikkyo",
    "img": "icons/svg/explosion.svg",
    "system": {
      "description": "<p>A quieting veil that makes motion and presence harder to notice.</p><p>Timing: action</p><p>Range: Self / Near</p><p>Duration: Scene</p><p>Effect: Dampens sound and attention; apply concealment or stealth rulings manually.</p><p>Tags: stealth, silence, mikkyo</p>",
      "clan": "general",
      "rank": "genin"
    },
    "effects": [],
    "folder": null,
    "sort": 2600000,
    "ownership": {
      "default": 0
    },
    "flags": {
      "shadow-scar": {
        "starterContent": true,
        "version": "0.7.4"
      }
    }
  }
];

export const STARTER_ADVERSARIES = [
  {
    "_id": "ScNpcThug00001",
    "name": "Street Thug",
    "type": "npc",
    "img": "icons/svg/mystery-man.svg",
    "system": {
      "attributes": {
        "mind": 1,
        "body": 2,
        "spirit": 1
      },
      "skills": {
        "mind": {
          "awareness": 0,
          "disguise": 0,
          "engineering": 0,
          "knowledge": 0,
          "marksmanship": 0,
          "medicine": 0
        },
        "body": {
          "athletics": 1,
          "endurance": 0,
          "maneuver": 0,
          "melee": 1,
          "stealth": 0,
          "strength": 0
        },
        "spirit": {
          "artistry": 0,
          "insight": 0,
          "focus": 0,
          "manipulation": 1,
          "performance": 0,
          "resistance": 0
        }
      },
      "resources": {
        "vitality": {
          "value": 6,
          "max": 6
        },
        "ki": {
          "value": 0,
          "max": 0
        }
      },
      "details": {
        "concept": "Minor street-level opponent",
        "background": "",
        "contacts": "",
        "notes": "Good first combat test for the damage workflow."
      },
      "npc": {
        "role": "Bruiser",
        "adversaryType": "Gang Muscle",
        "threatLevel": "minor",
        "tactics": "Close distance, threaten loudly, and attack isolated targets. Flees when badly hurt."
      }
    },
    "items": [
      {
        "_id": "ThugKnife000001",
        "name": "Combat Knife",
        "type": "weapon",
        "img": "icons/svg/sword.svg",
        "system": {
          "description": "<p>A compact blade for close work and desperate defense.</p>",
          "skill": "body.melee",
          "damage": "2",
          "range": "Close",
          "category": "melee",
          "equipped": true,
          "tags": "light, concealable, blade",
          "rpCost": 1
        },
        "effects": [],
        "folder": null,
        "sort": 100000,
        "flags": {
          "shadow-scar": {
            "starterContent": true,
            "version": "0.7.15"
          }
        }
      },
      {
        "_id": "ThugJacket0001",
        "name": "Armored Jacket",
        "type": "gear",
        "img": "icons/svg/shield.svg",
        "system": {
          "description": "<p>Common street protection with modest armor plates.</p>",
          "quantity": 1,
          "category": "armor",
          "equipped": true,
          "effect": "Basic street armor. Counts as equipped protection when worn.",
          "armorValue": 2,
          "resistanceValue": 0,
          "defenseBonus": 0,
          "damageReduction": 0,
          "notes": "Flexible armor; easy to conceal under street clothing.",
          "tags": "armor, streetwear",
          "rpCost": 2
        },
        "effects": [],
        "folder": null,
        "sort": 900000,
        "flags": {
          "shadow-scar": {
            "starterContent": true,
            "version": "0.7.15"
          }
        }
      }
    ],
    "effects": [],
    "folder": null,
    "sort": 100000,
    "ownership": {
      "default": 0
    },
    "prototypeToken": {
      "name": "Street Thug",
      "displayName": 20,
      "actorLink": false,
      "disposition": -1,
      "displayBars": 20,
      "bar1": {
        "attribute": "resources.vitality"
      },
      "bar2": {
        "attribute": "resources.ki"
      },
      "texture": {
        "src": "icons/svg/mystery-man.svg"
      }
    },
    "flags": {
      "shadow-scar": {
        "starterContent": true,
        "version": "0.7.15"
      }
    }
  },
  {
    "_id": "ScNpcGuard0002",
    "name": "Corporate Guard",
    "type": "npc",
    "img": "icons/svg/mystery-man.svg",
    "system": {
      "attributes": {
        "mind": 2,
        "body": 2,
        "spirit": 1
      },
      "skills": {
        "mind": {
          "awareness": 1,
          "disguise": 0,
          "engineering": 0,
          "knowledge": 0,
          "marksmanship": 2,
          "medicine": 0
        },
        "body": {
          "athletics": 0,
          "endurance": 1,
          "maneuver": 0,
          "melee": 1,
          "stealth": 0,
          "strength": 0
        },
        "spirit": {
          "artistry": 0,
          "insight": 0,
          "focus": 0,
          "manipulation": 0,
          "performance": 0,
          "resistance": 0
        }
      },
      "resources": {
        "vitality": {
          "value": 8,
          "max": 8
        },
        "ki": {
          "value": 1,
          "max": 1
        }
      },
      "details": {
        "concept": "Standard armed guard",
        "background": "",
        "contacts": "",
        "notes": "Uses Heavy Pistol and Tactical Vest to test armor-aware damage."
      },
      "npc": {
        "role": "Security",
        "adversaryType": "Professional Guard",
        "threatLevel": "standard",
        "tactics": "Use cover, call backup, and focus fire on obvious threats."
      }
    },
    "items": [
      {
        "_id": "GuardPistol0001",
        "name": "Heavy Pistol",
        "type": "weapon",
        "img": "icons/svg/sword.svg",
        "system": {
          "description": "<p>A reliable large-caliber pistol for street-level firefights.</p>",
          "skill": "mind.marksmanship",
          "damage": "4",
          "range": "Short",
          "category": "ranged",
          "equipped": true,
          "tags": "firearm, loud, sidearm",
          "rpCost": 4
        },
        "effects": [],
        "folder": null,
        "sort": 400000,
        "flags": {
          "shadow-scar": {
            "starterContent": true,
            "version": "0.7.15"
          }
        }
      },
      {
        "_id": "GuardVest00001",
        "name": "Tactical Vest",
        "type": "gear",
        "img": "icons/svg/shield.svg",
        "system": {
          "description": "<p>A heavier vest for guards, mercs, and prepared runners.</p>",
          "quantity": 1,
          "category": "armor",
          "equipped": true,
          "effect": "Heavier ballistic protection for combat scenes.",
          "armorValue": 3,
          "resistanceValue": 0,
          "defenseBonus": 0,
          "damageReduction": 1,
          "notes": "Bulky but dependable; includes one point of damage reduction.",
          "tags": "armor, tactical",
          "rpCost": 3
        },
        "effects": [],
        "folder": null,
        "sort": 1000000,
        "flags": {
          "shadow-scar": {
            "starterContent": true,
            "version": "0.7.15"
          }
        }
      },
      {
        "_id": "GuardMedkit001",
        "name": "Field Medkit",
        "type": "gear",
        "img": "icons/svg/chest.svg",
        "system": {
          "description": "<p>Bandages, sealant, antiseptic, injectors and compact trauma tools.</p>",
          "quantity": 1,
          "category": "tool",
          "equipped": false,
          "effect": "+1 situational help on appropriate Medicine checks.",
          "armorValue": 0,
          "resistanceValue": 0,
          "defenseBonus": 0,
          "damageReduction": 0,
          "notes": "",
          "tags": "medicine, tool, consumable",
          "rpCost": 2
        },
        "effects": [],
        "folder": null,
        "sort": 1200000,
        "flags": {
          "shadow-scar": {
            "starterContent": true,
            "version": "0.7.15"
          }
        }
      }
    ],
    "effects": [],
    "folder": null,
    "sort": 200000,
    "ownership": {
      "default": 0
    },
    "prototypeToken": {
      "name": "Corporate Guard",
      "displayName": 20,
      "actorLink": false,
      "disposition": -1,
      "displayBars": 20,
      "bar1": {
        "attribute": "resources.vitality"
      },
      "bar2": {
        "attribute": "resources.ki"
      },
      "texture": {
        "src": "icons/svg/mystery-man.svg"
      }
    },
    "flags": {
      "shadow-scar": {
        "starterContent": true,
        "version": "0.7.15"
      }
    }
  },
  {
    "_id": "ScNpcScout0003",
    "name": "Ninja Scout",
    "type": "npc",
    "img": "icons/svg/mystery-man.svg",
    "system": {
      "attributes": {
        "mind": 2,
        "body": 3,
        "spirit": 2
      },
      "skills": {
        "mind": {
          "awareness": 1,
          "disguise": 0,
          "engineering": 0,
          "knowledge": 0,
          "marksmanship": 0,
          "medicine": 0
        },
        "body": {
          "athletics": 2,
          "endurance": 0,
          "maneuver": 1,
          "melee": 1,
          "stealth": 2,
          "strength": 0
        },
        "spirit": {
          "artistry": 0,
          "insight": 0,
          "focus": 0,
          "manipulation": 0,
          "performance": 0,
          "resistance": 0
        }
      },
      "resources": {
        "vitality": {
          "value": 8,
          "max": 8
        },
        "ki": {
          "value": 2,
          "max": 2
        }
      },
      "details": {
        "concept": "Fast stealth opponent",
        "background": "",
        "contacts": "",
        "notes": "Good test for Key Skills and equipped weapon shortcuts on the NPC sheet."
      },
      "npc": {
        "role": "Scout",
        "adversaryType": "Mobile Infiltrator",
        "threatLevel": "standard",
        "tactics": "Start hidden, strike from angles, use smoke to disengage."
      }
    },
    "items": [
      {
        "_id": "ScoutKatana001",
        "name": "Katana",
        "type": "weapon",
        "img": "icons/svg/sword.svg",
        "system": {
          "description": "<p>A curved sword for disciplined melee attacks.</p>",
          "skill": "body.melee",
          "damage": "4",
          "range": "Close",
          "category": "melee",
          "equipped": true,
          "tags": "blade, two-handed, precise",
          "rpCost": 5
        },
        "effects": [],
        "folder": null,
        "sort": 200000,
        "flags": {
          "shadow-scar": {
            "starterContent": true,
            "version": "0.7.15"
          }
        }
      },
      {
        "_id": "ScoutThrow001",
        "name": "Throwing Knife",
        "type": "weapon",
        "img": "icons/svg/sword.svg",
        "system": {
          "description": "<p>A balanced blade meant to be thrown at close or short range.</p>",
          "skill": "body.maneuver",
          "damage": "2",
          "range": "Short",
          "category": "thrown",
          "equipped": true,
          "tags": "thrown, blade, silent",
          "rpCost": 1
        },
        "effects": [],
        "folder": null,
        "sort": 600000,
        "flags": {
          "shadow-scar": {
            "starterContent": true,
            "version": "0.7.15"
          }
        }
      },
      {
        "_id": "ScoutCoat0001",
        "name": "Shinobi Weave Coat",
        "type": "gear",
        "img": "icons/svg/shield.svg",
        "system": {
          "description": "<p>A reinforced coat designed for mobility and silent operations.</p>",
          "quantity": 1,
          "category": "armor",
          "equipped": true,
          "effect": "Light protective coat with subtle defensive weave.",
          "armorValue": 1,
          "resistanceValue": 1,
          "defenseBonus": 1,
          "damageReduction": 0,
          "notes": "Defense Bonus is shown as a reminder and is not automatically subtracted.",
          "tags": "armor, stealth, stylish",
          "rpCost": 4
        },
        "effects": [],
        "folder": null,
        "sort": 1100000,
        "flags": {
          "shadow-scar": {
            "starterContent": true,
            "version": "0.7.15"
          }
        }
      },
      {
        "_id": "ScoutSmoke001",
        "name": "Smoke Bomb",
        "type": "gear",
        "img": "icons/svg/chest.svg",
        "system": {
          "description": "<p>A compact smoke charge used for escapes, ambushes, and misdirection.</p>",
          "quantity": 2,
          "category": "consumable",
          "equipped": false,
          "effect": "Creates a short-lived cloud of concealment; apply table rulings manually.",
          "armorValue": 0,
          "resistanceValue": 0,
          "defenseBonus": 0,
          "damageReduction": 0,
          "notes": "",
          "tags": "consumable, concealment, ninja",
          "rpCost": 1
        },
        "effects": [],
        "folder": null,
        "sort": 1400000,
        "flags": {
          "shadow-scar": {
            "starterContent": true,
            "version": "0.7.15"
          }
        }
      },
      {
        "_id": "ScoutStep0001",
        "name": "Silent Step",
        "type": "technique",
        "img": "icons/svg/upgrade.svg",
        "system": {
          "description": "<p>Breath control and body discipline reduce sound and presence.</p><p>Trigger: Moving through a watched or dangerous area.</p><p>Effect: Spend Ki if desired; supports stealthy movement and escape scenes.</p><p>Tags: stealth, movement, ki</p>",
          "rank": "genin",
          "clan": "tantei"
        },
        "effects": [],
        "folder": null,
        "sort": 2400000,
        "flags": {
          "shadow-scar": {
            "starterContent": true,
            "version": "0.7.4"
          }
        }
      }
    ],
    "effects": [],
    "folder": null,
    "sort": 300000,
    "ownership": {
      "default": 0
    },
    "prototypeToken": {
      "name": "Ninja Scout",
      "displayName": 20,
      "actorLink": false,
      "disposition": -1,
      "displayBars": 20,
      "bar1": {
        "attribute": "resources.vitality"
      },
      "bar2": {
        "attribute": "resources.ki"
      },
      "texture": {
        "src": "icons/svg/mystery-man.svg"
      }
    },
    "flags": {
      "shadow-scar": {
        "starterContent": true,
        "version": "0.7.15"
      }
    }
  },
  {
    "_id": "ScNpcBruiser04",
    "name": "Oni Bruiser",
    "type": "npc",
    "img": "icons/svg/mystery-man.svg",
    "system": {
      "attributes": {
        "mind": 1,
        "body": 4,
        "spirit": 2
      },
      "skills": {
        "mind": {
          "awareness": 0,
          "disguise": 0,
          "engineering": 0,
          "knowledge": 0,
          "marksmanship": 0,
          "medicine": 0
        },
        "body": {
          "athletics": 0,
          "endurance": 2,
          "maneuver": 0,
          "melee": 3,
          "stealth": 0,
          "strength": 2
        },
        "spirit": {
          "artistry": 0,
          "insight": 0,
          "focus": 0,
          "manipulation": 0,
          "performance": 0,
          "resistance": 1
        }
      },
      "resources": {
        "vitality": {
          "value": 14,
          "max": 14
        },
        "ki": {
          "value": 1,
          "max": 1
        }
      },
      "details": {
        "concept": "Elite melee threat",
        "background": "",
        "contacts": "",
        "notes": "High Vitality and strong melee pool; useful for testing longer fights."
      },
      "npc": {
        "role": "Heavy",
        "adversaryType": "Elite Monster",
        "threatLevel": "elite",
        "tactics": "Absorb punishment, break the front line, and force characters to reposition."
      }
    },
    "items": [
      {
        "_id": "BruiserClub001",
        "name": "Heavy Club",
        "type": "weapon",
        "img": "icons/svg/sword.svg",
        "system": {
          "description": "<p>A crude heavy impact weapon for bruisers and monsters.</p>",
          "skill": "body.melee",
          "damage": "4",
          "range": "Close",
          "category": "melee",
          "equipped": true,
          "tags": "brutal, blunt, improvised",
          "rpCost": 1
        },
        "effects": [],
        "folder": null,
        "sort": 800000,
        "flags": {
          "shadow-scar": {
            "starterContent": true,
            "version": "0.7.15"
          }
        }
      },
      {
        "_id": "BruiserPlating1",
        "name": "Reinforced Hide Plates",
        "type": "gear",
        "img": "icons/svg/chest.svg",
        "system": {
          "description": "<p>Thick protective layers that reduce incoming harm.</p>",
          "quantity": 1,
          "category": "armor",
          "equipped": false,
          "effect": "Natural and improvised armor plating.",
          "armorValue": 2,
          "resistanceValue": 1,
          "defenseBonus": 0,
          "damageReduction": 1,
          "notes": "Represents thick hide, armor scraps, and sheer mass.",
          "tags": "armor, monster",
          "rpCost": 0
        },
        "effects": [],
        "folder": null,
        "sort": 0,
        "ownership": {
          "default": 0
        },
        "flags": {
          "shadow-scar": {
            "starterContent": true,
            "version": "0.7.15"
          }
        }
      }
    ],
    "effects": [],
    "folder": null,
    "sort": 400000,
    "ownership": {
      "default": 0
    },
    "prototypeToken": {
      "name": "Oni Bruiser",
      "displayName": 20,
      "actorLink": false,
      "disposition": -1,
      "displayBars": 20,
      "bar1": {
        "attribute": "resources.vitality"
      },
      "bar2": {
        "attribute": "resources.ki"
      },
      "texture": {
        "src": "icons/svg/mystery-man.svg"
      }
    },
    "flags": {
      "shadow-scar": {
        "starterContent": true,
        "version": "0.7.15"
      }
    }
  },
  {
    "_id": "ScNpcAdept0005",
    "name": "Mikkyo Adept",
    "type": "npc",
    "img": "icons/svg/mystery-man.svg",
    "system": {
      "attributes": {
        "mind": 2,
        "body": 2,
        "spirit": 4
      },
      "skills": {
        "mind": {
          "awareness": 0,
          "disguise": 0,
          "engineering": 0,
          "knowledge": 1,
          "marksmanship": 0,
          "medicine": 0
        },
        "body": {
          "athletics": 0,
          "endurance": 0,
          "maneuver": 0,
          "melee": 1,
          "stealth": 0,
          "strength": 0
        },
        "spirit": {
          "artistry": 0,
          "insight": 2,
          "focus": 3,
          "manipulation": 0,
          "performance": 0,
          "resistance": 2
        }
      },
      "resources": {
        "vitality": {
          "value": 9,
          "max": 9
        },
        "ki": {
          "value": 5,
          "max": 5
        }
      },
      "details": {
        "concept": "Spiritual support adversary",
        "background": "",
        "contacts": "",
        "notes": "Tests Ki use, Mikkyo chat output, and resistance gear."
      },
      "npc": {
        "role": "Mystic Support",
        "adversaryType": "Elite Adept",
        "threatLevel": "elite",
        "tactics": "Keep distance, use Mikkyo defensively, and support stronger melee allies."
      }
    },
    "items": [
      {
        "_id": "AdeptStaff0001",
        "name": "Reinforced Staff",
        "type": "weapon",
        "img": "icons/svg/sword.svg",
        "system": {
          "description": "<p>A sturdy staff usable as a weapon and ritual focus.</p>",
          "skill": "body.melee",
          "damage": "3",
          "range": "Close",
          "category": "melee",
          "equipped": true,
          "tags": "staff, defensive, blunt",
          "rpCost": 2
        },
        "effects": [],
        "folder": null,
        "sort": 700000,
        "flags": {
          "shadow-scar": {
            "starterContent": true,
            "version": "0.7.15"
          }
        }
      },
      {
        "_id": "AdeptWard00001",
        "name": "Mystic Ward Charm",
        "type": "gear",
        "img": "icons/svg/shield.svg",
        "system": {
          "description": "<p>A small charm carrying protective prayer strips and talismans.</p>",
          "quantity": 1,
          "category": "armor",
          "equipped": true,
          "effect": "Spiritual protection against hostile energies.",
          "armorValue": 0,
          "resistanceValue": 2,
          "defenseBonus": 0,
          "damageReduction": 0,
          "notes": "Resistance applies automatically in the damage dialog when equipped.",
          "tags": "mikkyo, ward, resistance",
          "rpCost": 3
        },
        "effects": [],
        "folder": null,
        "sort": 1500000,
        "flags": {
          "shadow-scar": {
            "starterContent": true,
            "version": "0.7.15"
          }
        }
      },
      {
        "_id": "AdeptIron0001",
        "name": "Iron Skin Prayer",
        "type": "mikkyo",
        "img": "icons/svg/explosion.svg",
        "system": {
          "description": "<p>A brief mantra hardens spirit and flesh against harm.</p><p>Timing: reaction</p><p>Range: Self</p><p>Duration: One exchange</p><p>Effect: Protective prayer; use as a table-facing reminder before final damage is applied.</p><p>Tags: protection, reaction, mikkyo</p>",
          "clan": "general",
          "rank": "genin"
        },
        "effects": [],
        "folder": null,
        "sort": 2500000,
        "flags": {
          "shadow-scar": {
            "starterContent": true,
            "version": "0.7.4"
          }
        }
      },
      {
        "_id": "AdeptVeil0001",
        "name": "Veil of Stillness",
        "type": "mikkyo",
        "img": "icons/svg/explosion.svg",
        "system": {
          "description": "<p>A quieting veil that makes motion and presence harder to notice.</p><p>Timing: action</p><p>Range: Self / Near</p><p>Duration: Scene</p><p>Effect: Dampens sound and attention; apply concealment or stealth rulings manually.</p><p>Tags: stealth, silence, mikkyo</p>",
          "clan": "general",
          "rank": "genin"
        },
        "effects": [],
        "folder": null,
        "sort": 2600000,
        "flags": {
          "shadow-scar": {
            "starterContent": true,
            "version": "0.7.4"
          }
        }
      },
      {
        "_id": "AdeptFocus0001",
        "name": "Focused",
        "type": "condition",
        "img": "icons/svg/aura.svg",
        "system": {
          "description": "<p>The character has centered breath, intent, and Ki flow.</p>",
          "active": false,
          "intensity": 1,
          "category": "spiritual",
          "modifier": 1,
          "penalty": "+1 to the next suitable focused action."
        },
        "effects": [],
        "folder": null,
        "sort": 1900000,
        "flags": {
          "shadow-scar": {
            "starterContent": true,
            "version": "0.7.4"
          }
        }
      }
    ],
    "effects": [],
    "folder": null,
    "sort": 500000,
    "ownership": {
      "default": 0
    },
    "prototypeToken": {
      "name": "Mikkyo Adept",
      "displayName": 20,
      "actorLink": false,
      "disposition": -1,
      "displayBars": 20,
      "bar1": {
        "attribute": "resources.vitality"
      },
      "bar2": {
        "attribute": "resources.ki"
      },
      "texture": {
        "src": "icons/svg/mystery-man.svg"
      }
    },
    "flags": {
      "shadow-scar": {
        "starterContent": true,
        "version": "0.7.15"
      }
    }
  },
  {
    "_id": "ScNpcBoss00006",
    "name": "Red Mask Lieutenant",
    "type": "npc",
    "img": "icons/svg/mystery-man.svg",
    "system": {
      "attributes": {
        "mind": 3,
        "body": 4,
        "spirit": 3
      },
      "skills": {
        "mind": {
          "awareness": 2,
          "disguise": 0,
          "engineering": 0,
          "knowledge": 0,
          "marksmanship": 2,
          "medicine": 0
        },
        "body": {
          "athletics": 0,
          "endurance": 2,
          "maneuver": 2,
          "melee": 3,
          "stealth": 0,
          "strength": 0
        },
        "spirit": {
          "artistry": 0,
          "insight": 0,
          "focus": 2,
          "manipulation": 2,
          "performance": 0,
          "resistance": 0
        }
      },
      "resources": {
        "vitality": {
          "value": 16,
          "max": 16
        },
        "ki": {
          "value": 4,
          "max": 4
        }
      },
      "details": {
        "concept": "Starter boss adversary",
        "background": "",
        "contacts": "",
        "notes": "A compact boss for testing mixed melee/ranged attacks and multiple defensive layers."
      },
      "npc": {
        "role": "Commander",
        "adversaryType": "Boss Duelist",
        "threatLevel": "boss",
        "tactics": "Open with intimidation, punish exposed targets, and switch between pistol and blade."
      }
    },
    "items": [
      {
        "_id": "BossKatana0001",
        "name": "Katana",
        "type": "weapon",
        "img": "icons/svg/sword.svg",
        "system": {
          "description": "<p>A curved sword for disciplined melee attacks.</p>",
          "skill": "body.melee",
          "damage": "4",
          "range": "Close",
          "category": "melee",
          "equipped": true,
          "tags": "blade, two-handed, precise",
          "rpCost": 5
        },
        "effects": [],
        "folder": null,
        "sort": 200000,
        "flags": {
          "shadow-scar": {
            "starterContent": true,
            "version": "0.7.15"
          }
        }
      },
      {
        "_id": "BossPistol0001",
        "name": "Heavy Pistol",
        "type": "weapon",
        "img": "icons/svg/sword.svg",
        "system": {
          "description": "<p>A reliable large-caliber pistol for street-level firefights.</p>",
          "skill": "mind.marksmanship",
          "damage": "4",
          "range": "Short",
          "category": "ranged",
          "equipped": true,
          "tags": "firearm, loud, sidearm",
          "rpCost": 4
        },
        "effects": [],
        "folder": null,
        "sort": 400000,
        "flags": {
          "shadow-scar": {
            "starterContent": true,
            "version": "0.7.15"
          }
        }
      },
      {
        "_id": "BossCoat00001",
        "name": "Shinobi Weave Coat",
        "type": "gear",
        "img": "icons/svg/shield.svg",
        "system": {
          "description": "<p>A reinforced coat designed for mobility and silent operations.</p>",
          "quantity": 1,
          "category": "armor",
          "equipped": true,
          "effect": "Light protective coat with subtle defensive weave.",
          "armorValue": 1,
          "resistanceValue": 1,
          "defenseBonus": 1,
          "damageReduction": 0,
          "notes": "Defense Bonus is shown as a reminder and is not automatically subtracted.",
          "tags": "armor, stealth, stylish",
          "rpCost": 4
        },
        "effects": [],
        "folder": null,
        "sort": 1100000,
        "flags": {
          "shadow-scar": {
            "starterContent": true,
            "version": "0.7.15"
          }
        }
      },
      {
        "_id": "BossPrecise001",
        "name": "Precise Strike",
        "type": "technique",
        "img": "icons/svg/upgrade.svg",
        "system": {
          "description": "<p>A focused attack aimed at joints, weak armor, or exposed guard.</p><p>Trigger: A melee attack against a vulnerable opening.</p><p>Effect: Spend Ki if desired; on a strong hit, increase pressure or damage by table ruling.</p><p>Tags: combat, melee, ki</p>",
          "rank": "chunin",
          "clan": "general"
        },
        "effects": [],
        "folder": null,
        "sort": 2300000,
        "flags": {
          "shadow-scar": {
            "starterContent": true,
            "version": "0.7.4"
          }
        }
      },
      {
        "_id": "BossQuick0001",
        "name": "Quick Draw",
        "type": "technique",
        "img": "icons/svg/upgrade.svg",
        "system": {
          "description": "<p>A practiced draw that turns hesitation into action.</p><p>Trigger: Drawing or readying a weapon under pressure.</p><p>Effect: Ready a suitable weapon quickly; roll normally if the table calls for it.</p><p>Tags: combat, weapon, reaction</p>",
          "rank": "genin",
          "clan": "general"
        },
        "effects": [],
        "folder": null,
        "sort": 2200000,
        "flags": {
          "shadow-scar": {
            "starterContent": true,
            "version": "0.7.4"
          }
        }
      },
      {
        "_id": "BossFocus0001",
        "name": "Focused",
        "type": "condition",
        "img": "icons/svg/aura.svg",
        "system": {
          "description": "<p>The character has centered breath, intent, and Ki flow.</p>",
          "active": false,
          "intensity": 1,
          "category": "spiritual",
          "modifier": 1,
          "penalty": "+1 to the next suitable focused action."
        },
        "effects": [],
        "folder": null,
        "sort": 1900000,
        "flags": {
          "shadow-scar": {
            "starterContent": true,
            "version": "0.7.4"
          }
        }
      }
    ],
    "effects": [],
    "folder": null,
    "sort": 600000,
    "ownership": {
      "default": 0
    },
    "prototypeToken": {
      "name": "Red Mask Lieutenant",
      "displayName": 20,
      "actorLink": false,
      "disposition": -1,
      "displayBars": 20,
      "bar1": {
        "attribute": "resources.vitality"
      },
      "bar2": {
        "attribute": "resources.ki"
      },
      "texture": {
        "src": "icons/svg/mystery-man.svg"
      }
    },
    "flags": {
      "shadow-scar": {
        "starterContent": true,
        "version": "0.7.15"
      }
    }
  }
];

function cloneData(value) {
  if (globalThis.foundry?.utils?.deepClone) return foundry.utils.deepClone(value);
  return JSON.parse(JSON.stringify(value));
}

function stripTopLevelIds(documents) {
  return documents.map((document) => {
    const clone = cloneData(document);
    delete clone._id;
    return clone;
  });
}

function collectionDocuments(collection) {
  if (!collection) return [];
  if (Array.isArray(collection)) return collection;
  if (Array.isArray(collection.contents)) return collection.contents;
  return Array.from(collection.values?.() ?? collection);
}

function filterExistingByName(documents, collection, { skipExisting = true } = {}) {
  if (!skipExisting) return documents;

  const existingNames = new Set(collectionDocuments(collection).map((document) => document.name));
  return documents.filter((document) => !existingNames.has(document.name));
}

export async function importStarterItems({ skipExisting = true } = {}) {
  if (!game.user?.isGM) {
    ui.notifications?.warn("Only a GM can import Shadow Scar starter items.");
    return [];
  }

  const documents = stripTopLevelIds(filterExistingByName(STARTER_ITEMS, game.items ?? [], { skipExisting }));
  if (documents.length === 0) {
    ui.notifications?.info("Shadow Scar starter items already exist in this world.");
    return [];
  }

  const created = await Item.createDocuments(documents);
  ui.notifications?.info(`Imported ${created.length} Shadow Scar starter items.`);
  return created;
}

export async function importStarterAdversaries({ skipExisting = true } = {}) {
  if (!game.user?.isGM) {
    ui.notifications?.warn("Only a GM can import Shadow Scar starter adversaries.");
    return [];
  }

  const documents = stripTopLevelIds(filterExistingByName(STARTER_ADVERSARIES, game.actors ?? [], { skipExisting }));
  if (documents.length === 0) {
    ui.notifications?.info("Shadow Scar starter adversaries already exist in this world.");
    return [];
  }

  const created = await Actor.createDocuments(documents);
  ui.notifications?.info(`Imported ${created.length} Shadow Scar starter adversaries.`);
  return created;
}

export async function importStarterContent({ skipExisting = true } = {}) {
  const items = await importStarterItems({ skipExisting });
  const adversaries = await importStarterAdversaries({ skipExisting });
  return { items, adversaries };
}
