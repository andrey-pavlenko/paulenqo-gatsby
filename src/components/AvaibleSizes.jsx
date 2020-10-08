import React from 'react';
import PropTypes from 'react-proptypes';
import './AvaibleSizes.sass';

function Size({ value }) {
  return <li className="size__item">{value}</li>;
}

Size.propTypes = {
  value: PropTypes.string
};

export default function AvaibleSizes({ sizes }) {
  if (sizes.length > 0) {
    return (
      <ul className="sizes__list">
        {sizes.map((size) => (
          <Size key={size.value} {...size} />
        ))}
      </ul>
    );
  }
  return null;
}

AvaibleSizes.propTypes = {
  sizes: PropTypes.arrayOf(PropTypes.object)
};
