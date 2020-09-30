import React from 'react';
import { Link } from 'gatsby';
import Layout from '../components/Layout';

export default function NotFound() {
  return (
    <Layout>
      <p>Page not found</p>
      <Link to="/">Home</Link>
    </Layout>
  );
}
