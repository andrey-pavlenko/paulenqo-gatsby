import React from 'react';
import PropTypes from 'react-proptypes';
import SizeBullet from './SizeBullet';
import './SizesList.sass';

export default function SizesList({ sizes, currentSize, onSelect }) {
  return (
    <span className="sizes-list">
      {sizes.map((size, index) => (
        <SizeBullet
          key={`${index}-${size.value}`}
          name={size.name}
          value={size.value}
          isActive={currentSize && size.value === currentSize.value}
          onClick={onSelect}
        />
      ))}
    </span>
  );
}

SizesList.propTypes = {
  sizes: PropTypes.array.isRequired,
  currentSize: PropTypes.object,
  onSelect: PropTypes.func
};
