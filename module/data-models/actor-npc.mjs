/**
 * Datenmodell für Actor vom Typ "npc".
 *
 * Für v0.2 nutzen NSC dieselben Grundfelder wie Charaktere. Später können wir
 * daraus ein eigenes, schlankeres NSC-/Yokai-Modell machen.
 */
import { ShadowScarCharacterData } from "./actor-character.mjs";

export class ShadowScarNPCData extends ShadowScarCharacterData {}
