import { Outlet, useMatches } from "@remix-run/react"

import { TabHydrator } from "Providers/infography.ts"

import { Tabs, Header } from "./Header.tsx"
import { Layout } from "./Layout.tsx"

export default function Infography() {
  const matches = useMatches()
  const tab = matches[matches.length - 1].pathname.split("/").pop()
  return (
    <Layout.Root>
      <TabHydrator currentTab={tab!} />
      <Tabs>
        <Header />
      </Tabs>
      <Outlet />
    </Layout.Root>
  )
}
