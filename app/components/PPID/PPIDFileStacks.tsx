"use client"

import { Stack, Title, Group, Button, Text, Divider } from "@mantine/core"
import { IconClock, IconDownload } from "@tabler/icons-react"
import { Fragment } from "react"

import { vars } from "#theme/artifact/vars.mjs"

import type { PpidFilesQuery } from "#graphql/graphql.ts"

import { asset, withAtom } from "#services/assets.ts"

import { formatDateOnlyWithDay } from "#modules/date.ts"

import PPIDFileTypes from "./PPIDFileTypes.tsx"

export const PPIDFileStacks = (props: { files: PpidFilesQuery["files"] }) => {
  return (
    <Stack>
      {props.files.map((file) => {
        const fileExt = /^(\w+).(\w+)$/.exec(file.fileURL)?.[2] ?? "file"
        return (
          <Fragment key={file.ID}>
            <Stack gap={"xs"}>
              <Title fz={{ base: 14, sm: 20 }}>{file.name}</Title>
              <Group wrap="nowrap" gap={7}>
                <IconClock size="1rem" stroke={1} />
                <Text fz={{ base: 12, sm: "md" }}>
                  {formatDateOnlyWithDay(file.updatedAt)}
                </Text>
              </Group>
              <Group justify="space-between" grow>
                <Button
                  variant="filled"
                  color={vars("color-primary-4")}
                  size="sm"
                  leftSection={<PPIDFileTypes fileExt={fileExt} size={20} />}
                  component="a"
                  href={`#view-${file.ID}`}
                >
                  Lihat Berkas
                </Button>
                <Button
                  variant="filled"
                  color={vars("color-primary-4")}
                  size="sm"
                  leftSection={<IconDownload size={20} />}
                  component="a"
                  href={withAtom(asset.ppidDDL)({ ID: file.ID.toString() })}
                  target="_blank"
                >
                  Unduh ({file.downloadCount}x)
                </Button>
              </Group>
            </Stack>
            <Divider />
          </Fragment>
        )
      })}
    </Stack>
  )
}
