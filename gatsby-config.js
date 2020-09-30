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
        name: `pages`,
        path: `${__dirname}/src/pages/`
      }
    },
    'gatsby-transformer-javascript-frontmatter',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass'
  ]
};
