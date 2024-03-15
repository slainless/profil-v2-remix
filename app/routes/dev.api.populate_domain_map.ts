import { json, type ActionFunctionArgs } from "@remix-run/node"

import { Code, Domain, DomainHandler } from "Modules/domain-handler.ts"

import { assertServerContext, isCloudflareContext } from "Server/context.ts"
import { mustGetDomainList } from "Server/express.ts"

const register = async (
  kv: KVNamespace,
  handler: DomainHandler,
  host: Domain,
  schema: Code,
) =>
  kv.put(
    host,
    JSON.stringify({
      schema,
      slug: handler.codeToSlug(schema),
      domain: host,
      canonDomain: handler.getCanonDomain(host),
    }),
  )

export async function action({ context }: ActionFunctionArgs) {
  if (isCloudflareContext(context) == false)
    throw new Response("Cloudflare service is not available", { status: 503 })
  assertServerContext(context)
  const domainList = await mustGetDomainList(context.gqlClient)
  const handler = new DomainHandler(domainList)
  const result = await Promise.all(
    Object.entries(domainList).map(([host, schema]) =>
      (async () => {
        try {
          register(
            context.cloudflare.env.DOMAIN_MAP_KV,
            handler,
            host as Domain,
            schema,
          )
          return {
            host,
            schema,
            status: "OK",
          }
        } catch (e) {
          return {
            host,
            schema,
            status: "ERROR",
            error: e?.toString(),
          }
        }
      })(),
    ),
  )

  return json(result)
}
