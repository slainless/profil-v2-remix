import { redirect, type LoaderFunctionArgs } from "@remix-run/node"

import { mustGetMarketItemSlug } from "#services/marketplace.ts"

import { assertCommonContext } from "#server/context.ts"

export async function loader({ context, params }: LoaderFunctionArgs) {
  const id = Number.parseInt(params["id"]!)
  if (Number.isNaN(id)) throw new Response(null, { status: 404 })
  assertCommonContext(context)
  const slug = await mustGetMarketItemSlug(
    context.gqlClient,
    context.schema,
    id,
  )

  return redirect(`../belanja/${id}/${slug}`)
}
