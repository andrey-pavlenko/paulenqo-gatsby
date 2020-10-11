import React from 'react';
import PropTypes from 'react-proptypes';
import classNames from 'classnames';
import './SizeBullet.sass';

export default function SizeBullet({ value, name, isActive, onClick }) {
  const baseClassName = 'size-bullet';

  return (
    <span
      className={classNames(baseClassName, {
        [`${baseClassName}--is-active`]: isActive,
        [`${baseClassName}--can-click`]: onClick && onClick.call
      })}
      title={name}
      onClick={() => {
        if (onClick && onClick.call) {
          onClick({ name, value });
        }
      }}
    >
      {value}
    </span>
  );
}

SizeBullet.propTypes = {
  value: PropTypes.string.isRequired,
  name: PropTypes.string,
  isActive: PropTypes.bool,
  onClick: PropTypes.func
};
