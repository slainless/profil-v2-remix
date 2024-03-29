import { Static, Type } from "@sinclair/typebox"

import { UserLevel, UserStatus } from "#graphql/graphql.ts"

import { ErrorCode, Schema as GenericSchema } from "#services/data.ts"
import { Service } from "#services/oauth.ts"

import { TypeCompiler } from "#modules/typebox-compiler.ts"

import { getPublicRest } from "../rest.ts"

export namespace Schema {
  export const token = Type.Object({
    access_token: Type.String(),
    username: Type.String(),
    level: Type.Enum(UserLevel),
    desa: Type.String(),
    status: Type.Enum(UserStatus),
  })

  export const form = Type.Object({
    id: Type.String({ minLength: 1 }),
    password: Type.String({ minLength: 1 }),
  })

  export const payload = Type.Intersect([GenericSchema.captchaEnforced, form])

  export const payloadWithThirdParty = Type.Intersect([
    GenericSchema.captchaEnforced,
    Type.Object({
      accessToken: Type.String(),
      service: Type.Enum(Service),
    }),
  ])
}

export namespace Compiled {
  export const token = TypeCompiler.Compile(Schema.token)
  export const form = TypeCompiler.Compile(Schema.form)
  export const payload = TypeCompiler.Compile(Schema.payload)
  export const payloadWithThirdParty = TypeCompiler.Compile(
    Schema.payloadWithThirdParty,
  )
}

export type TokenResponse = Static<typeof Schema.token>
export type FormPayload = Static<typeof Schema.form>
export type LoginPayload = Static<typeof Schema.payload>
export type LoginWithThirdPartyPayload = Static<
  typeof Schema.payloadWithThirdParty
>

export async function login(
  payload: LoginPayload | LoginWithThirdPartyPayload,
): Promise<KyResponse<TokenResponse>> {
  const json = Compiled.payloadWithThirdParty.Check(payload)
    ? {
        access_token: payload.accessToken,
        service: payload.service,
        captcha: payload.captcha,
      }
    : {
        id: payload.id,
        password: payload.password,
        captcha: payload.captcha,
      }

  return getPublicRest().post("login", {
    credentials: "include",
    json,
  })
}

export async function logout() {
  return getPublicRest().post("logout", {
    credentials: "include",
  })
}
