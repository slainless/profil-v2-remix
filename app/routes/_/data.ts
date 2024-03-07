import type { MetaArgs } from "@remix-run/node"
import invariant from "tiny-invariant"

import type { loader } from "./route.tsx"

export type LoaderData = NonNullable<MetaArgs<typeof loader>["data"]>
export function getParentData(
  matches: MetaArgs["matches"],
): LoaderData | undefined {
  return matches.find((match) => match.id === "_") as unknown as LoaderData
}

export function mustGetParentData(matches: MetaArgs["matches"]): LoaderData {
  const parent = getParentData(matches)
  invariant(parent, "Parent data is not populated")
  return parent
}
