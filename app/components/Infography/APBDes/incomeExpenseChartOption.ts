/* eslint-disable @typescript-eslint/no-explicit-any */
import { IDRFormatter } from "#modules/intl.ts"

export const chartOptions = (
  xAxisData: any[],
  incomeData: any[],
  expenseData: any[],
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
      formatter: function (value: any) {
        // Define a maximum width
        const maxWidth = 20 // Adjust this value as needed
        const lines = []
        let line = ""
        const words = value.split(" ")

        // Iterate through words and add them to lines
        words.forEach((word: any) => {
          if (line.length + word.length <= maxWidth) {
            line += (line ? " " : "") + word
          } else {
            lines.push(line)
            line = word
          }
        })

        // Push the last line
        if (line) {
          lines.push(line)
        }

        return lines.join("\n")
      },
    },
    axisLine: { show: false },
    axisTick: { show: false },
    splitLine: { show: true, lineStyle: { type: "solid" } },
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
    valueFormatter: (value: number) => IDRFormatter.formatNoSpace(value),
  },
  series: [
    {
      name: "Pendapatan",
      type: "bar",
      data: incomeData,
      itemStyle: { borderRadius: [5, 5, 0, 0], color: barColors[0] },
      label: {
        show: true,
        fontSize: "14px",
        position: "top",
        formatter: function (params: { value: number }) {
          return IDRFormatter.formatNoSpace(params.value)
        },
      },
      inverse: true,
    },
    {
      name: "Belanja",
      type: "bar",
      data: expenseData,
      itemStyle: { borderRadius: [5, 5, 0, 0], color: barColors[1] },
      label: {
        show: true,
        fontSize: "14px",
        position: "top",
        formatter: function (params: { value: number }) {
          return IDRFormatter.formatNoSpace(params.value)
        },
      },
      inverse: true,
    },
  ],
})

function createLinearGradient(color1: string, color2: string) {
  return {
    type: "linear",
    x: 0,
    y: 0,
    x2: 0,
    y2: 1,
    colorStops: [
      {
        offset: 0,
        color: color1, // color at 0% position
      },
      {
        offset: 1,
        color: color2, // color at 100% position
      },
    ],
    global: false, // false by default
  }
}

export const chartOptionsMobile = (
  xAxisData: any[],
  incomeData: any[],
  expenseData: any[],
  barColors: any[],
) => ({
  color: barColors,
  title: {
    show: false,
  },
  tooltip: {
    trigger: "axis",
    valueFormatter: (value: number) => IDRFormatter.formatNoSpace(value),
  },
  legend: {
    data: ["Pendapatan", "Belanja"],
    bottom: "-5",
    textStyle: {
      fontSize: 10,
      fontWeight: "normal",
    },
  },
  grid: {
    top: 40,
    right: "15%",
    bottom: 40,
    left: "15%",
  },
  xAxis: [
    {
      type: "category",
      boundaryGap: false,
      data: xAxisData,
      inverse: true,
    },
  ],
  yAxis: [
    {
      type: "value",
      show: false,
    },
  ],
  series: [
    {
      name: "Pendapatan",
      type: "line",
      stack: "Total",
      smooth: true,
      lineStyle: {
        width: 0,
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.8,
        color: createLinearGradient("rgb(128, 255, 165)", "rgb(1, 191, 236)"),
      },
      emphasis: {
        focus: "series",
      },
      data: incomeData,
      label: {
        show: true,
        position: "bottom",
        formatter: function (params: { value: number }) {
          return IDRFormatter.formatNoSpace(params.value)
        },
      },
      inverse: true,
    },
    {
      name: "Belanja",
      type: "line",
      stack: "Total",
      smooth: true,
      lineStyle: {
        width: 0,
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.8,
        color: createLinearGradient("rgb(0, 221, 255)", "rgb(77, 119, 255)"),
      },
      emphasis: {
        focus: "series",
      },
      data: expenseData,
      label: {
        show: true,
        position: "top",
        formatter: function (params: { value: number }) {
          return IDRFormatter.formatNoSpace(params.value)
        },
      },
    },
  ],
})
