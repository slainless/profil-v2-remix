import type { Client } from "urql"

import type { DomainHandler } from "Modules/domain-handler"

export interface Memory {
  gqlClient: Client
  domain: DomainHandler
}
