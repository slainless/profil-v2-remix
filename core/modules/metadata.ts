/* eslint-disable @typescript-eslint/no-explicit-any */
import type { MetaDescriptor } from "@remix-run/node"
import type {
  BreadcrumbList,
  GovernmentOrganization,
  ItemList,
  Thing,
  WebPage,
  WebSite,
  WithContext,
} from "schema-dts"

/* eslint-disable @typescript-eslint/no-unused-vars */
export const title = (string: string) => ({ title: string }) as const

export const metadata = (name: string, content: string) =>
  ({ name, content }) as const
export const metadatas = (name: string, contents?: string[]) =>
  contents?.map((content) => ({ name, content }) as const) ?? []

type LinkRel =
  | "alternate"
  | "author"
  | "canonical"
  | "help"
  | "license"
  | "manifest"
  | "me"
  | "next"
  | "prev"
  | "privacy-policy"
  | "search"
  | "terms-of-service"
  | "dns-prefetch"
  | "icon"
  | "modulepreload"
  | "pingback"
  | "preconnect"
  | "prefetch"
  | "preload"
  | "prerender"
  | "stylesheet"
export const link = (
  rel: LinkRel,
  href: string,
  others?: Record<string, string>,
) => ({
  tagName: "link",
  rel,
  href,
  ...others,
})

export const richData = (data: WithContext<Thing>) => ({
  "script:ld+json": data,
})
type RichData<T extends Thing> = (data: WithContext<T>) => {
  "script:ld+json": WithContext<T>
}
export const webSite = richData as any as RichData<WebSite>
export const breadcrumb = richData as any as RichData<BreadcrumbList>
export const itemList = richData as any as RichData<ItemList>
export const governmentOrganization =
  richData as any as RichData<GovernmentOrganization>
export const webPage = richData as any as RichData<WebPage>

const createMeta =
  <T extends string, C extends string>(name: T, constraint: readonly C[]) =>
  (content: C) =>
    metadata(name, content)
export type RobotRules =
  | "all"
  | "follow"
  | "index"
  | "noindex"
  | "nofollow"
  | "none"
  | "noarchive"
  | "nositelinkssearchbox"
  | "nosnippet"
  | "nocache"
  | "indexifembedded"
  | `max-snippet:${number}`
  | `max-image-preview:${"none" | "standard" | "large"}`
  | `max-video-preview:${0 | -1}`
  | "notranslate"
  | "noimageindex"
  | `unavailable_after: ${string}`
export const robots = (rules: RobotRules[]) => ({
  name: "robots",
  content: rules.join(", "),
})
export const googlebot = (rules: RobotRules[]) => ({
  name: "googlebot",
  contet: rules.join(", "),
})
export const referrer = createMeta("referrer", [
  "no-referrer",
  "origin",
  "no-referrer-when-downgrade",
  "origin-when-cross-origin",
  "same-origin",
  "strict-origin",
  "strict-origin-when-cross-origin",
  "unsafe-URL",
])
export const themeColor = (color: string, media: string) => ({
  name: "theme-color",
  content: color,
  media,
})
export const colorScheme = createMeta("color-scheme", [
  "normal",
  "dark light",
  "light dark",
  "only light",
])

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const create: any = (props: Record<string, string>) =>
  Object.entries(props).map(([name, content]) => ({ name, content }))
type Create<T> = (p: T) => MetaDescriptor[]

namespace OpenGraph {
  interface Media {
    url: string
    type: string
    width: number
    height: number
    alt: string
  }

  export type Image = Prefix<Media, "og:image">
  export type Video = Prefix<Media, "og:video">
  export type Audio = Prefix<Pick<Media, "url" | "type">, "og:audio">

  export type BaseGraph = Prefix<
    {
      title: string
      type: string
      url: string
      description: string
      determiner: string
      locale: string
      "locale:alternate": string[]
      site_name: string
    },
    "og"
  > & {
    image: Partial<Image>[]
    video: Partial<Video>[]
    audio: Partial<Audio>[]
  }

  type Article = Prefix<
    {
      published_time: string
      modified_time: string
      expiration_time: string
      author: string[] /** URL to author's document, such as http://www.facebook.com/user */
      section: string
      tag: string[]
    },
    "article"
  >

  type Profile = Prefix<
    {
      first_name: string
      last_name: string
      username: string
      gender: "male" | "female"
    },
    "profile"
  >

  export interface WebsiteGraph extends Partial<BaseGraph> {
    "og:type": "website"
  }
  export interface ArticleGraph extends Partial<BaseGraph>, Partial<Article> {
    "og:type": "article"
  }
  export interface ProfileGraph extends Partial<BaseGraph>, Partial<Profile> {
    "og:type": "profile"
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const createMedia = (media?: any[]) => media?.flatMap(create) ?? []
  export const createGraph = ({
    image,
    video,
    audio,
    "og:locale:alternate": localeAlternate,
    // @ts-expect-error ...
    "article:author": articleAuthor,
    // @ts-expect-error ...
    "article:tag": articleTag,
    ...rest
  }: WebsiteGraph | ArticleGraph | ProfileGraph) => {
    return [
      ...metadatas("og:locale:alternate", localeAlternate),
      ...metadatas("article:author", articleAuthor),
      ...metadatas("article:tag", articleTag),
      ...create(rest),
      ...createMedia(image),
      ...createMedia(audio),
      ...createMedia(video),
    ]
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Prefix<T extends Record<string, any>, P extends string> = {
  [K in keyof T as K extends string ? `${P}:${K}` : never]: T[K]
}
export namespace Base {
  export interface Standard {
    "application-name": string
    author: string
    title: string
    robots: RobotRules[]
    generator: string
    description: string
    referrer: Parameters<typeof referrer>[0]
    "color-scheme": Parameters<typeof colorScheme>[0]
    creator: string
    publisher: string
  }
  export const standard: Create<Partial<Standard>> = ({
    robots: rbt,
    title: ttl,
    ...props
  }) => [
    ...(rbt ? [robots(rbt)] : []),
    ...(ttl ? [title(ttl)] : []),
    ...create(props),
  ]

  export type WebsiteGraph = OpenGraph.WebsiteGraph
  export type ArticleGraph = OpenGraph.ArticleGraph
  export type ProfileGraph = OpenGraph.ProfileGraph
  export const openGraph = OpenGraph.createGraph
}
