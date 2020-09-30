import React from 'react';
import { Link } from 'gatsby';

export default function Home() {
  return (
    <>
      <h1>Main page</h1>
      <Link to="/about/">About</Link>
      <Link to="/contacts/">Contacts</Link>
    </>
  );
}
