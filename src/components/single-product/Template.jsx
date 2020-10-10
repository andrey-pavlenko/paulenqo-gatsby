import React from 'react';
import PropTypes from 'react-proptypes';
import { graphql } from 'gatsby';
import defaultDetailsShipping from '../../products/details-shipping.json';

export default function Product({ data }) {
  const {
    product: { frontmatter }
  } = data;
  const detailsShipping = [
    ...frontmatter.detailsShipping,
    ...defaultDetailsShipping
  ].filter((item, index, a) => a.indexOf(item) === index);
  // console.log('frontmatter', frontmatter);
  // console.log(data);
  // console.log(defaultDetailsShipping);
  return (
    <main>
      <h1>{frontmatter.name}</h1>
      <h2>{frontmatter.price}</h2>
      <h3>{frontmatter.description}</h3>
      {detailsShipping.length > 0 && (
        <ul>
          {detailsShipping.map((item, index) => (
            <li key={`ds-${index}`}>{item}</li>
          ))}
        </ul>
      )}
    </main>
  );
}

Product.propTypes = {
  data: PropTypes.object
};

export const query = graphql`
  query($slug: String, $image: String, $gallery: String) {
    image: allFile(
      filter: {
        sourceInstanceName: { eq: "products" }
        internal: { mediaType: { glob: "image/*" } }
        relativeDirectory: { eq: $image }
      }
      sort: { fields: modifiedTime, order: DESC }
      limit: 1
    ) {
      nodes {
        childImageSharp {
          fluid {
            src
          }
        }
      }
    }
    gallery: allFile(
      filter: {
        sourceInstanceName: { eq: "products" }
        internal: { mediaType: { glob: "image/*" } }
        relativeDirectory: { eq: $gallery }
      }
      sort: { fields: modifiedTime, order: DESC }
    ) {
      nodes {
        childImageSharp {
          fluid {
            src
          }
        }
      }
    }
    product: javascriptFrontmatter(node: { relativeDirectory: { eq: $slug } }) {
      frontmatter {
        color
        colors {
          name
          value
        }
        description
        detailsShipping
        error
        name
        price
        size
        sizes {
          price
          value
          image {
            childImageSharp {
              fluid {
                src
              }
            }
          }
        }
      }
    }
  }
`;
