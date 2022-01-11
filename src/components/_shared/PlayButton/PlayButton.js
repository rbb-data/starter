import React from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import stopIcon from './stopIcon.svg';
import playIcon from './playIcon.svg';
import _ from './PlayButton.module.scss';

/** Necessary because Storybook has no access to next's router */
function getSrc(router, resource) {
  return router ? router.basePath + resource.src : resource;
}

export default function PlayButton(props) {
  const { showStopIcon, onClick, className } = props;
  const router = useRouter();

  return (
    <button className={`${_.button} ${className}`} onClick={onClick}>
      {showStopIcon ? (
        <img src={getSrc(router, stopIcon)} alt="stop" />
      ) : (
        <img src={getSrc(router, playIcon)} alt="play" />
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
