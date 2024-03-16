import { Type, type Static } from "@sinclair/typebox"

export const Environment = Type.Object({
  VITE_ASSET_BASE_URL: Type.String(),
  VITE_GRAPHQL_ENDPOINT: Type.String(),
  VITE_GRAPHQL_ACCESS_WEBTOKEN: Type.String(),

  VITE_GOOGLE_OAUTH_CLIENT_ID: Type.String(),
  VITE_FACEBOOK_OAUTH_CLIENT_ID: Type.String(),

  VITE_RECAPTCHA_SITE_KEY: Type.String(),

  VITE_GA_ID: Type.String(),

  VITE_MAPTILER_KEY: Type.String(),

  PORT: Type.String(),
  BASE_DOMAIN: Type.String(),
  GRAPHQL_ACCESS_WEBTOKEN: Type.String(),
  WEBTOKEN_SIGNING_SECRET: Type.String(),
  BACKOFFICE_DOMAIN: Type.String(),
})

export type Environment = Static<typeof Environment>
