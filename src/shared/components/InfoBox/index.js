/* eslint-env browser */
import style from './styles.sass'

import React, { Component } from  'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfo } from '@fortawesome/free-solid-svg-icons'

export default class Search extends Component {
  render () {
    return <div class={style.wrapper}>
      <div class={style.infoWrapper}>
        <button class={style.infoButton} onClick={this.toggleInfoText}>
          <FontAwesomeIcon icon={faInfo} />
        </button>
        <div class={style.infoBox}>
          <p>
            Der Stickstoffdioxid-Monitor von rbb|24 zeigt schnell und übersichtlich die aktuelle Stickstoffdioxid-Belastung in Berlin und Brandenburg. Dafür werden die Daten der offiziellen Messstellen alle 10 Minuten von den landeseigenen Webseiten in <a href='https://luftdaten.berlin.de/lqi' target='_blank'>Berlin</a> und <a href='https://luftdaten.brandenburg.de/home/-/bereich/aktuell' target='_blank'>Brandenburg</a> abgefragt. Dort finden Sie auch die genauen Standorte der Messstationen.
          </p>
          <p>
            Niedrige Belastung wird grün dargestellt, höhere Belastung in orange, rot und schwarz. Die Reihenfolge, in der die Stationen geordnet werden, und Farbe der Stationen spiegelt den aktuellsten übermittelten Wert wieder.
          </p>
          <p>
            Wenn kurzfristig kein Messwert übermittelt wird, wird der fehlende Wert interpoliert. Für die Außenluft gibt es zwei relevante, gesetzliche Stickstoffdioxid-Grenzwerte: Im Jahresmittel darf die NO&#8322;-Belastung höchsten 40 µg/m³ betragen. Daneben gibt es den Einstundengrenzwert von 200 µg/m³, der höchstens 18-mal pro Jahr überschritten werden darf. Während der erste Grenzwert an vielen Messstellen in Berlin nicht eingehalten werden kann, wird der Einstundengrenzwert in der Regel überall in Deutschland eingehalten.
          </p>
          <p>
            <b>Quellen:</b>
            <div>
              Berlin: Messungen durch die <a href='https://luftdaten.berlin.de/lqi' target='_blank'>Senatsverwaltung Umwelt, Verkehr und Klimaschutz</a>
            </div>
            <div>
              Brandenburg: Messungen durch das <a href='https://luftdaten.brandenburg.de/home/-/bereich/aktuell' target='_blank'>Landesamt für Umwelt</a>
            </div>
          </p>
          <p>
            <b>Credits:</b>
            <div>Design: Manuel Reich</div>
            <div>Programmierung: Jenny Gebske, Arne Schlüter</div>
            <div>Projektmanagement: Götz Gringmuth-Dallmer</div>
            <div>Konzept: Dominik Wurnig</div>
          </p>

        </div>
      </div>
    </div>
  }
}
