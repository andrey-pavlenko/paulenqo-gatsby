import React from 'react';
import PropTypes from 'react-proptypes';
import './PriceSuperscripted.sass';

export default function PriceSuperscripted({ currency, value }) {
  if (Number.isFinite(value)) {
    const price = value.toFixed(2).split('.');
    return (
      <span className="price--subscripted">
        <sup className="price__currency">{currency}</sup>
        {price[0]}
        <sup className="price__decimals">{price[1]}</sup>
      </span>
    );
  }
  return null;
}

PriceSuperscripted.propTypes = {
  currency: PropTypes.string,
  value: PropTypes.number
};
