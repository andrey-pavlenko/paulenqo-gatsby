exports.onCreateWebpackConfig = ({ stage, actions }) => {
  if (stage === 'build-javascript') {
    actions.setWebpackConfig({
      devtool: false
    });
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const GALLERY_PATH_SUFFIX = '/gallery';
  const { createPage } = actions;
  const dirs = await graphql(`
    {
      allFile(
        filter: {
          sourceInstanceName: { eq: "products" }
          childJavascriptFrontmatter: { frontmatter: { error: { eq: false } } }
        }
      ) {
        nodes {
          relativeDirectory
        }
      }
    }
  `);
  /** @type {string[]} */
  const slugs = dirs.data.allFile.nodes.map((node) => node.relativeDirectory);
  createPage({
    path: '/products',
    component: require.resolve('./src/components/ProductsTemplate.jsx'),
    context: {
      dirs: slugs,
      galleries: slugs.map((slug) => slug + GALLERY_PATH_SUFFIX)
    }
  });

  slugs.forEach((slug) =>
    createPage({
      path: `/product/${slug}`,
      component: require.resolve('./src/components/ProductTemplate.jsx'),
      context: {
        slug
      }
    })
  );
};
