import {
  Table,
  TableThead,
  TableTr,
  TableTh,
  TableTbody,
  TableTd,
  TableScrollContainer,
} from "@mantine/core"

import { vars } from "#theme/artifact/vars.mjs"
import tableStyle from "#theme/table.module.css"

import { Goal } from "#services/sdgs.ts"

import { TableParser } from "./SDGsTableParser.tsx"

export const SDGsRecommendationTable = (props: {
  recommendations: Goal.Main["recom"]
}) => {
  return (
    <TableScrollContainer minWidth={640}>
      <Table
        // striped
        // highlightOnHover
        withColumnBorders
        withTableBorder
        style={{
          borderRadius: vars("radius-md"),
          // overflow: "hidden",
        }}
      >
        <TableThead
          style={{
            "--_tr-bg": vars("color-primary-4"),
            "--_tr-hover-bg": vars("color-primary-4"),
            "--_table-border-color": vars("color-primary-5"),
          }}
          c={vars("color-white")}
        >
          <TableTr>
            <TableTh>No</TableTh>
            <TableTh>Sasaran</TableTh>
            <TableTh>Skor</TableTh>
            <TableTh>Volume</TableTh>
            <TableTh>Satuan</TableTh>
            <TableTh>Rekomendasi Program</TableTh>
          </TableTr>
        </TableThead>
        <TableTbody>
          {props.recommendations.map((r) => {
            const bnba = document.createElement("div")
            bnba.innerHTML = r.bnba

            return (
              <TableTr key={r.no} style={{ verticalAlign: "baseline" }}>
                <TableTd>{r.no}</TableTd>
                <TableTd>{r.name}</TableTd>
                <TableTd>{r.score}</TableTd>
                <TableTd>{bnba.textContent}</TableTd>
                <TableTd>{r.unit}</TableTd>
                <TableTd p={0}>
                  <TableParser
                    className={tableStyle.gridTable}
                    style={{
                      gridTemplateColumns: "repeat(2, 1fr)",
                      "--_table-border": "none",
                    }}
                    withColumnBorders
                    withTableBorder={false}
                  >
                    {r.recommendation}
                  </TableParser>
                </TableTd>
              </TableTr>
            )
          })}
        </TableTbody>
      </Table>
    </TableScrollContainer>
  )
}
