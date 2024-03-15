import { gql } from "#graphql/gql.ts"

export const PPIDCategoriesQuery = gql(`
  query PPIDCategories {
    categories: PPIDCategories {
      ID          name
      description type
    }
  }
`)

export const PPIDFilesQuery = gql(`
  query PPIDFiles($categoryID: Int, $after: Int) {
    files: PPIDFiles(categoryID: $categoryID, after: $after) {
      ID fileURL
      name
      category { name type }
      downloadCount
      updatedAt
    }
  }
`)
