/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query domainMap {\n    map: _domainMap { name value }\n  }\n": types.DomainMapDocument,
    "\n    query profile {\n        profile {\n          postalCode\n          # welcome           { backgroundURL content personName personRole photoURL }\n          alias             { desa dusun pemimpin BPD }\n          name              { deskel ibukota kabkota kecamatan provinsi }\n          serviceEmail\n          socialMedia       { facebook instagram tiktok twitter youtube }\n          phone\n          servicePhone\n          workHour\n          contact\n          email\n          logoURL\n          officeAddress\n          description\n\n          # BPDChart\n          # SPDChart\n\n          primaryPalette\n\n          # landingLayout     { ID visible order }\n          # profileLayout     { ID visible order }\n          # infographyLayout  { ID visible order }\n          # navbarLayout      { ID visible order }\n          # navmenuLayout     { ID visible order }\n        }\n    }\n": types.ProfileDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query domainMap {\n    map: _domainMap { name value }\n  }\n"): (typeof documents)["\n  query domainMap {\n    map: _domainMap { name value }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query profile {\n        profile {\n          postalCode\n          # welcome           { backgroundURL content personName personRole photoURL }\n          alias             { desa dusun pemimpin BPD }\n          name              { deskel ibukota kabkota kecamatan provinsi }\n          serviceEmail\n          socialMedia       { facebook instagram tiktok twitter youtube }\n          phone\n          servicePhone\n          workHour\n          contact\n          email\n          logoURL\n          officeAddress\n          description\n\n          # BPDChart\n          # SPDChart\n\n          primaryPalette\n\n          # landingLayout     { ID visible order }\n          # profileLayout     { ID visible order }\n          # infographyLayout  { ID visible order }\n          # navbarLayout      { ID visible order }\n          # navmenuLayout     { ID visible order }\n        }\n    }\n"): (typeof documents)["\n    query profile {\n        profile {\n          postalCode\n          # welcome           { backgroundURL content personName personRole photoURL }\n          alias             { desa dusun pemimpin BPD }\n          name              { deskel ibukota kabkota kecamatan provinsi }\n          serviceEmail\n          socialMedia       { facebook instagram tiktok twitter youtube }\n          phone\n          servicePhone\n          workHour\n          contact\n          email\n          logoURL\n          officeAddress\n          description\n\n          # BPDChart\n          # SPDChart\n\n          primaryPalette\n\n          # landingLayout     { ID visible order }\n          # profileLayout     { ID visible order }\n          # infographyLayout  { ID visible order }\n          # navbarLayout      { ID visible order }\n          # navmenuLayout     { ID visible order }\n        }\n    }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;