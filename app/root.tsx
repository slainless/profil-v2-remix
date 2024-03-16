import "@mantine/carousel/styles.css"
import { Box, Center, ColorSchemeScript, MantineProvider } from "@mantine/core"
import "@mantine/core/styles.css"
import "@mantine/notifications/styles.css"
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node"
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
  useRouteLoaderData,
} from "@remix-run/react"
import merge from "lodash.merge"
import "normalize.css"

import "#theme/artifact/mantine.css"
import "#theme/global.css"
import theme from "#theme/mantine.js"

import { ErrorSimple } from "#components/ErrorSimple.tsx"
import { ErrorWithStackTrace } from "#components/ErrorWithStackTrace.tsx"

import { getLocale } from "#locale/locale.ts"

import { hydrateServerEnv, pickClientEnv } from "#services/env.ts"
import { isNormalizedError } from "#services/response.ts"

import { Base } from "#modules/metadata.ts"
import { errMsg, errTitle } from "#modules/strings.ts"

import { assertCommonContext } from "#server/context.ts"

export function loader({ context }: LoaderFunctionArgs) {
  assertCommonContext(context)
  hydrateServerEnv(context.env)
  return {
    ...context,
    env: pickClientEnv(context.env),
  }
}

export const meta: MetaFunction<typeof loader> = () => {
  const standard = {
    title: "Digital Desa",
    description:
      "Situs resmi profil desa/kelurahan yang berada di bawah naungan PT Digital Desa Indonesia",
    generator: "Remix",
    "application-name": "Website Profil Digides",
    creator: "Tim Digital Desa Indonesia",
  }

  const image = {
    "og:image:alt": "Logo Digital Desa",
    "og:image:url":
      "https://digitaldesa.id/templates/homepage/media/misc/favicon/digides.png",
  }

  return [
    ...Base.standard(standard),
    ...Base.openGraph({
      "og:type": "website",
      "og:title": standard.title,
      "og:description": standard.description,
      "og:locale": "ID",
      "og:site_name": standard.title,
      "og:url": "https://profil.digitaldesa.id",
      image: [image],
    }),
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "OnlineBusiness",
        "@id": "https://profil.digitaldesa.id",
        name: standard.title,
        alternateName: "DIGIDES",
        legalName: "PT Digital Desa Indonesia",
        description: "Bangun Indonesia dari desa",
        logo: image["og:image:url"],
        url: "https://digitaldesa.id",
        sameAs: [
          "https://www.facebook.com/digitaldesa.id",
          "https://www.instagram.com/digitaldesa.id",
          "https://twitter.com/digitaldesa",
          "https://www.youtube.com/@digitaldesa-digides",
          "https://www.tiktok.com/@digitaldesa",
          "https://www.linkedin.com/company/digitaldesa",
        ],
        address: {
          "@type": "PostalAddress",
          streetAddress:
            "Ruko Bisnis I-Walk J/10 Lantai 1, Ciputra CitraLand Celebes, Jl. Tun Abdul Razak, Tombolo, Kec. Somba Opu",
          addressLocality: "Kabupaten Gowa",
          addressRegion: "Sulawesi Selatan",
          postalCode: "92114",
          addressCountry: "ID",
        },
        contactPoint: {
          "@type": "ContactPoint",
          email: "official@digitaldesa.id",
          telephone: "+62-811-444-8585",
        },
        foundingDate: "2020-01-01",
      },
    },
  ]
}

export function Layout({ children }: { children: React.ReactNode }) {
  const data = useRouteLoaderData<typeof loader>("root")
  const finalTheme = merge({}, theme)
  if (data && data.profile.primaryPalette.length === 10)
    finalTheme.colors["primary"] = data.profile.primaryPalette

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit&display=swap"
          rel="stylesheet"
        />
        <Meta />
        <Links />
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider
          // @ts-expect-error mismatching color type
          theme={finalTheme}
        >
          {children}
        </MantineProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  return <Outlet />
}

const mainUrl = "https://profil.digitaldesa.id"
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const wrap = (children: any) => (
  <Center mih="100vh">
    <Box maw="85%">{children}</Box>
  </Center>
)
export function ErrorBoundary() {
  const locale = getLocale("ID")
  const error = useRouteError()

  if (isRouteErrorResponse(error)) {
    try {
      const err = JSON.parse(error.data)
      if (isNormalizedError(err) == false) throw null
      switch (error.status) {
        case 404:
          return wrap(
            <ErrorSimple
              mainUrl={mainUrl}
              title={locale[errTitle(err.code)]}
              message={locale[errMsg(err.code)]}
              icon={404}
            />,
          )
        default:
          return wrap(
            <ErrorSimple
              mainUrl={mainUrl}
              title={locale[errTitle(err.code)]}
              message={locale[errMsg(err.code)]}
              icon={500}
            />,
          )
      }
    } catch {
      switch (error.status) {
        case 404:
          return wrap(<ErrorSimple icon={404} mainUrl={mainUrl} />)
        default:
          return wrap(
            <ErrorSimple
              mainUrl={mainUrl}
              title={`Status: ${error.status}`}
              message={
                typeof error.data == "string"
                  ? error.data
                  : JSON.stringify(error.data)
              }
            />,
          )
      }
    }
  } else if (error instanceof Error) {
    return wrap(
      <ErrorWithStackTrace stackTrace={error.stack} message={error.message} />,
    )
  }

  return wrap(<ErrorWithStackTrace message="Unknown error" />)
}
