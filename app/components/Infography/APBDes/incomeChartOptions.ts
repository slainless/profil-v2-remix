/* eslint-disable @typescript-eslint/no-explicit-any */
import { IDRFormatter } from "Modules/intl"

export const chartOptions = (
  xAxisData: any[],
  data: any[],
  barColors: any[],
) => ({
  title: { show: false },
  legend: { show: false },
  grid: { top: 50, right: 20, bottom: 70, left: 100 },
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
      type: "bar",
      data,
      barWidth: 150,
      itemStyle: { borderRadius: [5, 5, 0, 0], color: barColors[0] },
      label: {
        show: true,
        fontSize: "14px",
        position: "top",
        formatter: function (params: { value: number }) {
          return IDRFormatter.formatNoSpace(params.value)
        },
      },
    },
  ],
})

export const chartOptionsMobile = (values: any, names: any) => ({
  title: { show: false },
  legend: { show: false },
  tooltip: {
    trigger: "none",
  },
  series: [
    {
      type: "pie",
      data: Array.isArray(values)
        ? values.map((value: any, index: string | number) => ({
            value,
            name: names[index],
          }))
        : [],
      radius: ["50%", "70%"],
      avoidLabelOverlap: true,
      itemStyle: {
        borderRadius: 10,
        borderColor: "#fff",
        borderWidth: 2,
      },
      label: {
        show: false,
        fontSize: 20,
        fontWeight: "bold",
        position: "center",
        offset: [0, 145],
        formatter: function (params: { value: number; name: string }) {
          const maxWidth = 35 // Adjust this value as needed
          const lines = []
          let line = ""
          const words = params.name.split(" ")

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

          // Include params.value in the formatted result with color style
          const formattedLabel = lines.join("\n")
          return `${formattedLabel}\n${IDRFormatter.formatNoSpace(
            params.value,
          )}`
        },
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 16,
          fontWeight: "bold",
        },
      },
      labelLine: {
        show: false,
      },
    },
  ],
})
