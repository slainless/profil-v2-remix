"use client"

import {
  Box,
  Grid,
  Image,
  Stack,
  Title,
  Text,
  Group,
  Button,
  Card,
  SimpleGrid,
  Space,
} from "@mantine/core"
import { Link } from "@remix-run/react"
import { IconDownload, IconNotes } from "@tabler/icons-react"
import { IconUpload } from "@tabler/icons-react"
import { useAtomValue } from "jotai"
import { render } from "micromustache"
import { useMemo } from "react"
import { useQuery } from "urql"

import { vars } from "#theme/artifact/vars.mjs"

import { aliasDesaAtom, schemaAtom } from "#providers/profile.ts"

import otherImage from "#assets/other.png"

import { budgetSummaryQuery } from "#queries/stats.ts"

import { DomainHandler } from "#modules/domain-handler.ts"
import { IDRFormatter } from "#modules/intl.ts"

const title = `{{ apb }} {{ alias }} {{ year }}`
const subTitle = `Akses cepat dan transparan terhadap {{ apb }} {{ alias }} serta proyek pembangunan`

function BudgetStats() {
  const schema = useAtomValue(schemaAtom)
  const [{ data }] = useQuery({ query: budgetSummaryQuery })
  const [year, income, expense, financingIncome, financingExpense] =
    useMemo(() => {
      if (data == null) return ["", 0, 0, 0, 0]
      return [
        data?.summary?.year.toString() ?? "",
        parseInt(data?.summary?.income ?? "0"),
        parseInt(data?.summary?.expense ?? "0"),
        parseInt(data?.summary?.financingIncome ?? "0"),
        parseInt(data?.summary?.financingExpense ?? "0"),
      ]
    }, [data])

  const apb = DomainHandler.isKelurahan(schema) ? "Anggaran" : "APB"
  const aliasDesa = useAtomValue(aliasDesaAtom)

  return (
    <>
      <Box hiddenFrom="sm" m={0}>
        <Title
          tt={"uppercase"}
          fz={{ base: 20, sm: 44 }}
          ta={{ base: "center", sm: "start", md: "start" }}
          c={vars("color-primary-5")}
        >
          {render(title, { apb, alias: aliasDesa, year })}
        </Title>
        <Text
          fz={{ base: "md", sm: 20 }}
          ta={{
            base: "center",
            sm: "start",
            md: "start",
          }}
        >
          {render(subTitle, { apb, alias: aliasDesa })}
        </Text>
        <Space h={"md"} />
        <Stack>
          <Card bg={"#F1FBF9"} radius={"md"} withBorder>
            <Card.Section>
              <SimpleGrid cols={2}>
                <Stack py={"sm"} gap={0}>
                  <Group justify="center" align="center" wrap="nowrap" gap={2}>
                    <IconDownload color="#029019" size="1rem" stroke={1} />
                    <Text fz={14} c={"#5D5D5D"}>
                      Pendapatan
                    </Text>
                  </Group>
                  <Text ta={"center"} fw={"bold"} fz={14} c="#029019">
                    {IDRFormatter.formatNoSpace(income)}
                  </Text>
                </Stack>
                {/* <Divider orientation="vertical" /> */}
                <Stack py={"sm"} gap={0}>
                  <Group justify="center" align="center" wrap="nowrap" gap={2}>
                    <IconUpload color="#D60505" size="1rem" stroke={1} />
                    <Text fz={14} c={"#5D5D5D"}>
                      Belanja
                    </Text>
                  </Group>
                  <Text ta={"center"} fw={"bold"} fz={14} c="#D60505">
                    {IDRFormatter.formatNoSpace(expense)}
                  </Text>
                </Stack>
              </SimpleGrid>
            </Card.Section>
            <Card.Section>
              <Text
                fz={{ base: 16 }}
                ta={{ base: "center" }}
                c={vars("color-primary-3")}
                mb={-10}
              >
                Pembiayaan
              </Text>
              <SimpleGrid cols={2}>
                <Stack py={"sm"} gap={0}>
                  <Group justify="center" align="center" wrap="nowrap" gap={2}>
                    <IconDownload color="#029019" size="1rem" stroke={1} />
                    <Text fz={14} c={"#5D5D5D"}>
                      Penerimaan
                    </Text>
                  </Group>
                  <Text ta={"center"} fw={"bold"} fz={14} c="#029019">
                    {IDRFormatter.formatNoSpace(financingIncome)}
                  </Text>
                </Stack>
                {/* <Divider orientation="vertical" /> */}
                <Stack py={"sm"} gap={0}>
                  <Group justify="center" align="center" wrap="nowrap" gap={2}>
                    <IconUpload color="#D60505" size="1rem" stroke={1} />
                    <Text fz={14} c={"#5D5D5D"}>
                      Pengeluaran
                    </Text>
                  </Group>
                  <Text ta={"center"} fw={"bold"} fz={14} c="#D60505">
                    {IDRFormatter.formatNoSpace(financingExpense)}
                  </Text>
                </Stack>
              </SimpleGrid>
            </Card.Section>

            <Card.Section style={{ borderTop: "1px solid #77D8C5" }}>
              <Text py={"sm"} ta={"center"} fz={14} c={"#5D5D5D"}>
                Surplus/Defisit{" "}
                <b>
                  {IDRFormatter.formatNoSpace(
                    income + financingIncome - expense - financingExpense,
                  )}
                </b>
              </Text>
            </Card.Section>
          </Card>
          <Button
            hiddenFrom="sm"
            component={Link}
            to={"/infografis/apbdes"}
            variant="outline"
            color={vars("color-primary-4")}
            radius={"md"}
            fullWidth
          >
            Lihat Detail
          </Button>
        </Stack>
      </Box>
      <Grid visibleFrom="sm" grow>
        <Grid.Col span={6}>
          <Image p={"xl"} src={otherImage} alt="Other" />
        </Grid.Col>
        <Grid.Col span={6}>
          <Stack>
            <Box>
              <Title
                tt={"uppercase"}
                fz={{ base: 20, sm: 44 }}
                ta={{ base: "center", sm: "start", md: "start" }}
                c={vars("color-primary-4")}
              >
                {render(title, { apb, alias: aliasDesa, year })}
              </Title>
              <Text
                fz={{ base: "md", sm: 20 }}
                ta={{
                  base: "center",
                  sm: "start",
                  md: "start",
                }}
              >
                {render(subTitle, { apb, alias: aliasDesa })}
              </Text>
            </Box>
            <Grid grow style={{ overflow: "visible" }}>
              <Grid.Col span={12}>
                <Stack>
                  <BudgetItem
                    title={`Pendapatan ${aliasDesa}`}
                    value={parseInt(data?.summary?.income ?? "0")}
                  />
                  <BudgetItem
                    title={`Belanja ${aliasDesa}`}
                    value={parseInt(data?.summary?.expense ?? "0")}
                  />
                </Stack>
              </Grid.Col>
            </Grid>
          </Stack>
          <Space h={"md"} />
          <Group justify="flex-end" gap={0}>
            <Button
              component={Link}
              to={"/infografis/apbdes"}
              style={{ border: 0 }}
              variant="default"
              bg={"transparent"}
              leftSection={<IconNotes color="black" />}
            >
              <Text c="black" fw={"bold"} tt={"uppercase"}>
                lihat data lebih lengkap
              </Text>
            </Button>
          </Group>
        </Grid.Col>
      </Grid>
    </>
  )
}

type BudgetItemProps = {
  title: string
  value: number
}

const BudgetItem = ({ title, value }: BudgetItemProps) => {
  const budget = isNaN(value) ? 0 : value
  const formated = IDRFormatter.formatNoSpace(budget)
  return (
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
      <Stack gap={0}>
        <Text c={"#5A5E62"} fz={18} fw={600}>
          {title}
        </Text>
        <Text c={"#5A5E62"} ta="right" fz={44} fw={800}>
          {formated}
        </Text>
      </Stack>
    </Box>
  )
}

export default BudgetStats
