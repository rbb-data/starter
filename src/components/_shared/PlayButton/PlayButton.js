import React from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import stopIcon from './stopIcon.svg';
import playIcon from './playIcon.svg';
import _ from './PlayButton.module.scss';

export default function PlayButton(props) {
  const { showStopIcon, onClick, className } = props;
  const { basePath } = useRouter();

  return (
    <button className={`${_.button} ${className}`} onClick={onClick}>
      {showStopIcon ? (
        <img src={basePath + (stopIcon.src || stopIcon)} alt="stop" />
      ) : (
        <img src={basePath + (playIcon.src || playIcon)} alt="play" />
      )}
    </button>
  );
}

PlayButton.propTypes = {
  showStopIcon: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

PlayButton.defaultProps = {
  showStopIcon: false,
  onClick: () => {},
};
