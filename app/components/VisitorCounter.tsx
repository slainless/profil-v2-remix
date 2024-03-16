"use client"

import {
  Box,
  Divider,
  Group,
  HoverCard,
  Space,
  Stack,
  Text,
  Title,
} from "@mantine/core"
import { IconChevronDown, IconDoor } from "@tabler/icons-react"
import { useQuery } from "urql"

import { vars } from "#theme/artifact/vars.mjs"

import { visitStatsQuery } from "#queries/stats.js"

import { FormattedNumber } from "#modules/intl.ts"

function VisitorCounter() {
  const [{ data }] = useQuery({ query: visitStatsQuery })
  const statistic = data?.stats

  return (
    <HoverCard width={250} shadow="md">
      <HoverCard.Target>
        <Box
          visibleFrom="sm"
          mx={"md"}
          mb={"sm"}
          bg={vars("color-primary-2")}
          px={"sm"}
          py={"xs"}
          style={{
            position: "fixed",
            bottom: 0,
            border: "2px solid white",
            borderRadius: 10,
            zIndex: 1000,
            opacity: 0.9,
          }}
        >
          <Group>
            <Stack align="center" gap={0}>
              <IconDoor size={24} color="white" />
              <Text fz={"md"} fw={700} c="white">
                {FormattedNumber.format(statistic?.today ?? 0)}
              </Text>
            </Stack>
            <Text fz={"md"} fw={600} c="white">
              Kunjungan
              <br />
              Hari Ini
            </Text>
            <IconChevronDown color="white" />
          </Group>
        </Box>
      </HoverCard.Target>
      <HoverCard.Dropdown
        mx={"md"}
        style={{
          backgroundColor: "#5A5E62",
          color: "white",
          borderRadius: 10,
          // opacity: 0.9,
        }}
      >
        <Title size={18} mb="sm">
          Jumlah Kunjungan
        </Title>
        <Group justify="space-between">
          <Text>Hari Ini</Text>
          <Text>{FormattedNumber.format(statistic?.today ?? 0)}</Text>
        </Group>
        <Divider size="sm" />
        <Space h={"sm"} />
        <Group justify="space-between">
          <Text>Kemarin</Text>
          <Text>{FormattedNumber.format(statistic?.yesterday ?? 0)}</Text>
        </Group>
        <Divider size="sm" />
        <Space h={"sm"} />
        <Group justify="space-between">
          <Text>Minggu Ini</Text>
          <Text>{FormattedNumber.format(statistic?.thisWeek ?? 0)}</Text>
        </Group>
        <Divider size="sm" />
        <Space h={"sm"} />
        <Group justify="space-between">
          <Text>Minggu Lalu</Text>
          <Text>{FormattedNumber.format(statistic?.lastWeek ?? 0)}</Text>
        </Group>
        <Divider size="sm" />
        <Space h={"sm"} />
        <Group justify="space-between">
          <Text>Bulan Ini</Text>
          <Text>{FormattedNumber.format(statistic?.thisMonth ?? 0)}</Text>
        </Group>
        <Divider size="sm" />
        <Space h={"sm"} />
        <Group justify="space-between">
          <Text>Bulan Lalu</Text>
          <Text>{FormattedNumber.format(statistic?.lastMonth ?? 0)}</Text>
        </Group>
        <Divider size="sm" />
        <Space h={"sm"} />
        <Group justify="space-between">
          <Text>Total Kunjungan</Text>
          <Text>{FormattedNumber.format(statistic?.total ?? 0)}</Text>
        </Group>
        <Divider size="sm" />
        <Space h={"sm"} />
      </HoverCard.Dropdown>
    </HoverCard>
  )
}

export default VisitorCounter
