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

  // Kleiner Handlebars-Helfer für einfache Vergleiche im Template.
  // Nutzung im Template: {{#if (eq item.type "gear")}} ... {{/if}}
  Handlebars.registerHelper("eq", (left, right) => left === right);

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
    rolls: ShadowScarRolls
  };
});

/**
 * Der ready-Hook läuft, sobald die Welt vollständig geladen ist.
 */
Hooks.once("ready", () => {
  console.log(`${SHADOW_SCAR.id} | System bereit`);

  ui.notifications.info("Shadow Scar is ready.");
});

/**
 * v0.6.4: weapon chat cards can apply damage to targeted/selected tokens.
 */
Hooks.on("renderChatMessage", (message, html) => {
  ShadowScarRolls.activateChatListeners(html, message);
});
