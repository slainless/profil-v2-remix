import { MantineProvider } from "@mantine/core"
import type { LoaderFunctionArgs } from "@remix-run/node"
import type { PropsWithChildren } from "react"

import { JotaiGlobalStore } from "Providers/store.ts"

// import { mustGetSchema } from "Services/tenancy.server.ts"

export async function loader({ request }: LoaderFunctionArgs) {
  // const schema = mustGetSchema(request)
  return null
}

export function Layout({ children }: PropsWithChildren) {
  return (
    <MantineProvider>
      <JotaiGlobalStore>{children}</JotaiGlobalStore>
    </MantineProvider>
  )
}
