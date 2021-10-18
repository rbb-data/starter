import React from 'react';
import { FunctionComponent } from 'react';
import { darkGrey } from 'global_styles/colors';

export interface TitleProps {
  children: {
    title: string;
    subtitle: string;
  };
}
/**
 * Der Titel für jede Grafik oder Interactive
 * Ein Header besteht aus: `title` und `subheader`
 *
 * **`title`: Ein Aussagesatz oder notfalls eine Kurzbeschreibung, wenn das eine Live-Grafik ist**
 *
 * *Also:* "Wegen des guten Wetters ziehen Schwaben nach Berlin" oder "So viele Autos nutzt der Berliner Senat in diesem Jahr" <br/>
 * *Nicht:* ~~"Wieder geht es bergab"~~ oder ~~"Zahl der Abgeordneten je Partei"~~
 *
 * **`subtitle`: Angabe der Metrik**
 *
 * *Also:* "Fernsehkonsum in Stunden pro Woche" oder "Krankenhausbetten je Region" <br/>
 * *Nicht:* ~~"Wertschöpfung pro Jahr"~~ (ohne Angabe der Einheit) oder ~~"Das zeigt die Abhängigkeit von GEZ-Geldern"~~
 */
const Header: FunctionComponent<TitleProps> = (props) => {
  return (
    <header>
      <h1>{props.children.title}</h1>
      <p>{props.children.subtitle}</p>
      <style jsx>{`
        h1 {
          font-size: 16px;
          margin-bottom: 0.3em;
        }

        p {
          font-size: 12px;
          color: ${darkGrey};
          margin: 0 0 1.5em;
        }
      `}</style>
    </header>
  );
};
export default Header;
