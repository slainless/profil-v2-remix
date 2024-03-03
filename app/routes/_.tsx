import { MantineProvider } from "@mantine/core"
import type { LoaderFunctionArgs } from "@remix-run/node"
import type { PropsWithChildren } from "react"

import { JotaiGlobalStore } from "Providers/store.ts"

export async function loader({ context }: LoaderFunctionArgs) {
  if (context.schema == null) throw new Response(null, { status: 404 })
  return null
}

export function Layout({ children }: PropsWithChildren) {
  return (
    <MantineProvider>
      <JotaiGlobalStore>{children}</JotaiGlobalStore>
    </MantineProvider>
  )
}
