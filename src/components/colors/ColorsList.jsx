import React from 'react';
import PropTypes from 'react-proptypes';
import ColorBullet from './ColorBullet';
import './ColorsList.sass';

export default function SelectColor({ colors, currentColor, onSelect }) {
  return (
    <span className="colors-list">
      {colors.map((color, index) => (
        <ColorBullet
          key={`${index}-${color.value}`}
          name={color.name}
          value={color.value}
          isActive={
            currentColor &&
            color.name === currentColor.name &&
            color.value === currentColor.value
          }
          onClick={onSelect}
        />
      ))}
    </span>
  );
}

SelectColor.propTypes = {
  colors: PropTypes.array.isRequired,
  currentColor: PropTypes.object,
  onSelect: PropTypes.func
};
