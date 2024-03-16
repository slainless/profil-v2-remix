import { Static, Type } from "@sinclair/typebox"

import { TypeCompiler } from "../modules/typebox-compiler.ts"

export enum Service {
  Facebook = "facebook",
  Google = "google",
}

export const channel = "oauth_channel"

export const labels = {
  [Service.Facebook]: "Facebook",
  [Service.Google]: "Google",
}

export const authUrls = {
  [Service.Facebook]: "https://www.facebook.com/v19.0/dialog/oauth",
  [Service.Google]: "https://accounts.google.com/o/oauth2/v2/auth",
}

export const profileScopes = {
  [Service.Facebook]: ["email", "public_profile"],
  [Service.Google]: [
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
    "openid",
  ],
}

export namespace Schema {
  export const state = Type.Object({
    origin: Type.String({ minLength: 1 }),
    redirect: Type.String({ minLength: 1 }),
    service: Type.Enum(Service),
  })
}

export namespace Compiled {
  export const state = TypeCompiler.Compile(Schema.state)
}

export type State = Static<typeof Schema.state>

export enum Status {
  INVALID_CALL = "invalid_call",
  INVALID_TOKEN = "invalid_token",
  OK = "ok",
}

export interface FailedOAuthResponse {
  status: Status.INVALID_CALL | Status.INVALID_TOKEN
}

export interface SuccessOAuthResponse {
  status: Status.OK
  token: string
  origin: string
  redirect: string
  service: Service
}

export type OAuthResponse = SuccessOAuthResponse | FailedOAuthResponse | null

export const getOAuthResponse = (hash: string | null): OAuthResponse => {
  if (hash == null || hash == "") return null

  const params = new URLSearchParams(hash.replace(/^#/, "?"))
  const token = params.get("access_token")
  const rawState = params.get("state")
  if (token == null || token == "" || rawState == null || rawState == "")
    return { status: Status.INVALID_TOKEN }

  try {
    const _s = JSON.parse(atob(rawState))
    if (Compiled.state.Check(_s))
      return {
        ..._s,
        status: Status.OK,
        token,
      }
  } catch (e) {
    //
  }
  return { status: Status.INVALID_TOKEN }
}

export const createAuthUrl = (
  rootOrigin: string,
  origin: string,
  clientId: string,
  service: Service,
  scopes: string[],
) => {
  if (rootOrigin == "" || origin == "") return ""
  if (clientId == null)
    throw new Error(
      `Cannot create auth url for service ${service}: Client ID not found!`,
    )

  const url = new URL(authUrls[service])
  url.searchParams.set("scope", scopes.join(" "))
  url.searchParams.set("response_type", "token")
  url.searchParams.set("client_id", clientId)
  url.searchParams.set("redirect_uri", createRedirectUri(rootOrigin))
  url.searchParams.set(
    "state",
    btoa(
      JSON.stringify({
        origin,
        redirect: "/",
        service,
      }),
    ),
  )

  return url.href
}

export const createRedirectUri = (rootOrigin: string, isStorybook = false) => {
  if (isStorybook) {
    // const params = new URLSearchParams(window.location.href)

    const url = new URL(window.location.origin)
    url.pathname = window.location.pathname

    return (
      url.href + "?viewMode=story&id=auth-storybook-oauth-callback--default"
    )
  }

  const base = new URL(rootOrigin)
  base.pathname = "api/oauth"
  return base.href
}
