import type { UnderscoredCode } from "#modules/domain-handler.ts"

import { getServerRest } from "./rest.ts"

export enum TickType {
  GENERAL = "general",
  MARKET_ITEM = "market_item",
}

const tickMap = {
  [TickType.GENERAL]: "visit",
  [TickType.MARKET_ITEM]: "view_market_item",
}

export async function tick(
  schema: UnderscoredCode,
  type: TickType,
  pathname: string,
) {
  const payload = type == TickType.GENERAL ? { p: pathname } : { s: pathname }
  return getServerRest().post("admin/" + tickMap[type], {
    json: payload,
    headers: {
      "X-Digides-Schema": schema,
    },
    throwHttpErrors: false,
  })
}
