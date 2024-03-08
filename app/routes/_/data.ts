import type { MetaArgs, MetaDescriptor } from "@remix-run/node"
import invariant from "tiny-invariant"

import type { loader } from "./route.tsx"

const getRootLayoutMatch = (matches: MetaArgs["matches"]) =>
  matches.find((match) => match.id === "routes/_")

export type LoaderData = NonNullable<MetaArgs<typeof loader>["data"]>
export function getRootLayoutData(
  matches: MetaArgs["matches"],
): LoaderData | undefined {
  return getRootLayoutMatch(matches)?.data as unknown as LoaderData
}

export function mustGetRootLayoutData(
  matches: MetaArgs["matches"],
): LoaderData {
  const parent = getRootLayoutData(matches)
  invariant(parent, "Parent data is not populated")
  return parent
}

export function getRootLayoutMetadata(
  matches: MetaArgs["matches"],
): MetaDescriptor[] | undefined {
  return getRootLayoutMatch(matches)?.meta
}

export function mustGetRootLayoutMetadata(
  matches: MetaArgs["matches"],
): MetaDescriptor[] {
  const parent = getRootLayoutMetadata(matches)
  invariant(parent, "Parent meta is not populated")
  return parent
}
