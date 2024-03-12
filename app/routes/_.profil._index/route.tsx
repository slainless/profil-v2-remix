import { Stack, Box } from "@mantine/core"
import type { MetaFunction } from "@remix-run/node"

import PageContainer from "Components/PageContainer.tsx"
import PemdesStructure from "Components/Profile/PemdesStructure.tsx"
import PetaLokasi from "Components/Profile/PetaLokasi.tsx"
import SejarahDesa from "Components/Profile/SejarahDesa.tsx"
import VisiMisi from "Components/Profile/VisiMisi.tsx"

import { ProfileLoader } from "Providers/desa-profile.ts"

import { renderCommonMetadata } from "../_/meta.ts"

export namespace page {
  export const title = "Profil"
  export const ogTitle = "Profil {{ desa_fullname }}"
  export const description =
    // TODO: desa_alias here should be lowercased
    "Informasi profil, sejarah, visi dan misi, batas-batas {{ desa_alias }}, dan struktur pemerintahan {{ desa_fullname }}"
}

export const meta: MetaFunction = (args) => {
  return renderCommonMetadata(args, page)
}

export default function Profile() {
  return (
    <PageContainer>
      <ProfileLoader />
      <Stack gap={100}>
        <VisiMisi />
        <Box mt={{ base: -83, sm: 0 }}>
          <PemdesStructure />
        </Box>
        <Box mt={{ base: -83, sm: 0 }}>
          <SejarahDesa />
        </Box>
        <Box mt={{ base: -65, sm: 0 }}>
          <PetaLokasi />
        </Box>
      </Stack>
    </PageContainer>
  )
}
