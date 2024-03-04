import { gql } from "GraphQL/gql.ts"

export const pointOfInterestsQuery = gql(`
  query pointOfInterests {
    items: pointOfInterests {
      ID title description
      thumbnail { ID URL }
      point { latitude longitude }
      category
    }
  }
`)

export const pointOfInterestByIDQuery = gql(`
  query pointOfInterestsByID($itemID: Int!) {
    item: pointOfInterestByID(ID: $itemID) {
      ID title description
      thumbnail { ID URL }
      point { latitude longitude }
      category
    }
  }
`)

export const mainPointOfInterestQuery = gql(`
  query mainPointOfInterest {
    item: pointOfInterestByID(ID: 1) {
      point { latitude longitude }
    }
  }
`)
