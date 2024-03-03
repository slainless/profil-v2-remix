import type { Code, UnderscoredCode } from "./domain-handler.ts"

export function withHeaders(
  schema: Code | UnderscoredCode,
  rest?: Record<string, string>,
) {
  return {
    fetchOptions: {
      headers: {
        "X-Digides-Schema": schema.replaceAll(".", "_"),
        ...rest,
      },
    },
  }
}
