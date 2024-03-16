import { AppShell, Box } from "@mantine/core"
import { Notifications } from "@mantine/notifications"
import type { MetaFunction } from "@remix-run/node"
import {
  Outlet,
  isRouteErrorResponse,
  useRouteError,
  useRouteLoaderData,
} from "@remix-run/react"
import "lightgallery/css/lg-thumbnail.css"
import "lightgallery/css/lg-zoom.css"
import "lightgallery/css/lightgallery.css"
import { Fragment } from "react"

import { ErrorSimple } from "#components/ErrorSimple.tsx"
import { ErrorWithStackTrace } from "#components/ErrorWithStackTrace.tsx"
import AppFooter from "#components/MainLayouts/Footer.tsx"
import AppHeader from "#components/MainLayouts/Header.tsx"
import PageContainer from "#components/PageContainer.tsx"
import { PageLoadingBar } from "#components/PageLoadingBar.tsx"
import Pengaduan from "#components/Pengaduan.tsx"
import VisitorCounter from "#components/VisitorCounter.tsx"

import { ProfileHydrator } from "#providers/profile.ts"
import { JotaiGlobalStore, globalStore } from "#providers/store.ts"
import { UrqlProvider } from "#providers/urql.ts"

import { getLocale } from "#locale/locale.ts"

import EnvHydrator, { assetBaseUrlAtom } from "#services/env.js"

import type { loader } from "../../root.tsx"
import { mustGetRootLayoutData } from "./data.ts"
import {
  createMetadata,
  renderMetadata,
  createTitle,
  createDescription,
  renderTitle,
  renderDescription,
  renderGovernmentRichData,
} from "./meta.ts"

export const meta: MetaFunction = ({ matches }) => {
  console.log(globalStore.get(assetBaseUrlAtom), "fuck")
  const data = mustGetRootLayoutData(matches)
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
  const data = useRouteLoaderData<typeof loader>("root")!
  return (
    <JotaiGlobalStore key="store">
      <Fragment key="hydrator" /* === Hydrator === */>
        <ProfileHydrator
          profile={data.profile}
          schema={data.schema}
          subdomain={data.slug}
          baseDomain={data.baseDomain}
        />
        <EnvHydrator env={data.env} />
      </Fragment>

      <Fragment key="other" /* === Other === */>
        <Notifications />
        <PageLoadingBar />
      </Fragment>

      <UrqlProvider
        key="urql-provider"
        schema={data.schema}
        endpoint={import.meta.env.VITE_GRAPHQL_ENDPOINT}
        token={data.token}
      >
        <AppShell
          key="app-shell"
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

          <Fragment key="floater">
            <Pengaduan />
            <VisitorCounter />
          </Fragment>
        </AppShell>
      </UrqlProvider>
    </JotaiGlobalStore>
  )
}

export function ErrorBoundary() {
  const data = useRouteLoaderData<typeof loader>("root")!
  const error = useRouteError()
  return (
    <JotaiGlobalStore key="store">
      <Fragment key="hydrator" /* === Hydrator === */>
        <ProfileHydrator
          profile={data.profile}
          schema={data.schema}
          subdomain={data.slug}
          baseDomain={data.baseDomain}
        />
      </Fragment>

      <Fragment key="other" /* === Other === */>
        <Notifications />
        <PageLoadingBar />
      </Fragment>

      <UrqlProvider
        key="urql-provider"
        schema={data.schema}
        endpoint={import.meta.env.VITE_GRAPHQL_ENDPOINT}
        token={data.token}
      >
        <AppShell
          key="app-shell"
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
          <AppHeader forceNonTransparent />
          <Box>
            <PageContainer>
              {(() => {
                const mainUrl = new URL(data.url)
                mainUrl.pathname = ""
                mainUrl.search = ""
                mainUrl.hash = ""
                if (isRouteErrorResponse(error)) {
                  switch (error.status) {
                    case 404:
                      return <ErrorSimple mainUrl={mainUrl.href} icon={404} />
                    default:
                      return (
                        <ErrorSimple
                          icon={500}
                          mainUrl={mainUrl.href}
                          title="Terjadi Kesalahan"
                          message="Maaf, terjadi gangguan saat mengakses halaman, mohon untuk membuka ulang halaman. Jika masalah terus berlanjut, silakan teruskan pesan ini ke aparat desa/kelurahan atau laporkan ke pelayanan DIGIDES"
                        />
                      )
                  }
                } else if (error instanceof Error) {
                  return (
                    <ErrorWithStackTrace
                      message={error.message}
                      stackTrace={error.stack}
                    />
                  )
                }

                return <ErrorWithStackTrace message="unknown error" />
              })()}
            </PageContainer>
          </Box>
          <AppFooter />

          <Fragment key="floater"></Fragment>
        </AppShell>
      </UrqlProvider>

      <Fragment key="scripts">
        <script async src="/accessibility.bundle.js" />
        <script async src="/accessibility.config.js" />
      </Fragment>
    </JotaiGlobalStore>
  )
}
