import React from 'react';
import { Link } from 'gatsby';

export default function Contacts() {
  return (
    <>
      <h1>Contacts page</h1>
      <Link to="/">Home</Link>
      <Link to="/about/">About</Link>
    </>
  );
}
