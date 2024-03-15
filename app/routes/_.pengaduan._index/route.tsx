import type { MetaFunction } from "@remix-run/node"

import PageContainer from "#components/PageContainer.tsx"

import { renderCommonMetadata } from "../_/meta.ts"
import { PengaduanForm } from "./PengaduanForm.tsx"

export namespace page {
  export const title = "Pengaduan"
  export const ogTitle = "Form Pengaduan {{ desa_fullname }}"
  export const description =
    "Isi form untuk melaporkan pengaduan Anda ke {{ desa_fullname }}"
}

export const meta: MetaFunction = (args) => {
  return renderCommonMetadata(args, page)
}
export default function Pengaduan() {
  return (
    <PageContainer>
      <PengaduanForm />
    </PageContainer>
  )
}
