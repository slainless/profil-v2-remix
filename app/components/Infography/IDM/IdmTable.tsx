import { Box, Group, ScrollArea, Table, Text } from "@mantine/core"
import { useAtomValue } from "jotai"

import { vars } from "#theme/artifact/vars.mjs"
import tableStyle from "#theme/table.module.css"

import { latestIDMAtom } from "#providers/IDM.ts"

const IdmTable = () => {
  const latestIDM = useAtomValue(latestIDMAtom)
  return (
    <>
      {/* Mobile */}
      <ScrollArea w={"92vw"} type="always" hiddenFrom="sm">
        <Box w={"100%"}>
          <Table
            className={`${tableStyle.gridTable}`}
            fz={12}
            style={{
              gridTemplateColumns:
                "max-content auto max-content auto auto max-content repeat(6, min-content)",
              borderRadius: vars("radius-md"),
              overflow: "hidden",
            }}
            styles={{
              td: { display: "flex", alignItems: "center" },
              th: {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              },
            }}
            bg={vars("color-white")}
            withTableBorder
            withColumnBorders
            highlightOnHover
          >
            <Table.Thead
              style={{
                "--_tr-bg": vars("color-primary-4"),
                "--_tr-hover-bg": vars("color-primary-4"),
                "--_table-border-color": vars("color-primary-5"),
              }}
              c={vars("color-white")}
            >
              <Table.Tr>
                {[
                  "No",
                  "Indikator IDM",
                  "Skor",
                  "Keterangan",
                  "Kegiatan yang dapat dilakukan",
                  "Nilai+",
                ].map((th) => (
                  <Table.Th key={th} rowSpan={2} style={{ gridRow: "1/3" }}>
                    {th}
                  </Table.Th>
                ))}
                <Table.Th colSpan={6} style={{ gridColumn: "7/13" }}>
                  Yang dapat melaksanakan kegiatan
                </Table.Th>
              </Table.Tr>
              <Table.Tr>
                <Table.Th>Pusat</Table.Th>
                <Table.Th>Provinsi</Table.Th>
                <Table.Th>Kab.</Table.Th>
                <Table.Th>Desa</Table.Th>
                <Table.Th>CSR</Table.Th>
                <Table.Th>Lainnya</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {latestIDM?.ROW.map((v) => {
                if (/^(IKS|IKE|IKL|IDM|STATUS IDM)/.test(v.INDIKATOR)) {
                  const isStatus = v.INDIKATOR.startsWith("STATUS IDM")
                  return (
                    <Table.Tr
                      key={v.INDIKATOR}
                      style={{
                        "--_tr-bg": vars("color-primary-3"),
                        "--_tr-hover-bg": vars("color-primary-3"),
                        "--_table-border-color": vars("color-primary-4"),
                      }}
                    >
                      <Table.Td
                        colSpan={6}
                        style={{ gridColumn: "1/13", display: "unset" }}
                      >
                        <Group justify="center">
                          <Text c={vars("color-primary-0")} tt={"uppercase"}>
                            {isStatus ? `Skor ${v.INDIKATOR}` : v.INDIKATOR}
                          </Text>
                          <Text
                            fw={"bold"}
                            c={vars("color-white")}
                            tt={"uppercase"}
                          >
                            {isStatus ? v.SKOR : v.SKOR.toFixed(4)}
                          </Text>
                        </Group>
                      </Table.Td>
                    </Table.Tr>
                  )
                }

                return (
                  <Table.Tr key={v.INDIKATOR}>
                    <Table.Td>{v.NO}</Table.Td>
                    <Table.Td>{v.INDIKATOR}</Table.Td>
                    <Table.Td>{v.SKOR}</Table.Td>
                    <Table.Td>{v.KETERANGAN}</Table.Td>
                    <Table.Td>{v.KEGIATAN}</Table.Td>
                    <Table.Td>
                      <Text
                        fw={+v.NILAI > 0 ? "bold" : "initial"}
                        fz={"inherit"}
                      >
                        {(+v.NILAI).toFixed(4)}
                      </Text>
                    </Table.Td>
                    <Table.Td>{v.PUSAT}</Table.Td>
                    <Table.Td>{v.PROV}</Table.Td>
                    <Table.Td>{v.KAB}</Table.Td>
                    <Table.Td>{v.DESA}</Table.Td>
                    <Table.Td>{v.CSR}</Table.Td>
                    <Table.Td>{v.LAINNYA}</Table.Td>
                  </Table.Tr>
                )
              })}
            </Table.Tbody>
          </Table>
        </Box>
      </ScrollArea>
      {/* End Mobile */}

      {/* Desktop */}
      <Box visibleFrom="sm">
        <Table
          className={`${tableStyle.gridTable}`}
          fz={12}
          style={{
            gridTemplateColumns:
              "max-content auto max-content auto auto max-content repeat(6, min-content)",
            borderRadius: vars("radius-md"),
            overflow: "hidden",
          }}
          styles={{
            td: { display: "flex", alignItems: "center" },
            th: {
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            },
          }}
          bg={vars("color-white")}
          withTableBorder
          withColumnBorders
          highlightOnHover
        >
          <Table.Thead
            style={{
              "--_tr-bg": vars("color-primary-3"),
              "--_tr-hover-bg": vars("color-primary-3"),
              "--_table-border-color": vars("color-primary-4"),
            }}
            c={vars("color-white")}
          >
            <Table.Tr>
              {[
                "No",
                "Indikator IDM",
                "Skor",
                "Keterangan",
                "Kegiatan yang dapat dilakukan",
                "Nilai+",
              ].map((th) => (
                <Table.Th key={th} rowSpan={2} style={{ gridRow: "1/3" }}>
                  {th}
                </Table.Th>
              ))}
              <Table.Th colSpan={6} style={{ gridColumn: "7/13" }}>
                Yang dapat melaksanakan kegiatan
              </Table.Th>
            </Table.Tr>
            <Table.Tr>
              <Table.Th>Pusat</Table.Th>
              <Table.Th>Provinsi</Table.Th>
              <Table.Th>Kab.</Table.Th>
              <Table.Th>Desa</Table.Th>
              <Table.Th>CSR</Table.Th>
              <Table.Th>Lainnya</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {latestIDM?.ROW.map((v) => {
              if (/^(IKS|IKE|IKL|IDM|STATUS IDM)/.test(v.INDIKATOR)) {
                const isStatus = v.INDIKATOR.startsWith("STATUS IDM")
                return (
                  <Table.Tr
                    key={v.INDIKATOR}
                    style={{
                      "--_tr-bg": vars("color-primary-3"),
                      "--_tr-hover-bg": vars("color-primary-3"),
                      "--_table-border-color": vars("color-primary-4"),
                    }}
                  >
                    <Table.Td
                      colSpan={6}
                      style={{ gridColumn: "1/13", display: "unset" }}
                    >
                      <Group justify="center">
                        <Text c={vars("color-primary-0")} tt={"uppercase"}>
                          {isStatus ? `Skor ${v.INDIKATOR}` : v.INDIKATOR}
                        </Text>
                        <Text
                          fw={"bold"}
                          c={vars("color-white")}
                          tt={"uppercase"}
                        >
                          {isStatus ? v.SKOR : v.SKOR.toFixed(4)}
                        </Text>
                      </Group>
                    </Table.Td>
                  </Table.Tr>
                )
              }

              return (
                <Table.Tr key={v.INDIKATOR}>
                  <Table.Td>{v.NO}</Table.Td>
                  <Table.Td>{v.INDIKATOR}</Table.Td>
                  <Table.Td>{v.SKOR}</Table.Td>
                  <Table.Td>{v.KETERANGAN}</Table.Td>
                  <Table.Td>{v.KEGIATAN}</Table.Td>
                  <Table.Td>
                    <Text fw={+v.NILAI > 0 ? "bold" : "initial"} fz={"inherit"}>
                      {(+v.NILAI).toFixed(4)}
                    </Text>
                  </Table.Td>
                  <Table.Td>{v.PUSAT}</Table.Td>
                  <Table.Td>{v.PROV}</Table.Td>
                  <Table.Td>{v.KAB}</Table.Td>
                  <Table.Td>{v.DESA}</Table.Td>
                  <Table.Td>{v.CSR}</Table.Td>
                  <Table.Td>{v.LAINNYA}</Table.Td>
                </Table.Tr>
              )
            })}
          </Table.Tbody>
        </Table>
      </Box>
      {/* End Desktop */}
    </>
  )
}

export default IdmTable
