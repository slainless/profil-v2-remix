import { Stack, Title, Card, List, ListItem, Text } from "@mantine/core"
import type { MetaFunction } from "@remix-run/node"

import { vars } from "Theme/artifact/vars.mjs"

import PageContainer from "Components/PageContainer.tsx"

import { page as parentPage } from "../_.ppid._index/meta.ts"
import { renderCommonMetadata } from "../_/meta.ts"

export namespace page {
  export const title = `Dasar Hukum`
  export const ogTitle = `Dasar Hukum {{= it.desa }}`
  export const description = parentPage.description
}

export const meta: MetaFunction = (args) => {
  return renderCommonMetadata(args, page)
}

export default function PPIDDasarHukum() {
  return (
    <PageContainer>
      <Stack gap={50}>
        <Stack gap={0}>
          <Title
            fz={{ base: 20, sm: 44 }}
            style={{ color: vars("color-primary-4") }}
          >
            DASAR HUKUM
          </Title>
          <Text fz={{ base: "md", sm: 20 }}>
            Yang mendasari pembentukan PPID
          </Text>
        </Stack>
        <Card
          radius={"sm"}
          shadow="sm"
          p={{ sm: "xl" }}
          mt={{ base: -30, sm: 0 }}
        >
          <Stack>
            <Title fz={{ base: 14, sm: 34 }} c={"#398B7D"}>
              Undang Undang Republik Indonesia
            </Title>
            <List type="ordered" fz={{ base: 14, sm: 20 }} withPadding>
              <ListItem>
                Undang-Undang Nomor 14 Tahun 2008 tentang Keterbukaan Informasi
                Publik
              </ListItem>
              <ListItem>
                Undang-Undang Nomor 25 Tahun 2009 tentang Pelayanan Publik
              </ListItem>
              <ListItem>Undang-Undang Nomor 6 Tahun 2014 tentang Desa</ListItem>
            </List>
            <Title fz={{ base: 14, sm: 34 }} c={"#398B7D"}>
              Peraturan Pemerintah
            </Title>
            <List type="ordered" fz={{ base: 14, sm: 20 }} withPadding>
              <ListItem>
                Peraturan Pemerintah Nomor 61 Tahun 2010 Tentang Pelaksanaan
                Undang-Undang Nomor 14 Tahun 2008 tentang Keterbukaan Informasi
                Publik
              </ListItem>
            </List>
            <Title fz={{ base: 14, sm: 34 }} c={"#398B7D"}>
              Peraturan Komisi Informasi
            </Title>
            <List type="ordered" fz={{ base: 14, sm: 20 }} withPadding>
              <ListItem>
                Peraturan Komisi Informasi Pusat Republik Indonesia Nomor 1
                Tahun 2010 tentang Standar Layanan Informasi Publik
              </ListItem>
              <ListItem>
                Peraturan Komisi Informasi Pusat Republik Indonesia Nomor 1
                Tahun 2013 tentang Prosedur Penyelesaian Sengketa Informasi
                Publik
              </ListItem>
              <ListItem>
                Peraturan Komisi Informasi Pusat Republik Indonesia Nomor 1
                Tahun 2017 tentang Pengklasifikasian Informasi Publik
              </ListItem>
              <ListItem>
                Peraturan Komisi Informasi Pusat Republik Indonesia Nomor 1
                Tahun 2018 tentang Standar Layanan Informasi Publik Desa
              </ListItem>
              <ListItem>
                Peraturan Komisi Informasi Pusat Republik Indonesia Nomor 1
                Tahun 2021 tentang Standar Layanan Informasi Publik
              </ListItem>
            </List>
            <Title fz={{ base: 14, sm: 34 }} c={"#398B7D"}>
              Peraturan Mentri Dalam Negri
            </Title>
            <List type="ordered" fz={{ base: 14, sm: 20 }} withPadding>
              <ListItem>
                Peraturan Pemerintah Nomor 61 Tahun 2010 Tentang Pelaksanaan
                Undang-Undang Nomor 14 Tahun 2008 tentang Keterbukaan Informasi
                Publik
              </ListItem>
            </List>
          </Stack>
        </Card>
      </Stack>
    </PageContainer>
  )
}
