import { Static, Type } from "@sinclair/typebox"

import { Schema as GenericSchema } from "#services/data.ts"
import { Service } from "#services/oauth.ts"

import { TypeCompiler } from "#modules/typebox-compiler.ts"
import { Format } from "#modules/typebox.ts"

import { TokenResponse } from "./login.ts"
import { Schema as OTPSchema } from "./otp.ts"
import { getPublicRest } from "./rest.ts"

export namespace Schema {
  export const prefill = Type.Object({
    access_token: Type.String(),
    service: Type.Enum(Service),
  })

  export const form = Type.Object({
    name: Type.String({ maxLength: 64, minLength: 1, format: Format.name }),
    username: Type.String({
      maxLength: 32,
      minLength: 1,
      format: Format.username,
    }),
    email: Type.String({
      minLength: 1,
      format: Format.email,
    }),
    phone_number: Type.String({
      format: Format.phone,
    }),
    password: Type.String({
      maxLength: 72,
      minLength: 8,
      format: Format.password,
    }),
  })

  export const payload = Type.Intersect([
    GenericSchema.captchaEnforced,
    OTPSchema.payload,
    prefill,
    form,
  ])

  // export const payloadWithThirdParty = Type.Intersect([payload, prefill])
}

export namespace Compiled {
  export const prefill = TypeCompiler.Compile(Schema.prefill)
  export const form = TypeCompiler.Compile(Schema.form)
  export const payload = TypeCompiler.Compile(Schema.payload)
  // export const payloadWithThirdParty = TypeCompiler.Compile(
  //   Schema.payloadWithThirdParty,
  // )
}

export type PrefillPayload = Static<typeof Schema.prefill>
export type FormPayload = Static<typeof Schema.form>
export type RegisterPayload = Static<typeof Schema.payload>
// export type RegisterWithThirdPartyPayload = Static<
//   typeof Schema.payloadWithThirdParty
// >

export async function register(
  payload: RegisterPayload,
): Promise<KyResponse<TokenResponse>> {
  return getPublicRest().post("register", {
    credentials: "include",
    json: payload,
  })
}
