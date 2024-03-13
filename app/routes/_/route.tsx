import { AppShell, Box } from "@mantine/core"
import { Notifications } from "@mantine/notifications"
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node"
import { Outlet, useLoaderData } from "@remix-run/react"
import "lightgallery/css/lg-thumbnail.css"
import "lightgallery/css/lg-zoom.css"
import "lightgallery/css/lightgallery.css"
import { Fragment } from "react"

import AppFooter from "Components/MainLayouts/Footer.tsx"
import AppHeader from "Components/MainLayouts/Header.tsx"
import { PageLoadingBar } from "Components/PageLoadingBar.tsx"

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
  if (data == null) return []
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
  return (
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
        <PageLoadingBar />
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
  )
}
