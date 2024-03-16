import { Stack, Box, Flex, Title } from "@mantine/core"
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node"
import { IconCircleX } from "@tabler/icons-react"
import ReactEChartsCore from "echarts-for-react/lib/core"
import { useQuery } from "urql"

import { vars } from "#theme/artifact/vars.mjs"

import { DimmedNotice } from "#components/DimmedNotice.tsx"
import {
  chartOptionsMobile,
  chartOptions,
} from "#components/Infography/Stunting/stuntingViewChartOptions.ts"

import { stuntingQuery } from "#queries/stats.ts"

import { tick, TickType } from "#services/.server/visit.js"

import { contentsOrNone } from "#modules/css-utils.ts"
import { echarts } from "#modules/echarts.js"

import { assertCommonContext } from "#server/context.js"

import { renderMetadata } from "../_.infografis/meta.ts"

export function loader({ context }: LoaderFunctionArgs) {
  assertCommonContext(context)
  tick(context.schema, TickType.GENERAL, "/infografis/stunting")
  return null
}

export const meta: MetaFunction = (args) => {
  return renderMetadata(args, "stunting")
}

export default function Stunting() {
  const [{ data }] = useQuery({ query: stuntingQuery })
  return (
    <>
      {/* Mobile */}
      <Stack hiddenFrom="sm">
        <Box
          bg={"rgba(255, 255, 255, 0.50)"}
          style={{
            boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.10)",
            borderRadius: "5px",
            backdropFilter: "blur(2px)",
          }}
          py={"lg"}
          display={contentsOrNone(
            data?.stunting != null && data?.stunting.length > 0,
          )}
        >
          <Title
            fz={{ base: 20, sm: 44 }}
            ta={{ base: "center", sm: "start", md: "start" }}
            c={vars("color-primary-4")}
          >
            Data Stunting
          </Title>
          <ReactEChartsCore
            echarts={echarts}
            option={chartOptionsMobile(
              [...(data?.stunting ?? [])].sort((a, b) => a.year - b.year) ?? [],
            )}
            style={{ width: "100%", height: "400px" }}
          />
        </Box>
        <Box
          hiddenFrom="sm"
          display={contentsOrNone(
            data?.stunting != null && data?.stunting.length == 0,
          )}
        >
          <DimmedNotice icon={IconCircleX} message="Belum Ada Data" />
        </Box>
      </Stack>
      {/* End Mobile */}

      {/* Desktop */}
      <Stack gap={100} visibleFrom="sm">
        <Box></Box>
        <Stack pos={"relative"}>
          <Title
            pos={"absolute"}
            top={-25}
            left={20}
            c={vars("color-primary-4")}
            style={{ zIndex: 10 }}
          >
            Data Stunting
          </Title>
          <Flex
            bg={"rgba(255, 255, 255, 0.50)"}
            style={{
              boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.10)",
              borderRadius: "5px",
              backdropFilter: "blur(2px)",
            }}
            py={"lg"}
            px={"xl"}
            justify={"center"}
            align={"center"}
            h="480px"
          >
            <Box
              display={contentsOrNone(
                data?.stunting != null && data?.stunting.length > 0,
              )}
            >
              <ReactEChartsCore
                echarts={echarts}
                option={chartOptions(
                  [...(data?.stunting ?? [])].sort((a, b) => a.year - b.year) ??
                    [],
                )}
                style={{ width: "100%", height: "100%" }}
              />
            </Box>
            <Box
              visibleFrom="sm"
              display={contentsOrNone(
                data?.stunting != null && data?.stunting.length == 0,
              )}
            >
              <DimmedNotice icon={IconCircleX} message="Belum Ada Data" />
            </Box>
          </Flex>
        </Stack>
      </Stack>
      {/* End Desktop */}
    </>
  )
}
