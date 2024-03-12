import type { MetaFunction } from "@remix-run/node"

import { PPIDCategoryPageView } from "Components/PPID/PPIDCategoryPageView.tsx"
import PageContainer from "Components/PageContainer.tsx"

import { PpidType } from "GraphQL/graphql.ts"

import { renderCommonMetadata } from "../_/meta.ts"

namespace page {
  export const title = `Informasi Publik Secara Berkala`
  export const ogTitle = `Informasi Publik Secara Berkala {{ desa_fullname }}`
  export const description = `Informasi yang wajib disediakan dan diumumkan secara berkala oleh {{ desa_fullname }}`
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
