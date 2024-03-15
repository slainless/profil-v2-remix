/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormattedNumber } from "#modules/intl.ts"

export const chartOptions = (
  xAxisData: any[],
  data: any[],
  barColors: any[],
) => ({
  title: { show: false },
  legend: { show: false },
  grid: { top: 50, right: 20, bottom: 30, left: 100 },
  xAxis: {
    type: "category",
    data: xAxisData,
    axisLabel: {
      interval: 0,
      textStyle: { fontSize: "14px", fontWeight: "normal" },
    },
    formatter: function (value: any) {
      const maxWidth = 20
      const lines = []
      let line = ""
      const words = value.split(" ")

      words.forEach((word: any) => {
        if (line.length + word.length <= maxWidth) {
          line += (line ? " " : "") + word
        } else {
          lines.push(line)
          line = word
        }
      })

      if (line) {
        lines.push(line)
      }

      return lines.join("\n")
    },
    axisLine: { show: false },
    axisTick: { show: false },
    splitLine: {
      show: true,
      lineStyle: { type: "solid" },
    },
    boundaryGap: true,
    inverse: true,
  },
  yAxis: {
    type: "value",
    min: 0,
    axisTick: { show: false },
    axisLine: { show: false },
    splitLine: { show: true, lineStyle: { type: "solid" } },
  },
  tooltip: {
    trigger: "axis",
    axisPointer: { type: "shadow" },
    valueFormatter: (value: number) => FormattedNumber.format(value),
  },
  series: [
    {
      // name: "Pendapatan",
      type: "bar",
      data: data,
      barWidth: 150,
      itemStyle: {
        borderRadius: [5, 5, 0, 0],
        color: barColors[0],
      },
      label: {
        show: true,
        fontSize: "14px",
        position: "top",
        formatter: function (params: { value: number }) {
          return FormattedNumber.format(params.value)
        },
      },
      inverse: true,
    },
  ],
})
