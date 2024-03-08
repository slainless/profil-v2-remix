import type { UnderscoredCode } from "./domain-handler.ts"

export function withHeaders(
  schema: UnderscoredCode,
  rest?: Record<string, string>,
) {
  return {
    fetchOptions: {
      headers: {
        "X-Digides-Schema": schema,
        ...rest,
      },
    },
  }
}
