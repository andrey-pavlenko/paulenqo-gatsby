import React from 'react';
import PropTypes from 'react-proptypes';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import defaultDetailsShipping from '../../products/details-shipping.json';
import PriceSuperscripted from '../PriceSuperscripted';
import Layout from '../Layout';
import Helmet from 'react-helmet';
import SizesList from '../sizes/SizesList';
import ColorsList from '../colors/ColorsList';
import './Template.sass';

export default class Product extends React.Component {
  constructor(props) {
    super(props);
    const product = props.data.allJavascriptFrontmatter.nodes[0];
    this.state = {
      product,
      currentSize: Product.findSize(
        product.frontmatter.size,
        product.frontmatter.sizes
      ),
      currentColor: Product.findColor(
        product.frontmatter.color,
        product.frontmatter.colors
      )
    };
    this.handleSelectSize = this.handleSelectSize.bind(this);
    this.handleSelectColor = this.handleSelectColor.bind(this);
  }

  static findSize(value, sizes) {
    if (value && sizes && sizes.length > 0) {
      return sizes.find((size) => size.value === value);
    }
  }

  static findColor(name, colors) {
    if (name && colors && colors.length > 0) {
      return colors.find((color) => color.name === name);
    }
  }

  handleSelectSize({ value }) {
    const currentSize = Product.findSize(
      value,
      this.state.product.frontmatter.sizes
    );
    if (currentSize != null) {
      const product = { ...this.state.product };
      product.frontmatter.size = currentSize.value;
      if (Number.isFinite(currentSize.price)) {
        product.frontmatter.price = currentSize.price;
      }
      if (currentSize.image != null) {
        product.frontmatter.image = currentSize.image;
      }
      this.setState({ product, currentSize });
    }
  }

  handleSelectColor({ name }) {
    const currentColor = Product.findColor(
      name,
      this.state.product.frontmatter.colors
    );
    if (currentColor != null) {
      const product = { ...this.state.product };
      product.frontmatter.color = currentColor.name;
      if (Number.isFinite(currentColor.price)) {
        product.frontmatter.price = currentColor.price;
      }
      if (currentColor.image != null) {
        product.frontmatter.image = currentColor.image;
      }
      this.setState({ product, currentColor });
    }
  }

  render() {
    const { frontmatter, fields } = this.state.product;
    const detailsShipping = [
      ...frontmatter.detailsShipping,
      ...defaultDetailsShipping
    ].filter((item, index, a) => a.indexOf(item) === index);
    return (
      <Layout>
        <Helmet>
          <title>{frontmatter.name}</title>
        </Helmet>
        <main className="single-product">
          <section className="product__photo">
            <Img
              fluid={{
                ...frontmatter.image.childImageSharp.fluid,
                aspectRatio: 3 / 4
              }}
            />
            <h2 className="product__price">
              <PriceSuperscripted currency="$" value={frontmatter.price} />
            </h2>
          </section>
          <section className="product__description">
            <h1 className="product__name">{frontmatter.name}</h1>
            <h3 className="description__text">{frontmatter.description}</h3>
            {frontmatter.sizes && frontmatter.sizes.length && (
              <div className="product__sizes">
                <SizesList
                  sizes={frontmatter.sizes}
                  currentSize={this.state.currentSize}
                  onSelect={this.handleSelectSize}
                />
              </div>
            )}
            {frontmatter.colors && frontmatter.colors.length && (
              <div className="product__colors">
                <ColorsList
                  colors={frontmatter.colors}
                  currentColor={this.state.currentColor}
                  onSelect={this.handleSelectColor}
                />
              </div>
            )}
            <button className="product__button">Add to cart</button>
            {detailsShipping.length > 0 && (
              <div className="product__details">
                <div className="details__title">Details &amp; shipping:</div>
                <ul>
                  {detailsShipping.map((item, index) => (
                    <li key={`ds-${index}`}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </section>
          {fields.galleryImages && fields.galleryImages.length > 0 && (
            <section className="product__gallery">
              {fields.galleryImages.map((image) => (
                <Img
                  key={image.id}
                  fluid={{ ...image.childImageSharp.fluid, aspectRatio: 1 }}
                />
              ))}
            </section>
          )}
        </main>
      </Layout>
    );
  }
}

Product.propTypes = {
  data: PropTypes.object
};

export const query = graphql`
  query($slug: String) {
    allJavascriptFrontmatter(filter: { fields: { slug: { eq: $slug } } }) {
      nodes {
        fields {
          galleryImages {
            id
            childImageSharp {
              fluid(maxWidth: 640) {
                ...GatsbyImageSharpFluid_withWebp_noBase64
              }
            }
          }
        }
        frontmatter {
          color
          colors {
            name
            value
          }
          description
          detailsShipping
          gallery
          name
          order
          price
          size
          sizes {
            image {
              childImageSharp {
                fluid(maxWidth: 640) {
                  ...GatsbyImageSharpFluid_withWebp_noBase64
                }
              }
            }
            price
            value
          }
          image {
            childImageSharp {
              fluid(maxWidth: 640) {
                ...GatsbyImageSharpFluid_withWebp_noBase64
              }
            }
          }
        }
      }
    }
  }
`;
