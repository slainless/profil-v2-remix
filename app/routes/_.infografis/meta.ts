import type { MetaArgs } from "@remix-run/node"

import { getLocale } from "Locale/locale.ts"

import { mustGetRootLayoutData } from "../_/data.ts"
import { createTitle, createDescription } from "../_/meta-utils.ts"
import {
  createMetadata,
  renderDescription,
  renderMetadata as renderMeta,
  renderTitle,
} from "../_/meta.ts"
import { tabMapping } from "./Tabs.mapping.ts"

export function renderMetadata(
  args: MetaArgs,
  tabKey: keyof typeof tabMapping,
) {
  const data = mustGetRootLayoutData(args.matches)
  const locale = getLocale("ID")
  const tab = tabMapping[tabKey]

  const title = createTitle(locale, data.profile, tab.title, tab.ogTitle)
  const description = createDescription(
    locale,
    data.profile,
    `Menampilkan data: ${tab.title} {{ desa_fullname }}, melalui penyajian data secara visual dan informatif`,
  )
  const metadata = createMetadata(locale, data)

  return [
    ...renderTitle(title),
    ...renderDescription(description),
    ...renderMeta(metadata),
  ]
}
