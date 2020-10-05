module.exports = {
  siteMetadata: {
    lang: 'en',
    title: 'Shop',
    description: 'Online shop'
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `products`,
        path: `${__dirname}/src/products/`
      }
    },
    'gatsby-transformer-javascript-frontmatter',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    'gatsby-transformer-javascript-frontmatter',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp'
  ]
};
