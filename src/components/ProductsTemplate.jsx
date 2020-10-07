import React from 'react';
import PropTypes from 'react-proptypes';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';

function Product({ frontmatter, image, gallery }) {
  return (
    <>
      <h1>
        {frontmatter.name}, ${frontmatter.price}
      </h1>
      {image && <Img fluid={{ ...image.fluid, aspectRatio: 3 / 4 }} />}
      {gallery &&
        gallery.map((image) => (
          <Img
            key={image.id}
            fluid={{
              ...image.fluid,
              aspectRatio: 1
            }}
          />
        ))}
    </>
  );
}

Product.propTypes = {
  frontmatter: PropTypes.object,
  image: PropTypes.object,
  gallery: PropTypes.array
};

export default function Products({ data }) {
  return (
    <>
      {data.products.nodes.map((node) => {
        const mainImage = data.mainImages.nodes.filter(
          (imageNode) => imageNode.slug === node.slug
        )[0];
        const galleryImages = data.galleryImages.nodes
          .map((imageNode) => ({
            ...imageNode,
            slug: imageNode.slug.substring(0, imageNode.slug.indexOf('/'))
          }))
          .filter((imageNode) => imageNode.slug === node.slug)
          .map((imageNode) => ({
            id: imageNode.id,
            fluid: imageNode.image.fluid
          }));
        return (
          <Product
            key={node.id}
            frontmatter={{
              ...node.childJavascriptFrontmatter.frontmatter,
              slug: node.slug
            }}
            slug={node.slug}
            image={mainImage && mainImage.image}
            gallery={galleryImages}
          />
        );
      })}
    </>
  );
}

Products.propTypes = {
  data: PropTypes.object
};

export const query = graphql`
  query($dirs: [String], $galleries: [String]) {
    products: allFile(
      filter: {
        relativeDirectory: { in: $dirs }
        childJavascriptFrontmatter: { frontmatter: { error: { eq: false } } }
      }
      sort: { fields: childJavascriptFrontmatter___frontmatter___order }
    ) {
      nodes {
        slug: relativeDirectory
        id
        childJavascriptFrontmatter {
          frontmatter {
            name
            price
          }
        }
      }
    }
    mainImages: allFile(
      filter: {
        internal: { mediaType: { glob: "image/*" } }
        relativeDirectory: { in: $dirs }
      }
      sort: { fields: mtimeMs, order: DESC }
    ) {
      nodes {
        slug: relativeDirectory
        image: childImageSharp {
          fluid(maxWidth: 2000) {
            ...GatsbyImageSharpFluid_withWebp_noBase64
          }
        }
      }
    }
    galleryImages: allFile(
      filter: {
        internal: { mediaType: { glob: "image/*" } }
        relativeDirectory: { in: $galleries }
      }
    ) {
      nodes {
        slug: relativeDirectory
        id
        image: childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid_withWebp_noBase64
          }
        }
      }
    }
  }
`;
