import { redirect, type LoaderFunctionArgs } from "@remix-run/node"
import urlJoin from "url-join"

import { assertCommonContext } from "Server/context.ts"

export async function loader({ request, context }: LoaderFunctionArgs) {
  assertCommonContext(context)

  if (context.slug == null) throw new Response(null, { status: 404 })
  const path = process.env.KANTOR_REDIRECT_PATH ?? "/[slug]/kantor"

  if (path.startsWith("http"))
    return redirect(path.replace("[slug]", context.slug))
  if (process.env.BACKOFFICE_DOMAIN == null)
    throw new Response(null, { status: 404 })
  const url = new URL(request.url)
  return redirect(
    urlJoin(
      url.protocol,
      process.env.BACKOFFICE_DOMAIN,
      path.replace("[slug]", context.slug),
    ),
  )
}
