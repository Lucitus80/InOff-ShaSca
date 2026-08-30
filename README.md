# Shadow Scar Foundry VTT System Prototype

## v0.7.15 - Mikkyo Ki Cost Stability & Compact Create Buttons

- Fixed the Mikkyo Rank/Ki Cost update flow so changing Rank no longer jumps the Ki Cost display back to 1 Ki.
- The Mikkyo sheet now updates the readonly Ki Cost field before Foundry submits the form change.
- Mikkyo form submission also enforces `system.kiCost` from the selected Rank as a safety fallback.
- Actor-sheet Technique/Mikkyo creation buttons are now compact square **+** buttons with tooltip labels instead of large text buttons.

Version: v0.7.15  
Foundry compatibility target: v14

## v0.7.15 - Technique/Mikkyo Creation & Ki Cost Display Fix

- Fixed the Mikkyo item sheet Ki Cost display so it updates immediately when the Rank dropdown changes.
- Mikkyo now also carries a derived `system.kiCost` value for display/compatibility, still controlled by Rank and not manually editable.
- Character sheets now have **+ Technique** and **+ Mikkyo** buttons on the Techniques & Mikkyo tab.
- NPC sheets now have **+ Technique** and **+ Mikkyo** buttons in the Equipment tab.
- New Technique/Mikkyo items open their item sheet immediately after creation.

Version: v0.7.15  
Foundry compatibility target: v14

## v0.7.15 - Techniques & Mikkyo Clan/Rank Pass

- The old Technique **Type** field is renamed to **Clan**.
- Technique sheets now show: Clan dropdown, Rank dropdown, and editable rules text.
- Mikkyo sheets now also show: Clan dropdown, Rank dropdown, a readonly Ki Cost box that updates when Rank changes, and editable rules text.
- Clan choices: General, Arashi, Futsumashi, Hibana, Kuromaku, Tantei, Wanami.
- Rank choices: Genin, Chunin, Jounin.
- Mikkyo Ki cost is fixed by Rank:
  - Genin: 1 Ki
  - Chunin: 3 Ki
  - Jounin: 5 Ki
- Mikkyo Ki Cost is displayed as a small non-editable box and is recalculated from the selected Rank.
- Mikkyo use again opens the Ki spending dialog and can subtract Ki from the actor.
- Technique/Mikkyo chat cards show Clan and Rank; Mikkyo cards also show fixed Ki Cost and Ki Reserve changes.
- Starter Technique/Mikkyo content and compendium entries were migrated to `system.clan` and `system.rank`.
- Old v0.7.15 `system.techniqueType` is still read as a compatibility fallback for existing Technique items.

Version: v0.7.15  
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
- NPC / Adversary sheet has four compact tabs:
  1. Combat
  2. Equipment
  3. Conditions
  4. Notes
- NPCs include Role, Type, Threat Level, and Tactics fields.
- Attributes: `mind`, `body`, `spirit`, displayed as 5 clickable diamond symbols.
- Resources: `vitality`, `ki`.
- Header quick controls for Vitality and Ki:
  - Vitality: -1, +1, Max, Damage dialog, Heal dialog.
  - Ki: -1, +1, Max.
- Skills are grouped under their corresponding attribute and displayed as 3 clickable diamond symbols.
- Attribute and skill names are clickable and trigger d6-pool rolls; the diamond symbols set the stored rating value.
- Roll dialogs include Difficulty.
- Roll chat cards display Successes, Difficulty, Result, and Margin.
- Conditions can be toggled active/inactive from the Conditions tab.
- Condition items include a numeric `system.modifier` and a free-text `system.penalty` note.
- Active Condition modifiers are summed and prefilled into Attribute, Skill, and Weapon roll dialogs.
- Gear items can be used from the character sheet to create a chat card.
- Gear items include optional protection fields: Armor, Resistance, Defense Bonus, Damage Reduction, and Protection Notes.
- Gear and weapon equipped checkboxes can be toggled directly from the character sheet.
- Weapon items can be rolled from the Equipment & Weapons tab using `system.skill`.
- Weapon chat cards display configured damage and provide an armor-aware Apply Damage workflow.
- Starter compendium packs provide example weapons, gear/armor, conditions, techniques, mikkyo, and NPC/adversaries.
- Character and NPC actor sheets include compact **+** buttons for creating Techniques and Mikkyo.
- `assets/symbols/empty.png` and `assets/symbols/full.png` are used for empty and filled rating diamonds.

## Roll mechanic currently implemented

The prototype uses this Shadow Scar style d6 success pool:

- Dice pool = relevant rating value(s) + modifier
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

## Damage application since v0.6.5

Weapon chat cards include an **Apply Damage** button.

Workflow:

1. Roll a weapon from the Equipment & Weapons tab.
2. Target or select one or more defender tokens.
3. Click **Apply Damage** on the weapon chat card.
4. The dialog shows configured damage, numeric base damage, attack margin, and one armor/resistance block per target.
5. Equipped Gear on each target is scanned for Armor, Resistance, Damage Reduction, Defense Bonus, and Protection Notes.
6. Armor, Resistance and Damage Reduction produce a suggested final damage value per target.
7. Defense Bonus is displayed as a reminder, but not automatically added to reduction.
8. Edit final damage per target after Defense/Resistance and table rulings.
9. The system reduces each target actor's Vitality and posts a confirmation chat card.

This is intentionally not a fully automated combat engine. Defense, Resistance, special rules, armor, and table rulings remain visible and editable before the final damage value is confirmed.

## Actor data paths

```text
system.attributes.mind
system.attributes.body
system.attributes.spirit

Attribute ratings are displayed with five symbols; skill ratings are displayed with three symbols. The underlying values remain numeric for rolls and macros.

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
system.armorValue
system.resistanceValue
system.defenseBonus
system.damageReduction
system.notes
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
system.clan
system.rank
```

Legacy fallback for older v0.7.15 items:

```text
system.techniqueType
```

### Mikkyo

```text
system.description
system.clan
system.rank
system.kiCost  # derived from rank; not manually edited
```

Mikkyo Ki Cost is derived, not edited directly:

```text
genin  -> 1 Ki
chunin -> 3 Ki
jounin -> 5 Ki
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

## Starter content helpers

From the browser console:

```js
game.shadowScar.starterContent.importAll()
game.shadowScar.starterContent.importItems()
game.shadowScar.starterContent.importAdversaries()
```

The helpers skip existing world documents by name unless called with `skipExisting: false`.
