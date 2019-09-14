import React from 'react'
import PropTypes from 'prop-types'
import stopIcon from './stopIcon.svg'
import playIcon from './playIcon.svg'
import _ from './PlayButton.module.sass'

export default function PlayButton (props) {
  const { showStopIcon, onClick, className } = props

  return <button className={`${_.button} ${className}`} onClick={onClick}>
    {showStopIcon
      ? <img src={stopIcon} alt='stop' />
      : <img src={playIcon} alt='play' />
    }
  </button>
}

PlayButton.propTypes = {
  showStopIcon: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string
}

PlayButton.defaultProps = {
  showStopIcon: false,
  onClick: () => {}
}
