import { createPagesFunctionHandler } from "@remix-run/cloudflare-pages"

// @ts-expect-error - the server build file is generated by `remix vite:build`
import * as build from "../build/server"
import { cloudflareContextLoader } from "../server/loader.cloudflare.ts"

export const onRequest = createPagesFunctionHandler({
  build,
  getLoadContext: cloudflareContextLoader,
})
