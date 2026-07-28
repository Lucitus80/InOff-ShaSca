/**
 * Shadow Scar System - Haupteinstiegspunkt
 *
 * Diese Datei wird von Foundry geladen, weil sie in system.json unter
 * "esmodules" eingetragen ist.
 *
 * In Foundry-Code arbeiten wir viel mit Hooks. Hooks sind Ereignisse, an die
 * wir eigene Funktionen anhängen können.
 */

import { SHADOW_SCAR } from "./module/config.mjs";
import { ShadowScarActor } from "./module/documents/actor.mjs";
import { ShadowScarItem } from "./module/documents/item.mjs";
import { ShadowScarCharacterData } from "./module/data-models/actor-character.mjs";
import { ShadowScarNPCData } from "./module/data-models/actor-npc.mjs";
import { ShadowScarActorSheet } from "./module/sheets/actor-sheet.mjs";
import { ShadowScarItemSheet } from "./module/sheets/item-sheet.mjs";
import { ShadowScarGearData } from "./module/data-models/item-gear.mjs";
import { ShadowScarTechniqueData } from "./module/data-models/item-technique.mjs";
import { ShadowScarConditionData } from "./module/data-models/item-condition.mjs";
import { ShadowScarWeaponData } from "./module/data-models/item-weapon.mjs";
import { ShadowScarMikkyoData } from "./module/data-models/item-mikkyo.mjs";
import { ShadowScarRolls } from "./module/dice/rolls.mjs";
import {
  STARTER_ADVERSARIES,
  STARTER_ITEMS,
  importStarterAdversaries,
  importStarterContent,
  importStarterItems
} from "./module/starter-content.mjs";

/**
 * Der init-Hook läuft sehr früh.
 * Hier registrieren wir Dokumentklassen, Datenmodelle und Sheets.
 */
Hooks.once("init", () => {
  console.log(`${SHADOW_SCAR.id} | Initialisiere ${SHADOW_SCAR.title}`);

  // Eigene Dokumentklassen registrieren.
  CONFIG.Actor.documentClass = ShadowScarActor;
  CONFIG.Item.documentClass = ShadowScarItem;

  // Datenmodelle für Actor-Typen registrieren.
  CONFIG.Actor.dataModels.character = ShadowScarCharacterData;
  CONFIG.Actor.dataModels.npc = ShadowScarNPCData;

  // Datenmodelle für Item-Typen registrieren.
  CONFIG.Item.dataModels.gear = ShadowScarGearData;
  CONFIG.Item.dataModels.weapon = ShadowScarWeaponData;
  CONFIG.Item.dataModels.technique = ShadowScarTechniqueData;
  CONFIG.Item.dataModels.mikkyo = ShadowScarMikkyoData;
  CONFIG.Item.dataModels.condition = ShadowScarConditionData;

  // Kleine Handlebars-Helfer für einfache Template-Logik.
  // Nutzung im Template: {{#if (eq item.type "gear")}} ... {{/if}}
  Handlebars.registerHelper("eq", (left, right) => left === right);
  Handlebars.registerHelper("or", (...args) => args.slice(0, -1).some(Boolean));
  Handlebars.registerHelper("clanLabel", (system) => {
    const clan = system?.clan || system?.techniqueType || "general";
    return SHADOW_SCAR.clans?.[clan] ?? clan;
  });
  Handlebars.registerHelper("rankLabel", (system) => {
    const rank = system?.rank || "genin";
    return SHADOW_SCAR.ranks?.[rank] ?? rank;
  });
  Handlebars.registerHelper("mikkyoKiCost", (system) => {
    const rank = system?.rank || "genin";
    return SHADOW_SCAR.mikkyoKiCosts?.[rank] ?? 1;
  });

  // v0.7.0: Attribute and skills are displayed as clickable diamond symbols.
  // The stored actor data remains numeric so the existing roll logic continues
  // to work unchanged.
  Handlebars.registerHelper("ratingDots", (value, max) => {
    const currentValue = Math.max(0, Number(value ?? 0));
    const maximum = Math.max(0, Number(max ?? 0));

    return Array.from({ length: maximum }, (_entry, index) => {
      const dotValue = index + 1;
      const filled = dotValue <= currentValue;

      return {
        value: dotValue,
        filled,
        img: `systems/${SHADOW_SCAR.id}/assets/symbols/${filled ? "full" : "empty"}.png`
      };
    });
  });

  // Standardsheet abmelden und unser Shadow-Scar-Sheet als Default setzen.
  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet(SHADOW_SCAR.id, ShadowScarActorSheet, {
    types: [SHADOW_SCAR.actorTypes.character, SHADOW_SCAR.actorTypes.npc],
    makeDefault: true
  });

  // Standardsheet für Items abmelden und unser Item-Sheet als Default setzen.
  Items.unregisterSheet("core", ItemSheet);
  Items.registerSheet(SHADOW_SCAR.id, ShadowScarItemSheet, {
    types: [
      SHADOW_SCAR.itemTypes.gear,
      SHADOW_SCAR.itemTypes.weapon,
      SHADOW_SCAR.itemTypes.technique,
      SHADOW_SCAR.itemTypes.mikkyo,
      SHADOW_SCAR.itemTypes.condition
    ],
    makeDefault: true
  });

  // Wir speichern unsere Konfiguration auf game.shadowScar.
  // Das ist praktisch zum Debuggen in der Browser-Konsole.
  game.shadowScar = {
    config: SHADOW_SCAR,
    documents: {
      ShadowScarActor,
      ShadowScarItem
    },
    sheets: {
      ShadowScarActorSheet,
      ShadowScarItemSheet
    },
    rolls: ShadowScarRolls,
    starterContent: {
      items: STARTER_ITEMS,
      adversaries: STARTER_ADVERSARIES,
      importItems: importStarterItems,
      importAdversaries: importStarterAdversaries,
      importAll: importStarterContent
    }
  };
});

/**
 * Der ready-Hook läuft, sobald die Welt vollständig geladen ist.
 */
Hooks.once("ready", () => {
  console.log(`${SHADOW_SCAR.id} | System bereit`);

  ui.notifications.info("Shadow Scar is ready.");
  updateShadowScarPauseIcon();
});

Hooks.on("renderPause", () => {
  updateShadowScarPauseIcon();
});

/** Replaces Foundry's default pause overlay symbol with the system icon. */
function updateShadowScarPauseIcon() {
  const pauseIconPath = SHADOW_SCAR.icons?.pause ?? `systems/${SHADOW_SCAR.id}/assets/symbols/pause.webp`;
  const pauseImage = document.querySelector("#pause img");
  if (pauseImage) pauseImage.src = pauseIconPath;
}

/**
 * v0.7.0: rating symbols are available on character and NPC sheets, and
 * weapon chat cards can still apply armor-aware damage to targeted/selected tokens.
 */
Hooks.on("renderChatMessage", (message, html) => {
  ShadowScarRolls.activateChatListeners(html, message);
});
