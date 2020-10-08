import React from 'react';
import PropTypes from 'react-proptypes';
import './AvaibleColors.sass';

function Color({ name, value }) {
  const styles = { backgroundColor: value };
  return (
    <li className="color__item">
      <span className="color__bullet" style={styles} title={name}></span>
    </li>
  );
}

Color.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string
};

export default function AvaibleColors({ colors }) {
  if (colors.length > 0) {
    return (
      <ul className="colors__list">
        {colors.map((color) => (
          <Color key={color.value} {...color} />
        ))}
      </ul>
    );
  }
  return null;
}

AvaibleColors.propTypes = {
  colors: PropTypes.arrayOf(PropTypes.object)
};
