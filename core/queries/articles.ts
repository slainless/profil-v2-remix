import { gql } from "#graphql/gql.ts"

export const articleCardFieldsFragment = gql(`
  fragment articleCardFields on Article {
    ID  title slug
    thumbnail { URL } 
    views
    createdAt updatedAt
    type { name short slug }
    user { name position }
  }
`)

export const articleDetailQuery = gql(`
  query articleDetail($type: ArticleTypeValue, $slug: String!) {
    article: articleBySlug(slug: $slug, type: $type) {
      ...articleCardFields
      type { type }
      content short
      thumbnail { caption }
    }
  }
`)

export const articlesQuery = gql(`
  query articles($type: ArticleTypeValue, $limit: Int, $cursor: Int) {
    articles(type: $type, limit: $limit, after: $cursor) {
      ...articleCardFields
      type { type }
      short
    }
  }
`)

export const articleCardsQuery = gql(`
  query articleCards($type: ArticleTypeValue, $limit: Int, $cursor: Int) {
    articles(type: $type, limit: $limit, after: $cursor) {
      ID  title slug
      thumbnail { URL } 
      views short
      createdAt updatedAt
      user { name position }
    }
  }
`)

export const bumdesQuery = gql(`
  query bumdes {
    bumdes: articles(type: BUMDES) {
      thumbnail { URL }
      title
      slug
      short
    }
  }
`)

export const destinationsQuery = gql(`
  query destinations($limit: Int) {
    destinations: articles(type: TOURISM, limit: $limit) {
      thumbnail { URL }
      title
      short
      slug
    }
  }
`)

export const potenciesQuery = gql(`
  query potencies {
    potencies: articles(type: POTENTIAL) {
      thumbnail { URL }
      title
      short
      slug
    }
  }
`)
