/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import type { Environment } from "./env.ts"

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
    (typeof value.BASE_DOMAIN === 'string') &&
    (typeof value.GRAPHQL_ACCESS_WEBTOKEN === 'string') &&
    (value.BACKOFFICE_DOMAIN !== undefined ? ((typeof value.BACKOFFICE_DOMAIN === 'string')) : true) &&
    (value.KANTOR_REDIRECT_PATH !== undefined ? ((typeof value.KANTOR_REDIRECT_PATH === 'string')) : true) &&
    (value.BYPASS_FIX_REQUEST_HOSTNAME !== undefined ? ((typeof value.BYPASS_FIX_REQUEST_HOSTNAME === 'string')) : true)
  )
}

