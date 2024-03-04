import { AppShell, Box, MantineProvider } from "@mantine/core"
import "@mantine/core/styles.css"
import { Notifications } from "@mantine/notifications"
import type { LoaderFunctionArgs } from "@remix-run/node"
import { Outlet, useLoaderData } from "@remix-run/react"
import merge from "lodash.merge"
import { Fragment } from "react"

import { theme } from "Theme/mantine.mjs"

import AppFooter from "Components/MainLayouts/Footer.tsx"
import AppHeader from "Components/MainLayouts/Header.tsx"

import { ProfileHydrator } from "Providers/profile.ts"
import { JotaiGlobalStore } from "Providers/store.ts"
import { UrqlProvider } from "Providers/urql.ts"

export async function loader({ context }: LoaderFunctionArgs) {
  if (context.schema == null)
    throw new Response("Client not found", { status: 404 })
  if (context.profileQuery[0] == null)
    throw new Response("No profile found", { status: 500 })
  return {
    profile: context.profileQuery[0],
    schema: context.schema,
    clientUrl: import.meta.env.VITE_GRAPHQL_ENDPOINT!,
    token: import.meta.env.VITE_GRAPHQL_ACCESS_WEBTOKEN!,
  }
}

export default function Layout() {
  const data = useLoaderData<typeof loader>()
  const finalTheme = merge({}, theme)
  if (data.profile.primaryPalette.length === 10)
    // @ts-expect-error ...
    finalTheme.colors["primary"] = data.profile.primaryPalette
  return (
    <MantineProvider theme={finalTheme}>
      <JotaiGlobalStore>
        <Fragment /* === Hydrator === */>
          <ProfileHydrator profile={data.profile} schema={data.schema} />
        </Fragment>

        <Fragment /* === Other === */>
          <Notifications />
        </Fragment>

        <UrqlProvider
          schema={data.schema}
          endpoint={data.clientUrl}
          token={data.token}
        >
          <AppShell
            padding={0}
            bg={"#F6F6F6"}
            styles={{
              root: {
                minHeight: "100vh",
                display: "grid",
                gridTemplateRows: "auto max-content",
                gridTemplateColumns: "100%",
              },
            }}
          >
            <AppHeader />
            <Box>
              <Outlet />
            </Box>
            <AppFooter />
          </AppShell>
        </UrqlProvider>
      </JotaiGlobalStore>
    </MantineProvider>
  )
}
