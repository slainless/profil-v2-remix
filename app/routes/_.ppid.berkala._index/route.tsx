import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node"

import { PPIDCategoryPageView } from "#components/PPID/PPIDCategoryPageView.tsx"
import PageContainer from "#components/PageContainer.tsx"

import { PpidType } from "#graphql/graphql.ts"

import { tick, TickType } from "#services/.server/visit.js"

import { assertCommonContext } from "#server/context.js"

import { renderCommonMetadata } from "../_/meta.ts"

namespace page {
  export const title = `Informasi Publik Secara Berkala`
  export const ogTitle = `Informasi Publik Secara Berkala {{ desa_fullname }}`
  export const description = `Informasi yang wajib disediakan dan diumumkan secara berkala oleh {{ desa_fullname }}`
}

export function loader({ context }: LoaderFunctionArgs) {
  assertCommonContext(context)
  tick(context.schema, TickType.GENERAL, "/ppid/berkala")
  return null
}

export const meta: MetaFunction = (args) => {
  return renderCommonMetadata(args, page)
}

export default function PPIDBerkala() {
  return (
    <PageContainer>
      <PPIDCategoryPageView
        title="Informasi Publik Secara Berkala"
        subtitle="Informasi yang wajib disediakan dan diumumkan secara berkala."
        type={PpidType.Berkala}
      />
    </PageContainer>
  )
}
