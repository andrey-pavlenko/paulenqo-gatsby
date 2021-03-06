const { join: pathJoin } = require('path');

exports.onCreateWebpackConfig = ({ stage, actions }) => {
  if (stage === 'build-javascript') {
    actions.setWebpackConfig({
      devtool: false
    });
  }
};

async function createProductPages(graphql, createPage) {
  const { data } = await graphql(`
    {
      allJavascriptFrontmatter(
        sort: { fields: node___modifiedTime }
        filter: { node: { sourceInstanceName: { eq: "products" } } }
      ) {
        nodes {
          node {
            relativeDirectory
          }
        }
      }
    }
  `);
  const slugs = data.allJavascriptFrontmatter.nodes.map(
    (node) => node.node.relativeDirectory
  );
  createPage({
    path: '/products',
    component: require.resolve('./src/components/all-products/Template.jsx'),
    context: {
      slugs
    }
  });

  slugs.forEach((slug) =>
    createPage({
      path: `/product/${slug}`,
      component: require.resolve(
        './src/components/single-product/Template.jsx'
      ),
      context: {
        slug
      }
    })
  );
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  await createProductPages(graphql, createPage);
};

function addGalleryImages(getNodes, createNodeField) {
  const nodes = getNodes();

  nodes
    .filter(
      (node) =>
        node.fields &&
        node.fields &&
        node.fields.galleryRelativeDirectory != null
    )
    .forEach((node) => {
      const galleryRelativeDirectory = node.fields.galleryRelativeDirectory;
      const galleryImages = nodes.filter(
        (node) =>
          node.relativeDirectory === galleryRelativeDirectory &&
          node.internal.type === 'File' &&
          node.internal.mediaType &&
          node.internal.mediaType.match(/^image\//)
      );
      createNodeField({
        node,
        name: 'galleryImages',
        value: galleryImages
      });
    });
}

exports.sourceNodes = ({ actions, getNodes }) => {
  addGalleryImages(getNodes, actions.createNodeField);
};

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = `
    type Fields {
      galleryImages: [File]
    }

    type JavascriptFrontmatter implements Node {
      fields: Fields
    }
  `;
  createTypes(typeDefs);
};

function addGalleryRelativeDirectory(node, createNodeField) {
  if (
    node.internal &&
    node.internal.type === 'JavascriptFrontmatter' &&
    node.frontmatter &&
    node.frontmatter.gallery != null
  ) {
    const galleryRelativeDirectory = pathJoin(
      node.node.relativeDirectory,
      node.frontmatter.gallery
    ).replace(/\/+$/, '');

    createNodeField({
      node,
      name: 'galleryRelativeDirectory',
      value: galleryRelativeDirectory
    });
  }
}

function addProductSlug(node, createNodeField) {
  if (
    node.internal &&
    node.internal.type === 'JavascriptFrontmatter' &&
    node.node &&
    node.node.sourceInstanceName === 'products'
  ) {
    console.info(node.node.relativePath, node.node.relativeDirectory);
    createNodeField({
      node,
      name: 'slug',
      value: node.node.relativeDirectory
    });
  }
}

exports.onCreateNode = ({ node, actions }) => {
  addProductSlug(node, actions.createNodeField);
  addGalleryRelativeDirectory(node, actions.createNodeField);
};
