import { ColorSchemeScript } from "@mantine/core"
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node"
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react"

import { Base, title } from "Modules/metadata.ts"

export function loader({ request }: LoaderFunctionArgs) {
  return {
    path: request.url,
  }
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
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
    title(standard.title),
    ...Base.standard(standard),
    ...Base.openGraph({
      "og:type": "website",
      "og:title": standard.title,
      "og:description": standard.description,
      "og:locale": "ID",
      "og:site_name": standard.title,
      "og:url": data?.path,
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
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  return <Outlet />
}
