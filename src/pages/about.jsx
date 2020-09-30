import React from 'react';
import { Link } from 'gatsby';

export default function About() {
  return (
    <>
      <h1>About page</h1>
      <Link to="/">Home</Link>
      <Link to="/contacts/">Contacts</Link>
    </>
  );
}
