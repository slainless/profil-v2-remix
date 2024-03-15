"use client"

import { Group, Title, Text, Image, Grid } from "@mantine/core"

import { vars } from "#theme/artifact/vars.mjs"

import otherImage from "#assets/other-1.png"

const PopulationByYear = () => {
  return (
    <>
      <Grid align="center" visibleFrom="sm">
        <Grid.Col span={6}>
          <Title fz={44} order={1} c={vars("color-primary-4")}>
            DEMOGRAFI PENDUDUK
          </Title>
          <Text fz={20}>
            Memberikan informasi lengkap mengenai karakteristik demografi
            penduduk suatu wilayah. Mulai dari jumlah penduduk, usia, jenis
            kelamin, tingkat pendidikan, pekerjaan, agama, dan aspek penting
            lainnya yang menggambarkan komposisi populasi secara rinci.
          </Text>
        </Grid.Col>
        <Grid.Col span={6}>
          <Group justify="flex-end">
            <Image maw={500} src={otherImage} alt="Other" />
          </Group>
        </Grid.Col>
      </Grid>
    </>
  )
}

export default PopulationByYear
