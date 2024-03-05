import { gql } from "GraphQL/gql.ts"

export const galleryItemsQuery = gql(`
  query galleryItems($limit: Int, $cursor: Int) {
    items: gallery(limit: $limit, after: $cursor) {
      URL
      caption
      ID
    }
  }
`)
