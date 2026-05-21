# Shadow Scar Foundry VTT System Prototype

Version: 0.6.2  
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
- Skills are grouped under their corresponding attribute.
- Attribute and skill names are clickable and trigger d6-pool rolls.
- Conditions can be toggled active/inactive from the Conditions tab. Active conditions are shown in roll dialogs and roll chat cards. Their structured Roll Modifier is prefilled into roll dialogs automatically.
- Vitality and Ki have quick controls in the character header. Vitality also has Damage and Heal dialogs.
- Weapon items can be rolled from the Equipment & Weapons tab. Weapon chat cards now call out damage more clearly for manual application.
- Gear items can be used from the Equipment & Weapons tab to create chat output.
- Gear and Weapon items can be toggled equipped directly from the character sheet.
- Technique and Mikkyo items can be clicked from the character sheet to create chat output.
- v0.58 separates Techniques from Ki costs. Only Mikkyo has Ki Cost.
- Techniques and Mikkyo now both store Rank and Origin.

## Roll mechanic currently implemented

The prototype uses this Shadow Scar style d6 success pool:

- Dice pool = relevant value(s) + modifier
- Results 1-3 = 0 successes
- Results 4-5 = 1 success
- Result 6 = 2 successes

Attribute roll:

```text
pool = attribute + modifier
```

Skill roll:

```text
pool = attribute + skill + modifier
```

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
system.effect
system.tags
```

### Technique

```text
system.description
system.rank
system.origin
system.attribute
system.skill
system.timing
system.trigger
system.effect
system.tags
```

### Mikkyo

```text
system.description
system.rank
system.origin
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

## Developer notes

The most important design choice in this prototype is separation of concerns:

- Data shape lives in `module/data-models/`.
- Actor and Item document classes live in `module/documents/`.
- Sheet behavior lives in `module/sheets/`.
- Roll/action logic lives in `module/dice/rolls.mjs`.
- UI markup lives in `templates/`.
- Visual styling lives in `styles/shadow-scar.css`.
- Shared labels and dropdown choices live in `module/config.mjs`.

## v0.58 - Technique/Mikkyo Rank and Origin

Techniques no longer use Ki Cost. The Technique data model and sheet now store `system.rank` and `system.origin`, but no longer define `system.kiCost`.

Mikkyo keeps `system.kiCost`, because Mikkyo still belongs to the Ki economy. Mikkyo also now stores `system.rank` and `system.origin`.

The character sheet displays Rank and Origin for Techniques and Mikkyo. The use dialog now only shows Ki spending controls for Mikkyo. Technique use creates chat output without Ki spending. Chat cards include Rank and Origin when present.


## v0.60 - Items Pass

Version 0.60 focuses on making the Item tab more useful in play.

### Weapons

Weapon items can now be rolled from the character sheet with an **Attack** button. The attack roll uses the weapon's configured `system.skill` value, such as `body.melee` or `mind.marksmanship`, and follows the existing Shadow Scar d6-pool mechanic:

```text
pool = linked attribute + linked skill + modifier
```

The weapon attack dialog shows the weapon's damage, range and active condition reminders. The resulting chat card shows dice, successes, outcome, damage, range and tags.

### Gear

Gear items now have a `system.effect` summary field and a **Use** button on the character sheet. Using gear creates a chat card with category, quantity, equipped state, effect summary and tags. Gear does not roll by default.

### Equipped toggles

Gear and Weapon rows on the character sheet now include an equipped checkbox. This updates `system.equipped` directly on the embedded item.

### Conditions

Active Condition items are now summarized in attribute, skill and weapon roll dialogs, and repeated on roll chat cards. Their `system.penalty` field is still free text, so the system does not automatically modify dice pools yet. Players can read the reminder and enter the correct bonus/penalty manually in the roll dialog.

## v0.61 - Conditions Pass

Version 0.61 makes Conditions mechanically useful while keeping them simple.

Condition items now have a structured numeric field:

```text
system.modifier
```

This field represents a dice-pool modifier. Negative values are penalties, positive values are bonuses. Active Condition modifiers are summed and prefilled into Attribute, Skill and Weapon roll dialogs. The player can still adjust the total modifier before rolling.

The older `system.penalty` field remains as a free-text mechanical note or rules reminder. Roll dialogs and chat cards now show both the numeric modifier and the text note.


## v0.62 - Damage & Resource Pass

Version 0.62 adds simple table-facing resource controls without introducing a full damage automation system yet.

### Vitality controls

The character header now includes quick controls for Vitality:

- `-` reduces current Vitality by 1.
- `+` increases current Vitality by 1.
- `Max` sets current Vitality to maximum.
- `Damage` opens a small amount dialog and subtracts that amount.
- `Heal` opens a small amount dialog and adds that amount.

All updates are clamped between 0 and the resource maximum.

### Ki controls

Ki Reserve now has quick header controls:

- `-` spends or reduces Ki by 1.
- `+` restores Ki by 1.
- `Max` sets Ki to maximum.

Mikkyo use still keeps its optional Ki spending flow from v0.58.

### Weapon damage presentation

Weapon attack chat cards now highlight the configured weapon damage and include a short reminder that damage is applied manually after any defense or resistance rules used at the table.


## v0.6.3 - Roll Difficulty & Result Pass

Version 0.6.3 formalizes the new versioning style and adds clearer roll resolution.

### Versioning and GitHub manifest

The system version is now written as `0.6.3` instead of `0.63`. The manifest also includes the GitHub release fields used by Foundry:

```json
"url": "https://github.com/Lucitus80/InOff-ShaSca",
"manifest": "https://github.com/Lucitus80/InOff-ShaSca/releases/latest/download/system.json",
"download": "https://github.com/Lucitus80/InOff-ShaSca/archive/refs/tags/v0.6.3.zip"
```

### Difficulty, result and margin

Attribute, Skill and Weapon roll dialogs now include a Difficulty field. After rolling, the chat card compares total successes against the selected difficulty:

```text
Successes >= Difficulty = Success
Successes < Difficulty = Failure
Margin = Successes - Difficulty
```

Chat cards now show Successes, Difficulty, Result and Margin so the table can immediately see whether a test succeeded and by how much.
