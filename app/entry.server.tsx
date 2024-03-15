/**
 * By default, Remix will handle generating the HTTP Response for you. You are
 * free to delete this file if you'd like to, but if you ever want it revealed
 * again, you can run `npx remix reveal` ✨ For more information, see
 * https://remix.run/file-conventions/entry.server
 */
import handler from "#entry.server"
import type { AppLoadContext, EntryContext } from "@remix-run/node"

export type Handler = (
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
  // This is ignored so we can keep it in the template for visibility.  Feel
  // free to delete this parameter in your app if you're not using it!
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  loadContext: AppLoadContext,
) => Promise<unknown>

export default async function handleRequest(...args: Parameters<Handler>) {
  return handler(...args)
}
