import React, { useRef } from 'react';
import { uniqueId } from 'lodash';
import * as colors from 'global_styles/colors';
import styles from './TabBar.module.sass';

function useId(): string {
  const { current: id } = useRef(uniqueId());
  return id;
}

interface Props<T> {
  title: string;
  className?: string;
  /** An array of tabs.
   * This could simply be string or objects like for example:
   * { value: 0, display: 'tab1' }
   * or anything else you might need */
  tabs: T[];
  selectedTab: T;
  /** takes the tab value and should return its label
   *  (anything that can be renderd by react)
   */
  format?: (tab: T) => React.ReactNode;
  /** takes the tab value and should return its background color */
  color?: (tab: T) => string;
  /** select handler */
  onChange?: (tab: T) => void;
}

/**
 * Renders selectable Tabs next to each other
 */
function TabBar<T>({
  onChange = (tab: T) => {},
  format = (tab: T) => `${tab}`,
  color = () => colors.darkGrey,
  ...props
}: Props<T>) {
  const id = useId();

  return (
    <div className={`${styles.radioFilter} ${props.className}`}>
      <ul title={props.title}>
        {props.tabs.map((tab, i) => (
          <li
            className={tab === props.selectedTab ? styles.active : ''}
            key={`${id}-${i}`}
          >
            <input
              id={`${id}-${i}`}
              type="radio"
              name={id}
              value={i}
              checked={tab === props.selectedTab}
              onChange={() => onChange(tab)}
            />

            <label htmlFor={`${id}-${i}`}>
              <span
                className={styles.slant}
                style={{ backgroundColor: color(tab) }}
              />
              {format(tab)}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TabBar;
