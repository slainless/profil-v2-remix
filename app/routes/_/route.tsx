import "@mantine/carousel/styles.css"
import "@mantine/code-highlight/styles.css"
import { AppShell, Box, MantineProvider } from "@mantine/core"
import "@mantine/core/styles.css"
import { Notifications } from "@mantine/notifications"
import "@mantine/notifications/styles.css"
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node"
import { Outlet, useLoaderData } from "@remix-run/react"
import "lightgallery/css/lg-thumbnail.css"
import "lightgallery/css/lg-zoom.css"
import "lightgallery/css/lightgallery.css"
import merge from "lodash.merge"
import "normalize.css"
import { Fragment } from "react"
import invariant from "tiny-invariant"

import "Theme/artifact/mantine.css"
import "Theme/global.css"
import { theme } from "Theme/mantine.js"

import AppFooter from "Components/MainLayouts/Footer.tsx"
import AppHeader from "Components/MainLayouts/Header.tsx"

import { ProfileHydrator } from "Providers/profile.ts"
import { JotaiGlobalStore } from "Providers/store.ts"
import { UrqlProvider } from "Providers/urql.ts"

import { getLocale } from "Locale/locale.ts"

import { mustNormalizeContext } from "Services/.server/context.ts"

import {
  createMetadata,
  renderMetadata,
  createTitle,
  createDescription,
  renderTitle,
  renderDescription,
  renderGovernmentRichData,
} from "./meta.ts"

export async function loader({ context }: LoaderFunctionArgs) {
  return mustNormalizeContext(context)
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  invariant(data, "No profile found")
  const locale = getLocale("ID")

  const metadata = createMetadata(locale, data)
  const title = createTitle(locale, data.profile)
  const description = createDescription(locale, data.profile)

  return [
    ...renderTitle(title),
    ...renderDescription(description),
    ...renderMetadata(metadata),
    // webSite({
    //   "@context": "https://schema.org",
    //   "@type": "WebSite",
    //   "@id": canonUrl,
    //   name: title.pageTitle,
    //   url: canonUrl,
    //   alternateName: [
    //     metadata.publisher,
    //     `Website ${metadata.desa_fullname}`,
    //     metadata.desa_fullname,
    //   ],
    // }),
    ...renderGovernmentRichData(locale, data, metadata),
  ]
}

export default function Layout() {
  const data = useLoaderData<typeof loader>()
  const finalTheme = merge({}, theme)
  if (data.profile.primaryPalette.length === 10)
    finalTheme.colors["primary"] = data.profile.primaryPalette
  return (
    <MantineProvider
      // @ts-expect-error mismatching color type
      theme={finalTheme}
    >
      <JotaiGlobalStore>
        <Fragment /* === Hydrator === */>
          <ProfileHydrator
            profile={data.profile}
            schema={data.schema}
            subdomain={data.subdomain}
            baseDomain={data.baseDomain}
          />
        </Fragment>

        <Fragment /* === Other === */>
          <Notifications />
        </Fragment>

        <UrqlProvider
          schema={data.schema}
          endpoint={import.meta.env.VITE_GRAPHQL_ENDPOINT}
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
