import React from 'react'
import { FunctionComponent } from 'react'

export interface TitleProps {
  children: {
    header: string
    subheader: string
  }
}
/**
 * Der Titlel für jede Grafik oder Interactive
 * Ein Header besteht aus: `header` und `subheader`
 *
 * **`header`: Ein Aussagesatz oder notfalls eine Kurzbeschreibung, wenn das eine Livegrafik ist**
 *
 * *Also:* "Wegen des guten Wetters ziehen Schwaben nach Berlin" oder "So viele Autos nutzt der Berliner Senat in diesem Jahr" <br/>
 * *Nicht:* ~~"Wieder geht es bergab"~~ oder ~~"Zahl der Abgeordneten je Partei"~~
 *
 * **`subheader`: Angabe der Metrik**
 *
 * *Also:* "Fernsehkonsum in Stunden pro Woche" oder "Krankenhausbetten je Region" <br/>
 * *Nicht:* ~~"Wertschöpfung pro Jahr"~~ (ohne Angabe der Einheit) oder ~~"Das zeigt die Abhängigkeit von GEZ-Geldern"~~
 */
const Header: FunctionComponent<TitleProps> = (props) => {
  return (
    <header>
      <h1>{props.children.header}</h1>
      <p>{props.children.subheader}</p>
    </header>
  )
}
export default Header
