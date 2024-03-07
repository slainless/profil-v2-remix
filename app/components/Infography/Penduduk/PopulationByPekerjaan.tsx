"use client"

import { Box, Grid, ScrollArea, Stack, Table, Text, Title } from "@mantine/core"
import cx from "clsx"
import { useAtomValue } from "jotai"
import { useMemo, useState } from "react"

import { vars } from "Theme/artifact/vars.mjs"

import { populationStatisticAtom } from "Providers/population.ts"

import { FormattedNumber } from "Modules/intl"

import classes from "./PopulationByPekerjaan.module.css"

const Card = ({ name, value }: { name: string; value: number }) => {
  return (
    <Grid.Col span={4}>
      <Box
        bg={"rgba(255, 255, 255, 0.50)"}
        style={{
          boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.10)",
          borderRadius: "5px",
          backdropFilter: "blur(2px)",
        }}
        py={"sm"}
        px={"xl"}
      >
        <Stack>
          <Text c={"#5A5E62"} fz={18} fw={600} h={100}>
            {name}
          </Text>
          <Text c={"#5A5E62"} ta="right" fz={32} fw={800}>
            {FormattedNumber.format(value)}
          </Text>
        </Stack>
      </Box>
    </Grid.Col>
  )
}

const PopulationByPekerjaan = () => {
  const [scrolled, setScrolled] = useState(false)
  const stats = useAtomValue(populationStatisticAtom)
  const sorted = useMemo(
    () => [...(stats?.job ?? [])].sort((a, b) => b.value - a.value),
    [stats],
  )

  return (
    <>
      <Stack visibleFrom="sm">
        <Title c={vars("color-primary-4")}>Berdasarkan Pekerjaan</Title>
        <Grid style={{ overflow: "visible" }}>
          <Grid.Col span={4}>
            <ScrollArea
              type="always"
              h={395}
              onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
            >
              <Table
                horizontalSpacing="md"
                verticalSpacing="sm"
                bg={"rgba(255, 255, 255, 0.50)"}
                style={{
                  boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.10)",
                  borderRadius: "5px",
                  backdropFilter: "blur(2px)",
                }}
              >
                <Table.Thead
                  c={"#fff"}
                  style={{ backgroundColor: vars("color-primary-3") }}
                  className={cx(classes.header, {
                    [classes.scrolled]: scrolled,
                  })}
                >
                  <Table.Tr fz={18}>
                    <Table.Th>Jenis Pekerjaan</Table.Th>
                    <Table.Th>Jumlah</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {sorted?.map((i) => (
                    <Table.Tr key={i.name + i.value}>
                      <Table.Td>{i.name}</Table.Td>
                      <Table.Td>{i.value}</Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </ScrollArea>
          </Grid.Col>
          <Grid.Col span={8}>
            <Grid style={{ overflow: "visible" }}>
              {sorted
                ?.slice(0, 6)
                .map((i) => (
                  <Card name={i.name} value={i.value} key={i.name + i.value} />
                ))}
            </Grid>
          </Grid.Col>
        </Grid>
      </Stack>
    </>
  )
}

export default PopulationByPekerjaan
