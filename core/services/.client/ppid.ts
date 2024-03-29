import { Static, Type } from "@sinclair/typebox"

import { Code, UnderscoredCode } from "#modules/domain-handler.ts"
import { TypeCompiler } from "#modules/typebox-compiler.ts"
import { Format } from "#modules/typebox.ts"

import { getPublicRest } from "../rest.ts"

export namespace Schema {
  export const payload = Type.Object({
    name: Type.String({ minLength: 1, maxLength: 32 }),
    email: Type.String({ format: Format.email, minLength: 1 }),
    phone: Type.String({ format: Format.phone, minLength: 1 }),
    instance: Type.String({ minLength: 1, maxLength: 64 }),
    request: Type.String({ minLength: 1, maxLength: 255 }),
  })
}

export namespace Compiled {
  export const payload = TypeCompiler.Compile(Schema.payload)
}

export type PPIDRequestPayload = Static<typeof Schema.payload>

export function request(schema: UnderscoredCode, payload: PPIDRequestPayload) {
  return getPublicRest().post("ppid_request", {
    json: payload,
    headers: { "X-Digides-Schema": schema },
  })
}
