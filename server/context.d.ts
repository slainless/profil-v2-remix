import type { Code } from "core/modules/domain-handler.ts"

import type { ProfileQuery } from "GraphQL/graphql.ts"

import type { Memory } from "./memory.ts"

export module "@remix-run/node" {
  export interface AppLoadContext extends Memory {
    schema?: Code
    profileQuery: [ProfileQuery["profile"] | undefined, Error | undefined]
  }
}
