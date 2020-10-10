const { resolve: pathResolve, join: pathJoin } = require('path');

exports.onCreateWebpackConfig = ({ stage, actions }) => {
  if (stage === 'build-javascript') {
    actions.setWebpackConfig({
      devtool: false
    });
  }
};

const GALLERY_PATH_SUFFIX = '/gallery';

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
    component: require.resolve('./src/components/ProductsTemplate.jsx'),
    context: {
      dirs: slugs
    }
  });

  slugs.forEach((slug) =>
    createPage({
      path: `/product/${slug}`,
      component: require.resolve(
        './src/components/single-product/Template.jsx'
      ),
      context: {
        slug,
        image: slug,
        gallery: slug + GALLERY_PATH_SUFFIX
      }
    })
  );
}

function linkProductsGallery(getNodes, getNode, createParentChildLink) {
  // console.info('getNodes', getNodes);
  // console.info('createParentChildLink', createParentChildLink);

  const nodes = getNodes();
  const productsWithGallery = nodes.filter(
    (node) =>
      node.node &&
      node.node.sourceInstanceName === 'products' &&
      node.frontmatter &&
      node.frontmatter.gallery != null
  );
  productsWithGallery.forEach((parent) => {
    const galleryPath = pathResolve(
      parent.node.dir,
      parent.frontmatter.gallery
    );
    nodes
      .filter((node) => node.dir === galleryPath)
      .forEach((child) =>
        createParentChildLink({
          parent,
          child
        })
      );
  });
}

// eslint-disable-next-line no-unused-vars
function addGallery(getNodes, getNode, createNodeField) {
  getNodes()
    .filter(
      (node) =>
        node.node &&
        node.node.sourceInstanceName === 'products' &&
        node.frontmatter &&
        node.frontmatter.gallery != null
    )
    .map((node) => {
      const gallery = node.frontmatter.gallery;
      // console.info(node.internal.type);
      // while (node.parent) {
      //   node = getNode(node.parent);
      //   console.info(node.internal.type);
      // }
      return { gallery, node: node.node };
    })
    .forEach(({ gallery, node }) => {
      // const galleryPath = pathJoin(node.relativeDirectory, gallery).replace(
      //   /\/+$/,
      //   ''
      // );
      const galleryPath = pathResolve(node.relativeDirectory, gallery);
      createNodeField({
        node,
        name: 'galleryRelativeDirectory',
        value: galleryPath
      });
    });
}

function addGalleryImages(getNodes, getNode, createNodeField) {
  const nodes = getNodes();

  const nodesWithGalleryRelativeDirectory = nodes
    .filter((node) => node.fields && node.fields != null)
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

      // console.info(galleryImages);
    });
  // console.info(nodesWithGalleryRelativeDirectory);
}

// eslint-disable-next-line no-unused-vars
function addGalaryToProducts(getNodes, getNode, createNodeField) {
  const nodes = getNodes();
  const productsWithGallery = nodes.filter(
    (node) =>
      node.node &&
      node.node.sourceInstanceName === 'products' &&
      node.frontmatter &&
      node.frontmatter.gallery != null
  );
  productsWithGallery.forEach((node) => {
    const galleryPath = pathResolve(node.node.dir, node.frontmatter.gallery);
    const gallery = nodes
      .filter(
        (node) =>
          node.dir === galleryPath &&
          node.absolutePath &&
          node.internal &&
          node.internal.mediaType.match(/^image\//)
      )
      .map((node) => node.absolutePath);

    // .reduce((nodes, node) => {
    //   return [...nodes, ...node.children];
    // }, [])
    // .map(getNode)
    // .filter((node) => node.internal.type === 'ImageSharp');
    console.info(gallery);

    createNodeField({
      node,
      name: 'gallery',
      value: gallery
    });
  });
}

/**
 * actions.createParentChildLink({parent: Node, child: Node}): void
 * getNodesByType(type: string): Node[] -- *.jpg == type 'File'
 */
exports.createPages = async ({ graphql, actions, getNodes, getNode }) => {
  const { createPage } = actions;
  await createProductPages(graphql, createPage);
  // console.info(actions.createParentChildLink);
};

exports.sourceNodes = ({ actions, getNodes, getNode }) => {
  linkProductsGallery(getNodes, getNode, actions.createParentChildLink);
  addGalleryImages(getNodes, getNode, actions.createNodeField);
  // addGallery(getNodes, getNode, actions.createNodeField);
};

exports.createSchemaCustomization = ({ actions, schema }) => {
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

exports.onCreateNode = ({ node, actions, getNode, getNodes }) => {
  if (
    node.internal &&
    node.internal.type === 'JavascriptFrontmatter' &&
    node.frontmatter &&
    node.frontmatter.gallery != null
  ) {
    const { createNodeField } = actions;

    const galleryPath = pathJoin(
      node.node.relativeDirectory,
      node.frontmatter.gallery
    ).replace(/\/+$/, '');

    // console.info(galleryPath);

    createNodeField({
      node,
      name: 'galleryRelativeDirectory',
      value: galleryPath
    });
  }
};
