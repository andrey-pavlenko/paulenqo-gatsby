import React from 'react';
import PropTypes from 'react-proptypes';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import defaultDetailsShipping from '../../products/details-shipping.json';
import PriceSuperscripted from '../PriceSuperscripted';
import Layout from '../Layout';
import Helmet from 'react-helmet';
import './Template.sass';

export default function Product({ data }) {
  const product = data.allJavascriptFrontmatter.nodes[0];
  const detailsShipping = [
    ...product.frontmatter.detailsShipping,
    ...defaultDetailsShipping
  ].filter((item, index, a) => a.indexOf(item) === index);
  console.log(product);
  return (
    <Layout>
      <Helmet>
        <title>{product.frontmatter.name}</title>
      </Helmet>
      <main className="single-product">
        <section className="product__photo">
          <Img
            fluid={{
              ...product.frontmatter.image.childImageSharp.fluid,
              aspectRatio: 3 / 4
            }}
          />
          <h2 className="product__price">
            <PriceSuperscripted
              currency="$"
              value={product.frontmatter.price}
            />
          </h2>
        </section>
        <section className="product__description">
          <h1 className="product__name">{product.frontmatter.name}</h1>
          <h3 className="description__text">
            {product.frontmatter.description}
          </h3>
          <section>Colors</section>
          <section>Sizes</section>
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
        {product.fields.galleryImages &&
          product.fields.galleryImages.length > 0 && (
            <section className="product__gallery">
              {product.fields.galleryImages.map((image) => (
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
                fluid {
                  src
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

// export const query = graphql`
//   query($slug: String, $image: String, $gallery: String) {
//     image: allFile(
//       filter: {
//         sourceInstanceName: { eq: "products" }
//         internal: { mediaType: { glob: "image/*" } }
//         relativeDirectory: { eq: $image }
//       }
//       sort: { fields: modifiedTime, order: DESC }
//       limit: 1
//     ) {
//       nodes {
//         childImageSharp {
//           fluid {
//             src
//           }
//         }
//       }
//     }
//     gallery: allFile(
//       filter: {
//         sourceInstanceName: { eq: "products" }
//         internal: { mediaType: { glob: "image/*" } }
//         relativeDirectory: { eq: $gallery }
//       }
//       sort: { fields: modifiedTime, order: DESC }
//     ) {
//       nodes {
//         childImageSharp {
//           fluid {
//             src
//           }
//         }
//       }
//     }
//     product: javascriptFrontmatter(node: { relativeDirectory: { eq: $slug } }) {
//       frontmatter {
//         color
//         colors {
//           name
//           value
//         }
//         description
//         detailsShipping
//         error
//         name
//         price
//         size
//         sizes {
//           price
//           value
//           image {
//             childImageSharp {
//               fluid {
//                 src
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// `;
