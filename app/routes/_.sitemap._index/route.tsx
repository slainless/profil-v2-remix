import type { LoaderFunctionArgs } from "@remix-run/node"

import { getServerRest } from "#services/.server/rest.js"

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url)
  try {
    const resp = await getServerRest()
      .get(`sitemaps/${url.hostname}.xml`, {
        cache: "no-cache", // should also consider using revalidation 24h
      })
      .text()
    const headers = new Headers({ "Content-Type": "application/xml" })
    return new Response(resp, { headers, status: 200 })
  } catch (error) {
    throw new Response(null, { status: 404 })
  }
}
