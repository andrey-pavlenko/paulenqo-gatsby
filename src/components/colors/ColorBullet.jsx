import React from 'react';
import PropTypes from 'react-proptypes';
import classNames from 'classnames';
import './ColorBullet.sass';

export default function ColorBullet({ name, value, isActive, onClick }) {
  const styles = { backgroundColor: value };
  const baseClassName = 'color-bullet';

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
      <span className="color-bullet__blot" style={styles}></span>
    </span>
  );
}

ColorBullet.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
  onClick: PropTypes.func
};
