import { AppShell, Box } from "@mantine/core"
import { Notifications } from "@mantine/notifications"
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node"
import {
  Outlet,
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
  useRouteLoaderData,
} from "@remix-run/react"
import "lightgallery/css/lg-thumbnail.css"
import "lightgallery/css/lg-zoom.css"
import "lightgallery/css/lightgallery.css"
import { Fragment } from "react"

import { ErrorSimple } from "Components/ErrorSimple.tsx"
import { ErrorWithStackTrace } from "Components/ErrorWithStackTrace.tsx"
import AppFooter from "Components/MainLayouts/Footer.tsx"
import AppHeader from "Components/MainLayouts/Header.tsx"
import PageContainer from "Components/PageContainer.tsx"
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
    <JotaiGlobalStore key="store">
      <Fragment key="hydrator" /* === Hydrator === */>
        <ProfileHydrator
          profile={data.profile}
          schema={data.schema}
          subdomain={data.subdomain}
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

export function ErrorBoundary() {
  const data = useRouteLoaderData<typeof loader>("root")!
  const error = useRouteError()
  return (
    <JotaiGlobalStore key="store">
      <Fragment key="hydrator" /* === Hydrator === */>
        <ProfileHydrator
          profile={data.profile}
          schema={data.schema}
          subdomain={data.subdomain}
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
        </AppShell>
      </UrqlProvider>
    </JotaiGlobalStore>
  )
}
