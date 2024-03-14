import { redirect, type LoaderFunctionArgs } from "@remix-run/node"

import { mustGetMarketItemSlug } from "Services/.server/marketplace.ts"

import { assertCommonContext } from "Server/context"

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
