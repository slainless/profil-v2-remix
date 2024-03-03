import { gql } from "GraphQL/gql.ts"

export const profileQuery = gql(`
    query profile {
        profile {
          postalCode
          # welcome           { backgroundURL content personName personRole photoURL }
          alias             { desa dusun pemimpin BPD }
          name              { deskel ibukota kabkota kecamatan provinsi }
          serviceEmail
          socialMedia       { facebook instagram tiktok twitter youtube }
          phone
          servicePhone
          workHour
          contact
          email
          logoURL
          officeAddress
          description

          # BPDChart
          # SPDChart

          primaryPalette

          # landingLayout     { ID visible order }
          # profileLayout     { ID visible order }
          # infographyLayout  { ID visible order }
          # navbarLayout      { ID visible order }
          # navmenuLayout     { ID visible order }
        }
    }
`)
