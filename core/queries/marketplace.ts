import { gql } from "GraphQL/gql.ts"

export const commonReviewFieldsFragment = gql(`
  fragment commonReviewFields on MarketItemReview {
    ID          user { ID photoURL name }
    comment     rating
    createdAt   updatedAt
  }
`)

export const commonItemFieldsFragment = gql(`
  fragment commonItemFields on MarketItem {
    name    ID      slug    description
    rating  reviews likes   views

    user        { name phone }

    # rating_n
    # location
    
    defaultVariant  { ID }
    defaultPhoto    { ID }

    variants {
      ID  photoID name
      price stock
      isDisabled  isLimitedByStock
    }
    media {
      ID  URL caption annotation
      createdAt updatedAt
    }
    category    { name slug }
    subcategory

    createdAt
    updatedAt
  }
`)

export const productSlugQuery = gql(`
  query productSlug($ID: Int!, $schema: String!) {
    product: marketItemByID(ID: $ID, desa: $schema) { slug }
  }
`)

export const productCardsQuery = gql(`
  query products($limit: Int, $desa: String, $cursor: Int) {
    products: marketplace(limit: $limit, desa: $desa, after: $cursor) {
      name    ID        slug    description
      rating  reviews   likes   views
      user            { name phone }
      defaultVariant  { name price }
      defaultPhoto    { URL }
      category    { name slug }
      subcategory

      createdAt
      updatedAt
    }
  }
`)

export const productQuery = gql(`
  query product($ID: Int!, $schema: String!) {
    products: marketItemByID(ID: $ID, desa: $schema) {
      ...commonItemFields
    }
  }
`)

export const productWithReviewsQuery = gql(`
  query productWithReviews($ID: Int!, $schema: String!, $reviewNumbers: Int) {
    product: marketItemByID(ID: $ID, desa: $schema) {
      ...commonItemFields
    },
    reviews: marketItemReviews(itemID: $ID, limit: $reviewNumbers) {
      ...commonReviewFields
    }
  }
`)

export const reviewsQuery = gql(`
  query reviews($itemID: Int!, $limit: Int, $cursor: Int) {
    reviews: marketItemReviews(itemID: $itemID, limit: $limit, after: $cursor) {
      ...commonReviewFields
    }
  }
`)
