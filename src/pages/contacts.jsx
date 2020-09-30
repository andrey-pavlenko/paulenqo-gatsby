import React from 'react';
import { Link } from 'gatsby';
import Layout from '../components/Layout';

export default function Contacts() {
  return (
    <Layout>
      <h1>Contacts page</h1>
      <Link to="/">Home</Link>
      <Link to="/about/">About</Link>
    </Layout>
  );
}
