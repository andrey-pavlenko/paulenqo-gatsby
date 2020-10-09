# Used

- gatsby
- sass
- eslint
- prettier

### gatsby plugins

- gatsby-plugin-sass
- gatsby-source-filesystem
- gatsby-transformer-javascript-frontmatter

### eslint pligins

- eslint-config-prettier
- eslint-config-standard
- eslint-plugin-import
- eslint-plugin-node
- eslint-plugin-promise
- eslint-plugin-react
- eslint-plugin-standard

## Products

Every product stored in special folder in `pages/products`.

`pages/products/product` folder contains:

- `<product_name>.js` &ndash; product page

  - must exports `frontmatter` object
    - `order: number` &ndash; unique number, sort order
    - `name: string`
    - `price: number`
    - `description: string`
    - `detailsSipping?: string[]`
    - `size?: string`
    - `sizes?: Array<{value: string, price: number}>`
    - `color?: string`
    - `colors?: Array<{name: string, value: string}>`

- one `*.{jpg|png}` file, MIME `image/*` &ndash; product image
- `/gallery/*.*` &ndash additional product images
