import { Static, Type } from "@sinclair/typebox"
import { NationalNumber } from "libphonenumber-js"

import { Schema as GenericSchema } from "#services/data.ts"

import { TypeCompiler } from "#modules/typebox-compiler.ts"
import { Format } from "#modules/typebox.ts"

import { getPublicRest } from "./rest.ts"

export namespace Schema {
  export const otp = Type.Object({
    transaction_id: Type.String(),
    expire_at: Type.Number(),
  })

  export const request = Type.Intersect([
    GenericSchema.captchaEnforced,
    Type.Object({
      phone_number: Type.String({
        format: Format.phone,
      }),
    }),
  ])

  export const payload = Type.Object({
    tid: Type.String(),
    pin: Type.String({
      format: Format.otp,
    }),
  })
}

export namespace Compiled {
  export const otp = TypeCompiler.Compile(Schema.otp)
  export const request = TypeCompiler.Compile(Schema.request)
  export const payload = TypeCompiler.Compile(Schema.payload)
}

export type OTPResponse = Static<typeof Schema.otp>
export type RequestPayload = Static<typeof Schema.request>
export type OTPPayload = Static<typeof Schema.payload>

export function requestOTP(captcha: string, phoneNumber: NationalNumber) {
  return getPublicRest().post("request_otp", {
    json: {
      captcha,
      phone_number: phoneNumber,
    },
  })
}
