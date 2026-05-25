# Shadow Scar Foundry VTT System Prototype

Version: 0.6.4  
Foundry compatibility target: v14

This is an unofficial prototype system for Shadow Scar.

## Current feature state

- System loads as `shadow-scar`.
- Actor types: `character`, `npc`.
- Item types: `gear`, `weapon`, `technique`, `mikkyo`, `condition`.
- Character sheet has five tabs:
  1. General
  2. Techniques & Mikkyo
  3. Equipment & Weapons
  4. Background
  5. Conditions
- Attributes: `mind`, `body`, `spirit`.
- Resources: `vitality`, `ki`.
- Header quick controls for Vitality and Ki:
  - Vitality: -1, +1, Max, Damage dialog, Heal dialog.
  - Ki: -1, +1, Max.
- Skills are grouped under their corresponding attribute.
- Attribute and skill names are clickable and trigger d6-pool rolls.
- Roll dialogs include Difficulty.
- Roll chat cards display Successes, Difficulty, Result, and Margin.
- Conditions can be toggled active/inactive from the Conditions tab.
- Condition items include a numeric `system.modifier` and a free-text `system.penalty` note.
- Active Condition modifiers are summed and prefilled into Attribute, Skill, and Weapon roll dialogs.
- Gear items can be used from the character sheet to create a chat card.
- Gear and weapon equipped checkboxes can be toggled directly from the character sheet.
- Weapon items can be rolled from the Equipment & Weapons tab using `system.skill`.
- Weapon chat cards display configured damage and provide a guided Apply Damage workflow.

## Roll mechanic currently implemented

The prototype uses this Shadow Scar style d6 success pool:

- Dice pool = relevant value(s) + modifier
- Results 1-3 = 0 successes
- Results 4-5 = 1 success
- Result 6 = 2 successes
- Margin = Successes - Difficulty
- Success = Margin >= 0

Attribute roll:

```text
pool = attribute + modifier
```

Skill roll:

```text
pool = attribute + skill + modifier
```

Weapon roll:

```text
pool = weapon attribute + weapon skill + modifier
```

The weapon attribute and skill are derived from the weapon item's `system.skill` value, for example:

```text
system.skill = body.melee
system.skill = mind.marksmanship
```

## Damage application in v0.6.4

Weapon chat cards now include an **Apply Damage** button.

Workflow:

1. Roll a weapon from the Equipment & Weapons tab.
2. Target or select one or more defender tokens.
3. Click **Apply Damage** on the weapon chat card.
4. The dialog shows configured damage, numeric base damage, attack margin, and target names.
5. Enter the final damage after Defense/Resistance.
6. The system reduces the target actor's Vitality and posts a small confirmation chat card.

This is intentionally not a fully automated combat engine. Defense, Resistance, special rules, armor, and table rulings are applied manually before the final damage value is confirmed.

## Actor data paths

```text
system.attributes.mind
system.attributes.body
system.attributes.spirit

system.resources.vitality.value
system.resources.vitality.max
system.resources.ki.value
system.resources.ki.max

system.skills.mind.awareness
system.skills.body.melee
system.skills.spirit.focus
```

## Item data paths

### Gear

```text
system.description
system.quantity
system.category
system.equipped
system.effect
system.tags
```

### Weapon

```text
system.description
system.skill
system.damage
system.range
system.category
system.equipped
system.tags
```

### Technique

```text
system.description
system.attribute
system.skill
system.kiCost
system.timing
system.trigger
system.effect
system.tags
```

### Mikkyo

```text
system.description
system.kiCost
system.timing
system.range
system.duration
system.effect
system.tags
```

### Condition

```text
system.description
system.active
system.intensity
system.category
system.modifier
system.penalty
```

## GitHub release fields

`system.json` contains release metadata for Foundry's package updater:

```json
"url": "https://github.com/Lucitus80/InOff-ShaSca",
"manifest": "https://github.com/Lucitus80/InOff-ShaSca/releases/latest/download/system.json",
"download": "https://github.com/Lucitus80/InOff-ShaSca/archive/refs/tags/v0.6.4.zip"
```

## Developer notes

The most important design choice in this prototype is separation of concerns:

- Data shape lives in `module/data-models/`.
- Actor and Item document classes live in `module/documents/`.
- Sheet behavior lives in `module/sheets/`.
- Roll and action logic lives in `module/dice/rolls.mjs`.
- UI markup lives in `templates/`.
- Visual styling lives in `styles/shadow-scar.css`.
- Shared labels and dropdown choices live in `module/config.mjs`.

This keeps later rule changes easier: damage automation, defense rules, status effects, and richer combat actions can be expanded without turning the sheet template into the rules engine.

## v0.6.4 - Defense & Damage Application Pass

Added a guided damage application workflow to weapon chat cards. Weapon attacks now show configured damage, successes, difficulty, result, and margin. The new Apply Damage button uses the user's targeted tokens first, or selected tokens if no targets are set. Before Vitality is reduced, the user can manually edit final damage after Defense/Resistance. This preserves manual control while removing repetitive Vitality bookkeeping.
