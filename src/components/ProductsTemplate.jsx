import React from 'react';
import PropTypes from 'react-proptypes';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import './ProductsTemplate.sass';

function Product({ frontmatter, image, gallery }) {
  console.log(frontmatter);
  return (
    <article className="products__single-product">
      <div className="product__photo">
        {image && <Img fluid={{ ...image.fluid, aspectRatio: 3 / 4 }} />}
        {/* <h2 className="product__price">${frontmatter.price}</h2> */}
        <h2 className="product__price">
          $ 79<sup>00</sup>
        </h2>
      </div>
      <div className="product__description">
        <h1>{frontmatter.name}</h1>
        <h3>{frontmatter.description}</h3>
      </div>
    </article>
  );
}

Product.propTypes = {
  frontmatter: PropTypes.object,
  image: PropTypes.object,
  gallery: PropTypes.array
};

export default function Products({ data }) {
  return (
    <section className="products__container">
      {data.products.nodes.map((node) => {
        const mainImage = data.mainImages.nodes.filter(
          (imageNode) => imageNode.slug === node.slug
        )[0];
        return (
          <Product
            key={node.id}
            frontmatter={{
              ...node.childJavascriptFrontmatter.frontmatter,
              slug: node.slug
            }}
            slug={node.slug}
            image={mainImage && mainImage.image}
          />
        );
      })}
    </section>
  );
}

Products.propTypes = {
  data: PropTypes.object
};

export const query = graphql`
  query($dirs: [String]) {
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
            description
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
          fluid(maxWidth: 360) {
            ...GatsbyImageSharpFluid_withWebp_noBase64
          }
        }
      }
    }
  }
`;
