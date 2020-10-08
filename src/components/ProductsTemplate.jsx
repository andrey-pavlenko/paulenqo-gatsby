import React from 'react';
import PropTypes from 'react-proptypes';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import PriceSuperscripted from './PriceSuperscripted';
import AvaibleColors from './AvaibleColors';
import AvaibleSizes from './AvaibleSizes';
import './ProductsTemplate.sass';

function Product({ frontmatter, image }) {
  console.log(frontmatter);
  return (
    <article className="products__single-product">
      <div className="product__photo">
        {image && (
          <a href={`/product/${frontmatter.slug}`}>
            <Img fluid={{ ...image.fluid, aspectRatio: 3 / 4 }} />
          </a>
        )}
        <h2 className="product__price">
          <PriceSuperscripted currency="$" value={frontmatter.price} />
        </h2>
      </div>
      <div className="product__description">
        <h1 className="product__name">{frontmatter.name}</h1>
        <h3 className="product__text">{frontmatter.description}</h3>
        {frontmatter.colors != null && (
          <div className="product__colors">
            <label>Avaible colors</label>
            <AvaibleColors colors={frontmatter.colors} />
          </div>
        )}
        {frontmatter.sizes != null && (
          <div className="product__sizes">
            <label>Avaible sizes</label>
            <AvaibleSizes sizes={frontmatter.sizes} />
          </div>
        )}
        <div className="product__button">
          <a href={`/product/${frontmatter.slug}`}>More details</a>
        </div>
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
            colors {
              name
              value
            }
            sizes {
              value
            }
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
          fluid(maxWidth: 640) {
            ...GatsbyImageSharpFluid_withWebp_noBase64
          }
        }
      }
    }
  }
`;
