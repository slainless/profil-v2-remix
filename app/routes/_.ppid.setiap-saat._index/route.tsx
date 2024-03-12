import type { MetaFunction } from "@remix-run/node"

import { PPIDCategoryPageView } from "Components/PPID/PPIDCategoryPageView.tsx"
import PageContainer from "Components/PageContainer.tsx"

import { PpidType } from "GraphQL/graphql.ts"

import { renderCommonMetadata } from "../_/meta.ts"

namespace page {
  export const title = `Informasi Setiap Saat`
  export const ogTitle = `Informasi Setiap Saat {{ desa_fullname }}`
  export const description = `Informasi yang wajib disediakan oleh Badan Publik {{ desa_fullname }}`
}

export const meta: MetaFunction = (args) => {
  return renderCommonMetadata(args, page)
}

export default function PPIDSertaMerta() {
  return (
    <PageContainer>
      <PPIDCategoryPageView
        title="Informasi Setiap Saat"
        subtitle="Informasi yang wajib disediakan oleh Badan Publik."
        type={PpidType.Setiapsaat}
      />
    </PageContainer>
  )
}
