import React from 'react'
import PropTypes from 'prop-types'
import style from './BalanceGauge.module.sass'

/**
 * Renders an info gauge that's useful for visualizing balances between two dimesions:
 * You can imagine it like this:
 *
 *        ⌄
 *     --------   {{here comes a user defined text}}
 *
 */

const BalanceGauge = ({ className, ratio, text }) => {
  return <div className={`${style.balanceGauge} ${className}`}>
    <div className={style.bar} aria-hidden='true'>
      <div className={style.leftBarPart} style={{ width: `${ratio * 100}%` }} />
      <div className={style.rightBarPart} style={{ width: `${(1 - ratio) * 100}%` }} />
      {/* <div className={style.caret} style={{ left: `${ratio * 100}%` }} /> */}
    </div>
    <span className={style.text}>{text(ratio)}</span>
  </div>
}

BalanceGauge.propTypes = {
  /** Custom className */
  className: PropTypes.string,
  /** Number between 0 and 1 */
  ratio: PropTypes.number.isRequired,
  /** Function that gets passed the current ratio and
  *    should return descriptive text. */
  text: PropTypes.func.isRequired
}

export default BalanceGauge
