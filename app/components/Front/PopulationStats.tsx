"use client"

import {
  Box,
  Stack,
  Title,
  Text,
  Grid,
  SimpleGrid,
  Space,
  Image,
} from "@mantine/core"
import { Fragment, useMemo } from "react"
import { useQuery } from "urql"

import { vars } from "#theme/artifact/vars.mjs"

import kk from "#assets/kepala-keluarga.png"
import laki from "#assets/laki.png"
import mutasi from "#assets/mutasi-penduduk.png"
import sementara from "#assets/penduduk-sementara.png"
import perempuan from "#assets/perempuan.png"
import total from "#assets/total-penduduk.png"

import { populationSummaryQuery } from "#queries/stats.ts"

import { FormattedNumber } from "#modules/intl.ts"

const int = (v: number | null | undefined) => (v == null ? 0 : v)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const stat = (k: string, v: number | null | undefined, image: any) => ({
  name: k,
  value: int(v),
  image,
})

function PopulationStats() {
  const [{ data }] = useQuery({ query: populationSummaryQuery })

  const selectedStats = useMemo(() => {
    const stats = data?.summary
    const mutationOut =
      stats?.mutationOut == null || stats.mutationOut.length == 0
        ? [{ value: 0 }]
        : stats.mutationOut
    return [
      stat(
        "Penduduk",
        int(stats?.total) -
          int(mutationOut.map((v) => v.value).reduce((a, b) => a + b)),
        total,
      ),
      stat("Laki-Laki", stats?.male, laki),
      stat(
        "Kepala Keluarga",
        stats?.statusInFamily.find((v) => v.name == "Kepala Keluarga")?.value,
        kk,
      ),
      stat("Perempuan", stats?.female, perempuan),
      stat("Penduduk Sementara", stats?.temporary, sementara),
      stat("Mutasi Penduduk", stats?.mutation, mutasi),
    ]
  }, [data])

  return (
    <Stack gap={30}>
      <Box>
        <Title
          fz={{ base: 20, sm: 44 }}
          ta={{ base: "center", sm: "start", md: "start" }}
          c={vars("color-primary-5")}
        >
          Administrasi Penduduk
        </Title>

        <Text
          fz={{ base: "md", sm: 20 }}
          ta={{
            base: "center",
            sm: "start",
            md: "start",
          }}
          visibleFrom="sm"
        >
          Sistem digital yang berfungsi mempermudah pengelolaan data dan
          informasi terkait dengan kependudukan dan pendayagunaannya untuk
          pelayanan publik yang efektif dan efisien
        </Text>
        <Text
          fz={{ base: "md", sm: 20 }}
          ta={{
            base: "center",
            sm: "start",
            md: "start",
          }}
          hiddenFrom="sm"
        >
          Efisiensi pengelolaan data dan informasi kependudukan yang lebih
          efektif.
        </Text>
        <Space h={"md"} />

        {/* Mobile */}
        <SimpleGrid ta={"center"} cols={3} hiddenFrom="sm">
          {selectedStats.map((item, index) => {
            return (
              <Fragment key={index}>
                <StatsItem {...item} />
              </Fragment>
            )
          })}
        </SimpleGrid>
        {/* End Mobile */}
      </Box>

      {/* Desktop */}
      <Grid grow style={{ overflow: "visible" }} visibleFrom="sm">
        {selectedStats.map((item, index) => {
          return (
            <Grid.Col span={6} key={index}>
              <StatsItem {...item} />
            </Grid.Col>
          )
        })}
      </Grid>
      {/* End Desktop */}
    </Stack>
  )
}

type StatsItemProps = {
  name: string
  value: number
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image?: any
}

function StatsItem({ name, value, image }: StatsItemProps) {
  const number = isNaN(value) ? 0 : value
  const formated = FormattedNumber.format(number)
  return (
    <>
      {/* Mobile */}
      <Stack align="center" gap={3} hiddenFrom="sm">
        <Image width={50} src={image} alt="other" />
        <Title fz={20}>{formated}</Title>
        <Text lh={1} fz={14}>
          {name}
        </Text>
      </Stack>
      {/* End Mobile */}

      {/* Desktop */}
      <Grid
        visibleFrom="sm"
        grow
        align="center"
        gutter={1}
        style={{ boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.1)" }}
      >
        <Grid.Col p={0} span={5}>
          <Box
            bg={`linear-gradient(163deg, ${vars("color-primary-5")}, ${vars(
              "color-primary-2",
            )})`}
          >
            <Text c="#fff" fz={44} ta="center" fw={800}>
              {formated}
            </Text>
          </Box>
        </Grid.Col>
        <Grid.Col p={0} span={7}>
          <Box
            style={{
              display: "block",
            }}
          >
            <Text c="#5A5E62" fz={26} fw={800} ta="center">
              {name}
            </Text>
          </Box>
        </Grid.Col>
      </Grid>
      {/* End Desktop */}
    </>
  )
}

export default PopulationStats
