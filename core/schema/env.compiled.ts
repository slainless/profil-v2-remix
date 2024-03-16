/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { Environment } from "./env.ts"

export function isEnvironment(value: unknown): value is Environment {
  return (
    (typeof value === 'object' && value !== null && !Array.isArray(value)) &&
    (typeof value.VITE_ASSET_BASE_URL === 'string') &&
    (typeof value.VITE_GRAPHQL_ENDPOINT === 'string') &&
    (typeof value.VITE_GRAPHQL_ACCESS_WEBTOKEN === 'string') &&
    (typeof value.VITE_GOOGLE_OAUTH_CLIENT_ID === 'string') &&
    (typeof value.VITE_FACEBOOK_OAUTH_CLIENT_ID === 'string') &&
    (typeof value.VITE_RECAPTCHA_SITE_KEY === 'string') &&
    (typeof value.VITE_GA_ID === 'string') &&
    (typeof value.VITE_MAPTILER_KEY === 'string') &&
    (typeof value.PORT === 'string') &&
    (typeof value.BASE_DOMAIN === 'string') &&
    (typeof value.GRAPHQL_ACCESS_WEBTOKEN === 'string') &&
    (typeof value.WEBTOKEN_SIGNING_SECRET === 'string') &&
    (typeof value.BACKOFFICE_DOMAIN === 'string')
  )
}

