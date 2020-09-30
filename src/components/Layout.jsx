import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'react-proptypes';
import { useStaticQuery, graphql } from 'gatsby';

export default function Layout({ children }) {
  const {
    site: {
      siteMetadata: { description, title, lang }
    }
  } = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          description
          lang
          title
        }
      }
    }
  `);
  return (
    <>
      <Helmet>
        <html lang={lang} />
        <meta charset="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <link rel="icon" type="image/png" href="/favicon.png"></link>
        <link rel="mask-icon" href="/favicon.svg" color="blue"></link>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg"></link>
        <meta name="description" content={description} />
        <title>{title}</title>
      </Helmet>
      {children}
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.array
};
