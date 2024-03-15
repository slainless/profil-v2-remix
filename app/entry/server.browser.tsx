/**
 * By default, Remix will handle generating the HTTP Response for you. You are
 * free to delete this file if you'd like to, but if you ever want it revealed
 * again, you can run `npx remix reveal` ✨ For more information, see
 * https://remix.run/file-conventions/entry.server
 */
import { RemixServer } from "@remix-run/react"
import { isbot } from "isbot"
import * as ReactDOM from "react-dom/server"

import type { Handler } from "../entry.server.tsx"

export const handleCloudflareRequest: Handler = async (
  request,
  responseStatusCode,
  responseHeaders,
  remixContext,
  // This is ignored so we can keep it in the template for visibility.  Feel
  // free to delete this parameter in your app if you're not using it!
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  loadContext,
) => {
  const body = await ReactDOM.renderToReadableStream(
    <RemixServer context={remixContext} url={request.url} />,
    {
      signal: request.signal,
      onError(error: unknown) {
        // Log streaming rendering errors from inside the shell
        console.error(error)
        responseStatusCode = 500
      },
    },
  )

  if (isbot(request.headers.get("user-agent") || "")) {
    await body.allReady
  }

  responseHeaders.set("Content-Type", "text/html")
  return new Response(body, {
    headers: responseHeaders,
    status: responseStatusCode,
  })
}

export default handleCloudflareRequest
