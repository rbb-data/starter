import React from 'react'
import style from './styles.sass'

/**
 * Renders an info gauge that's useful for visualizing balances between two dimesions:
 * You can imagine it like this:
 *
 *        ⌄
 *     --------   {{here comes a user defined text}}
 *
 * @param {Number}    ratio Number between 0 and 1
 * @param {Function}  text  Function that gets passed the current ratio and
 *                          should return descriptive text.
 */

const BalanceGauge = ({ class: className, ratio, text }) => {
  return <div class={`${style.balanceGauge} ${className}`}>
    <div class={style.bar} aria-hidden='true'>
      <div class={style.leftBarPart} style={{ width: `${ratio * 100}%` }} />
      <div class={style.rightBarPart} style={{ width: `${(1 - ratio) * 100}%` }} />
      {/* <div class={style.caret} style={{ left: `${ratio * 100}%` }} /> */}
    </div>
    <span class={style.text}>{text(ratio)}</span>
  </div>
}

export default BalanceGauge
