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

export const importantContactsQuery = gql(`
  query importantContacts {
    contacts: importantContacts {
      name
      contact
      order
      ID
    }
  }
`)

export const externalLinksQuery = gql(`
  query externalLinks {
    links: externalLinks {
      name
      URL
      order
      ID
    }
  }
`)
