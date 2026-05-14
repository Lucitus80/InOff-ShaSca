/**
 * Eigene Actor-Klasse für Shadow Scar.
 *
 * Actor ist Foundrys Dokumenttyp für Figuren: Spielercharaktere, NSC, Gegner,
 * Kreaturen usw. Wir erweitern die Foundry-Basisklasse, damit wir eigene
 * Hilfsmethoden ergänzen können.
 */
export class ShadowScarActor extends Actor {
  /**
   * prepareDerivedData() wird von Foundry aufgerufen, wenn Daten vorbereitet
   * werden. Hier berechnet man später abgeleitete Werte wie Verteidigung,
   * Bewegung, Schadensboni usw.
   */
  prepareDerivedData() {
    super.prepareDerivedData();
  }

  /**
   * Komfortmethode: Attributwert sicher auslesen.
   *
   * Beispiel:
   * actor.getAttribute("mind")
   */
  getAttribute(attributeKey) {
    return Number(foundry.utils.getProperty(this.system, `attributes.${attributeKey}`) ?? 0);
  }

  /**
   * Komfortmethode: Skillwert sicher auslesen.
   *
   * Beispiel:
   * actor.getSkill("body", "melee")
   * liest system.skills.body.melee.
   */
  getSkill(attributeKey, skillKey) {
    return Number(foundry.utils.getProperty(this.system, `skills.${attributeKey}.${skillKey}`) ?? 0);
  }
}
