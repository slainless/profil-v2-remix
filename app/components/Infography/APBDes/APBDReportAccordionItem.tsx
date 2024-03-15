import {
  Accordion,
  Grid,
  Progress,
  Table,
  TableTbody,
  TableTd,
  TableTh,
  TableThead,
  TableTr,
  Text,
} from "@mantine/core"

import { Report, WithTotal } from "#providers/APBD.ts"

import { IDRFormatter } from "#modules/intl.ts"

export const APBDReportAccordionItem = ({
  category,
  reports,
  value,
  percent,
  color,
}: {
  category: string
  reports: WithTotal<Report>
  value: number
  percent: string
  color: string
}) => {
  return (
    <Accordion.Item value={category}>
      <Accordion.Control>
        <Grid justify="space-between" align="center">
          <Grid.Col span={{ base: 6, sm: 4 }}>
            <Text fz={{ base: 14, sm: "md" }}>{category}</Text>
            <Progress.Root size="xl" radius="xl" hiddenFrom="sm">
              <Progress.Section value={parseFloat(percent)} color={color}>
                <Progress.Label>{percent}%</Progress.Label>
              </Progress.Section>
            </Progress.Root>
          </Grid.Col>
          <Grid.Col span={{ base: 6, sm: 8 }}>
            <Grid
              justify="space-between"
              align="center"
              gutter={"xs"}
              visibleFrom="sm"
              grow
            >
              <Grid.Col span={8}>
                <Progress.Root size="xl" radius="xl">
                  <Progress.Section value={parseFloat(percent)} color={color}>
                    <Progress.Label>{percent}%</Progress.Label>
                  </Progress.Section>
                </Progress.Root>
              </Grid.Col>
              <Grid.Col span={4}>
                <Text ta="right">{IDRFormatter.formatNoSpace(value)}</Text>
              </Grid.Col>
            </Grid>
            <Grid hiddenFrom="sm">
              <Grid.Col>
                <Text ta="right" fz={14}>
                  {IDRFormatter.formatNoSpace(value)}
                </Text>
              </Grid.Col>
            </Grid>
          </Grid.Col>
        </Grid>
      </Accordion.Control>
      <Accordion.Panel>
        <Table fz={{ base: 12, sm: "md" }}>
          <TableThead>
            <TableTr>
              <TableTh>Uraian</TableTh>
              <TableTh>Anggaran</TableTh>
            </TableTr>
          </TableThead>
          <TableTbody>
            {reports?.details?.map((detail) => (
              <TableTr key={detail.name}>
                <TableTd w={{ base: "55%", sm: "84%" }}>{detail.name}</TableTd>
                <TableTd>
                  {IDRFormatter.formatNoSpace(parseInt(detail.value))}
                </TableTd>
              </TableTr>
            ))}
          </TableTbody>
        </Table>
      </Accordion.Panel>
    </Accordion.Item>
  )
}
