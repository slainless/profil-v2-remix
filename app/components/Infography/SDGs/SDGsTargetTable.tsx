import {
  Table,
  TableScrollContainer,
  TableTbody,
  TableTd,
  TableThead,
  TableTr,
  Text,
} from "@mantine/core"
import { useMemo } from "react"

import { vars } from "#theme/artifact/vars.mjs"
import tableStyle from "#theme/table.module.css"

import { Goal } from "#services/sdgs.ts"

export const SDGsTargetTable = ({ targets }: { targets: Goal.Target[] }) => {
  const sample = useMemo<Goal.Target | null>(
    () => targets?.[0] ?? null,
    [targets],
  )
  const [recomCols, scoreCols] = useMemo(
    () => [
      Object.keys(sample?.anrekom ?? {}).length,
      Object.keys(sample?.skor ?? {}).length,
    ],
    [sample],
  )

  if (sample == null) {
    return "Tidak ada data untuk ditampilkan"
  }

  return (
    <TableScrollContainer minWidth={640}>
      <Table
        className={tableStyle.gridTable}
        style={{
          gridTemplateColumns: `min-content auto repeat(${recomCols}, 1fr) min-content min-content min-content repeat(${scoreCols}, 1fr) min-content min-content min-content`,
          // gridTemplateColumns: `min-content auto repeat(${recomCols}, 1fr) min-content min-content min-content repeat(${scoreCols}, 1fr) min-content min-content min-content`,
        }}
        withColumnBorders
        withTableBorder
      >
        <TableThead
          style={{
            "--_tr-bg": vars("color-primary-4"),
            "--_tr-hover-bg": vars("color-primary-4"),
            "--_table-border-color": vars("color-primary-5"),
          }}
          c={vars("color-white")}
          fz={11}
        >
          <TableTr>
            <TableTd style={{ gridRow: "1 / 3" }}>No</TableTd>
            <TableTd style={{ gridRow: "1 / 3" }}>Target</TableTd>
            <TableTd style={{ gridColumn: `3 / ${3 + recomCols}` }}>
              Rekomendasi
            </TableTd>
            <TableTd
              style={{ gridRow: "1 / 3", gridColumnStart: 3 + recomCols }}
            >
              Nilai Awal
            </TableTd>
            <TableTd
              style={{ gridRow: "1 / 3", gridColumnStart: 4 + recomCols }}
            >
              Volume
            </TableTd>
            <TableTd
              style={{ gridRow: "1 / 3", gridColumnStart: 5 + recomCols }}
            >
              Satuan
            </TableTd>
            <TableTd
              style={{
                gridColumn: `${6 + recomCols} / ${6 + recomCols + scoreCols}`,
              }}
            >
              Skor
            </TableTd>
            <TableTd
              style={{
                gridRow: "1/3",
                gridColumnStart: 6 + recomCols + scoreCols,
              }}
            >
              Perkiraan Biaya
            </TableTd>
            <TableTd
              style={{
                gridRow: "1 / 3",
                gridColumnStart: 7 + recomCols + scoreCols,
              }}
            >
              Sumber
            </TableTd>
            <TableTd
              style={{
                gridRow: "1 / 3",
                gridColumnStart: 8 + recomCols + scoreCols,
              }}
            >
              Pola Pelaksanaan
            </TableTd>
          </TableTr>
          <TableTr>
            {Object.keys(sample?.anrekom ?? {}).map((key) => (
              <TableTd key={key}>
                <Text
                  style={{
                    writingMode: "vertical-lr",
                    transform: "rotate(180deg)",
                  }}
                  fz="inherit"
                >
                  {key.replace("th", "")}
                </Text>
              </TableTd>
            ))}
            {Object.keys(sample?.skor ?? {}).map((key) => (
              <TableTd key={key}>
                <Text
                  style={{
                    writingMode: "vertical-lr",
                    transform: "rotate(180deg)",
                  }}
                  fz="inherit"
                >
                  {key.replace("th", "")}
                </Text>
              </TableTd>
            ))}
          </TableTr>
        </TableThead>
        <TableTbody>
          {targets.map((target) => (
            <TableTr key={target.kdind}>
              <TableTd>{target.kdind}</TableTd>
              <TableTd>{target.deskripsi}</TableTd>
              {Object.entries(sample?.anrekom ?? {}).map(([key, values]) => (
                <TableTd key={key}>{values}</TableTd>
              ))}
              <TableTd>{target.nilaiawal}</TableTd>
              <TableTd>{target.volume}</TableTd>
              <TableTd>{target.satuan}</TableTd>
              {Object.entries(sample?.skor ?? {}).map(([key, values]) => (
                <TableTd key={key}>{values}</TableTd>
              ))}
              <TableTd>{target.prakiraanbiaya}</TableTd>
              <TableTd>{target.sumber}</TableTd>
              <TableTd>{target.polapelaksanaan}</TableTd>
            </TableTr>
          ))}
        </TableTbody>
      </Table>
    </TableScrollContainer>
  )
}
