import React from 'react';

export default function Product({ pageContext: { slug } }) {
  return <p>Product {slug}</p>;
}
