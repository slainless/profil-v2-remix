import { Static, Type } from "@sinclair/typebox"

import { Format } from "Modules/typebox.ts"

export const categories = [
  { value: "umum", label: "Umum" },
  { value: "sosial", label: "Sosial" },
  { value: "keamanan", label: "Keamanan" },
  { value: "kesehatan", label: "Kesehatan" },
  { value: "kebersihan", label: "Kebersihan" },
  { value: "permintaan", label: "Permintaan" },
] as const

export namespace Schema {
  export const payload = Type.Object({
    name: Type.String({ maxLength: 32, minLength: 1 }),
    phone: Type.String({ format: Format.phone }),
    category: Type.Union(categories.map((v) => Type.Literal(v.value))),
    complaint: Type.String({ maxLength: 255, minLength: 1 }),
  })
}

export type ComplaintPayload = Static<typeof Schema.payload> & {
  attachment: File | null
}
