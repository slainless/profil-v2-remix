import { redirect, type LoaderFunctionArgs } from "@remix-run/node"

import { mustNormalizeContext } from "Services/.server/context.ts"
import { mustGetMarketItemSlug } from "Services/.server/marketplace.ts"

export async function loader({ context, params }: LoaderFunctionArgs) {
  const id = Number.parseInt(params["id"]!)
  if (Number.isNaN(id)) throw new Response(null, { status: 404 })
  const ctx = mustNormalizeContext(context)
  const slug = await mustGetMarketItemSlug(context.gqlClient, ctx.schema, id)

  console.log(slug)
  return redirect(`../belanja/${id}/${slug}`)
}
