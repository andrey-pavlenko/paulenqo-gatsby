import React from 'react';
import PropTypes from 'react-proptypes';
import { graphql } from 'gatsby';
import Layout from '../Layout';
import Img from 'gatsby-image';
import PriceSuperscripted from '../PriceSuperscripted';
import ColorsList from '../colors/ColorsList';
import SizesList from '../sizes/SizesList';
import './Template.sass';

function Product({ frontmatter }) {
  return (
    <article className="products__single-product">
      <div className="product__photo">
        {frontmatter.image && (
          <a href={`/product/${frontmatter.slug}`}>
            <Img
              fluid={{
                ...frontmatter.image.childImageSharp.fluid,
                aspectRatio: 3 / 4
              }}
            />
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
            <ColorsList colors={frontmatter.colors} />
          </div>
        )}
        {frontmatter.sizes != null && (
          <div className="product__sizes">
            <label>Avaible sizes</label>
            <SizesList sizes={frontmatter.sizes} />
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
  frontmatter: PropTypes.object
};

export default function Products({ data }) {
  const products = data.allJavascriptFrontmatter.nodes;
  return (
    <Layout>
      <section className="products__container">
        {products.map((product) => (
          <Product
            key={product.id}
            frontmatter={{ ...product.frontmatter, slug: product.fields.slug }}
          />
        ))}
      </section>
    </Layout>
  );
}

Products.propTypes = {
  data: PropTypes.object
};

export const query = graphql`
  query($slugs: [String]) {
    allJavascriptFrontmatter(
      filter: { fields: { slug: { in: $slugs } } }
      sort: { fields: frontmatter___order }
    ) {
      nodes {
        id
        fields {
          slug
        }
        frontmatter {
          color
          colors {
            name
            value
          }
          description
          image {
            childImageSharp {
              fluid(maxWidth: 640) {
                ...GatsbyImageSharpFluid_withWebp_noBase64
              }
            }
          }
          name
          price
          size
          sizes {
            price
            value
          }
        }
      }
    }
  }
`;
