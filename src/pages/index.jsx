import React from 'react';
import { Link } from 'gatsby';
import Layout from '../components/Layout';

export default function Home() {
  return (
    <Layout>
      <h1>Main page</h1>
      <Link to="/about/">About</Link>
      <Link to="/contacts/">Contacts</Link>
    </Layout>
  );
}
