"use client"

import {
  Table,
  TableThead,
  TableTr,
  TableTh,
  TableTbody,
  TableTd,
  Stack,
  Button,
} from "@mantine/core"
import { IconDownload } from "@tabler/icons-react"

import { vars } from "Theme/artifact/vars.mjs"

import type { PpidFilesQuery } from "GraphQL/graphql.ts"

import { asset, withAtom } from "Services/assets.ts"

import { formatDateOnlyWithDay } from "Modules/date.ts"

import PPIDFileTypes from "./PPIDFileTypes.tsx"

export const PPIDFileTable = (props: { files: PpidFilesQuery["files"] }) => {
  return (
    <Table fz={{ base: 12, sm: "lg" }} visibleFrom="sm">
      <TableThead>
        <TableTr>
          <TableTh w={"10%"}>No</TableTh>
          <TableTh w={"50%"}>Judul</TableTh>
          <TableTh w={"20%"}>Tanggal</TableTh>
          <TableTh w={"20%"}></TableTh>
        </TableTr>
      </TableThead>
      <TableTbody>
        {props.files.map((file, index) => {
          const fileExt = /^(\w+).(\w+)$/.exec(file.fileURL)?.[2] ?? "file"
          return (
            <TableTr key={file.ID}>
              <TableTd>{index + 1}</TableTd>
              <TableTd>{file.name}</TableTd>
              <TableTd>{formatDateOnlyWithDay(file.updatedAt)}</TableTd>
              <TableTd>
                <Stack>
                  <Button
                    variant="default"
                    color={vars("color-primary-4")}
                    size="lg"
                    leftSection={<PPIDFileTypes fileExt={fileExt} size={20} />}
                    component="a"
                    href={`#view-${file.ID}`}
                  >
                    Lihat Berkas
                  </Button>
                  <Button
                    variant="default"
                    color={vars("color-primary-4")}
                    size="lg"
                    leftSection={<IconDownload size={20} />}
                    component="a"
                    href={withAtom(asset.ppidDDL)({ ID: file.ID.toString() })}
                    target="_blank"
                  >
                    Unduh ({file.downloadCount}x)
                  </Button>
                </Stack>
              </TableTd>
            </TableTr>
          )
        })}
      </TableTbody>
    </Table>
  )
}
