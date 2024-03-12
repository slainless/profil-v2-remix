import type { LoaderFunctionArgs } from "@remix-run/node"
import { Outlet } from "@remix-run/react"

import { stripURL } from "Modules/url.ts"

import { Tabs, Header } from "./Header.tsx"
import { Layout } from "./Layout.tsx"

export function loader({ request }: LoaderFunctionArgs) {
  const baseUrl = stripURL(request.url)
  const tab = baseUrl.split("/").pop()
  return {
    tab,
    baseUrl,
  }
}

export default function Infography() {
  // const data = useLoaderData<typeof loader>()
  // const { tab } = data
  // const location = useLocation()
  // const locationTab = useMemo(
  //   () => location.pathname.split("/").pop(),
  //   [location],
  // )
  // const finalTab =
  //   locationTab == null || locationTab === tab ? tab : locationTab
  return (
    <Layout.Root>
      {/* <TabHydrator currentTab={data.tab!} /> */}
      <Tabs>
        <Header />
        <Outlet />
      </Tabs>
    </Layout.Root>
  )
}
