import { gql } from "#graphql/gql.ts"

export const populationStatisticQuery = gql(`
  query populationStatistic {
    stats: populationStatistic {
      total     male      female
      mutation  temporary
      
      religion        { name value }
      bloodType       { name value }
      statusInFamily  { name value }
      maritalStatus   { name value }
      mutationIn      { name value }
      mutationOut     { name value }
      maleAgeRanges   { name value }
      femaleAgeRanges { name value }
      dusun           { name value }
      education       { name value }
      job             { name value }
      wajibPilih      { name value }
    }
  }
`)
