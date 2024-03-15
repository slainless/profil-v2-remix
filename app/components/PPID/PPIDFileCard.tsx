"use client"

import {
  Card,
  Grid,
  Box,
  Stack,
  Title,
  Group,
  Button,
  Text,
} from "@mantine/core"
import { IconNotes, IconClock, IconDownload } from "@tabler/icons-react"
import { useState } from "react"

import { vars } from "#theme/artifact/vars.mjs"

import { asset, withAtom } from "#services/assets.ts"

import { formatDateOnlyWithDay } from "#modules/date.ts"

import PPIDFileTypes from "./PPIDFileTypes.tsx"

interface Props {
  ID: number
  name: string
  url: string
  date: string
  category: string
  downloadCount: number
}

export const PPIDFileCard = ({
  ID,
  name,
  url,
  date,
  category,
  downloadCount,
}: Props) => {
  const fileExt = /^(\w+).(\w+)$/.exec(url)?.[2] ?? "file"
  const [count, setCount] = useState(downloadCount)

  return (
    <>
      {/* Mobile */}
      <Card withBorder shadow="xs" radius="md" hiddenFrom="sm">
        <Stack gap={"xs"}>
          <Title fz={{ base: 14, sm: 20 }}>{name}</Title>
          <Group wrap="nowrap" gap={7}>
            <IconNotes size="1rem" stroke={1} />
            <Text fz={{ base: 12, sm: "md" }}>{category}</Text>
          </Group>
          <Group wrap="nowrap" gap={7}>
            <IconClock size="1rem" stroke={1} />
            <Text fz={{ base: 12, sm: "md" }}>
              {formatDateOnlyWithDay(date)}
            </Text>
          </Group>
          <Group justify="space-between" grow>
            <Button
              variant="filled"
              color={vars("color-primary-4")}
              size="sm"
              leftSection={<PPIDFileTypes fileExt={fileExt} size={20} />}
              component="a"
              href={`#view-${ID}`}
            >
              Lihat Berkas
            </Button>
            <Button
              variant="filled"
              color={vars("color-primary-4")}
              size="sm"
              leftSection={<IconDownload size={20} />}
              component="a"
              href={withAtom(asset.ppidDDL)({ ID: ID.toString() })}
              onClick={() => setCount(count + 1)}
              target="_blank"
            >
              Unduh ({count}x)
            </Button>
          </Group>
        </Stack>
      </Card>
      {/* End Mobile */}

      {/* Desktop */}
      <Card
        withBorder
        shadow="xs"
        radius="sm"
        bg={vars("color-gray-0")}
        visibleFrom="sm"
      >
        <Grid justify="space-between" align="center">
          <Grid.Col span={9}>
            <Box w={"70%"}>
              <Stack gap={15}>
                <Title fz={20}>{name}</Title>
                <Stack gap={0}>
                  <Group wrap="nowrap" gap={7}>
                    <IconNotes size="1.5rem" stroke={1.5} />
                    <Text>{category}</Text>
                  </Group>
                  <Group wrap="nowrap" gap={7}>
                    <IconClock size="1.5rem" stroke={1.5} />
                    <Text>{formatDateOnlyWithDay(date)}</Text>
                  </Group>
                </Stack>
              </Stack>
            </Box>
          </Grid.Col>
          <Grid.Col span={3} ta={"end"}>
            <Stack>
              <Button
                variant="default"
                color={vars("color-primary-4")}
                size="lg"
                leftSection={<PPIDFileTypes fileExt={fileExt} size={20} />}
                component="a"
                href={`#view-${ID}`}
              >
                Lihat Berkas
              </Button>
              <Button
                variant="default"
                color={vars("color-primary-4")}
                size="lg"
                leftSection={<IconDownload size={20} />}
                component="a"
                href={withAtom(asset.ppidDDL)({ ID: ID.toString() })}
                onClick={() => setCount(count + 1)}
                target="_blank"
              >
                Unduh ({count}x)
              </Button>
            </Stack>
          </Grid.Col>
        </Grid>
      </Card>
      {/* End Desktop */}
    </>
  )
}
