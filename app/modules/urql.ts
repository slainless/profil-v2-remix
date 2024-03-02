import { makeOperation, type Operation, type OperationContext } from "urql"

export { makeOperation, formatDocument, makeResult } from "@urql/core"

interface EntityLike {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: EntityLike | EntityLike[] | any
  __typename: string | null | void
}

const collectTypes = (obj: EntityLike | EntityLike[], types: Set<string>) => {
  if (Array.isArray(obj)) {
    for (const item of obj) collectTypes(item, types)
  } else if (typeof obj === "object" && obj !== null) {
    for (const key in obj) {
      if (key === "__typename" && typeof obj[key] === "string") {
        types.add(obj[key] as string)
      } else {
        collectTypes(obj[key], types)
      }
    }
  }

  return types
}

export const collectTypenames = (response: object): string[] => [
  ...collectTypes(response as EntityLike, new Set()),
]

export const addMetadata = (
  operation: Operation,
  meta: OperationContext["meta"],
) => {
  return makeOperation(operation.kind, operation, {
    meta: {
      ...operation.context.meta,
      ...meta,
    },
  })
}
