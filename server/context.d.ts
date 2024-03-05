import type { ProfileQuery } from "GraphQL/graphql.ts"

import type { Code, Domain } from "Modules/domain-handler.ts"

import type { Memory } from "./memory.ts"

export module "@remix-run/node" {
  export interface AppLoadContext extends Memory {
    schema?: Code
    host?: Domain
    profileQuery: [ProfileQuery["profile"] | undefined, Error | undefined]
  }
}
