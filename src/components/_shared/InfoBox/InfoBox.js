/* eslint-env browser */
import React from 'react';
import PropTypes from 'prop-types';
import { Info } from 'react-feather';

import style from './InfoBox.module.sass';

const InfoBox = (props) => {
  const { children, className, size = 20 } = props;
  return (
    <div className={`${className} ${style.wrapper}`}>
      <div className={style.infoWrapper}>
        <button
          className={style.infoButton}
          style={{ width: `${size}px`, height: `${size}px` }}
        >
          <Info width={size} height={size} />
        </button>
        <div className={style.infoBox}>{children}</div>
      </div>
    </div>
  );
};

InfoBox.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  size: PropTypes.number,
};

export default InfoBox;
