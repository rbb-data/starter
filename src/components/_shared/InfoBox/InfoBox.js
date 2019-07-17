/* eslint-env browser */
import React from 'react'
import PropTypes from 'prop-types'
import style from './InfoBox.module.sass'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfo } from '@fortawesome/free-solid-svg-icons'

const InfoBox = props => {
  const { children, className } = props
  return <div className={`${className} ${style.wrapper}`}>
    <div className={style.infoWrapper}>
      <button className={style.infoButton}>
        <FontAwesomeIcon icon={faInfo} />
      </button>
      <div className={style.infoBox}>
        {children}
      </div>
    </div>
  </div>
}

InfoBox.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
}

export default InfoBox
