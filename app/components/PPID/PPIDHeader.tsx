import { Grid, Stack, Title, Group, Button, Text, GridCol } from "@mantine/core"
import { Link } from "@remix-run/react"

import { vars } from "Theme/artifact/vars.mjs"

import berkalaImage from "Assets/informasi-secara-berkala.png"
import mertaImage from "Assets/informasi-serta-merta.png"
import saatImage from "Assets/informasi-setiap-saat.png"

import { PPIDNavigationCard } from "./PPIDNavigationCard.tsx"

export const PPIDHeader = () => {
  return (
    <Grid justify="center" align="center" gutter={70} grow visibleFrom="sm">
      <GridCol span={6}>
        <Stack>
          <Title
            fz={{ base: 20, sm: 44 }}
            ta={{ base: "center", sm: "start", md: "start" }}
            c={vars("color-primary-4")}
          >
            PPID
          </Title>
          <Text
            fz={{ base: "md", sm: 20 }}
            ta={{
              base: "center",
              sm: "start",
              md: "start",
            }}
          >
            Pejabat Pengelola Informasi dan Dokumentasi (PPID) adalah pejabat
            yang bertanggung jawab di bidang penyimpanan, pendokumentasian,
            penyediaan, dan/atau pelayanan informasi di badan publik.
          </Text>
          <Group justify="space-between">
            <Button
              variant="outline"
              color={vars("color-primary-4")}
              c={vars("color-black")}
              size="lg"
              bg={"white"}
              component={Link}
              to="/ppid/dasar-hukum"
            >
              Dasar Hukum PPID
            </Button>
            {/* <Button
              variant="outline"
              color="#398B7D"
              size="lg"
              c={"black"}
              bg={"white"}
            >
              PPID Pelaksana
            </Button> */}
          </Group>
        </Stack>
      </GridCol>
      <GridCol span={6}>
        <Grid>
          <GridCol span={4}>
            <PPIDNavigationCard
              href="/ppid/berkala"
              imageSrc={berkalaImage}
              title="INFORMASI SECARA BERKALA"
            />
          </GridCol>
          <GridCol span={4}>
            <PPIDNavigationCard
              href="/ppid/serta-merta"
              imageSrc={mertaImage}
              title="INFORMASI SERTA MERTA"
            />
          </GridCol>
          <GridCol span={4}>
            <PPIDNavigationCard
              href="/ppid/setiap-saat"
              imageSrc={saatImage}
              title="INFORMASI SETIAP SAAT"
            />
          </GridCol>
        </Grid>
      </GridCol>
    </Grid>
  )
}
