import React from 'react';
import { Link } from 'gatsby';

export default function NotFound() {
  return (
    <>
      <p>Page not found</p>
      <Link to="/">Home</Link>
    </>
  );
}
