/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Stunting } from "#graphql/graphql.ts"

export const barColors = ["#B9E581", "#4A977ECC", "#ffa8a8"]

const xAxisData = [
  "Keluarga Sasaran",
  "Berisiko",
  "Baduta",
  "Balita",
  "Pasangan Usia Subur (PUS)",
  "PUS Hamil",
]

export const chartOptions = (data: Stunting[]) => ({
  title: {
    show: false,
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
    },
  },
  legend: {
    show: true,
    bottom: -5,
    textStyle: {
      fontSize: 14,
      fontWeight: "normal",
    },
  },
  grid: {
    top: 50,
    right: 20,
    bottom: 60,
    left: 45,
  },
  xAxis: {
    type: "category",
    data: xAxisData,
    axisLabel: {
      interval: 0, // Display all labels
      textStyle: {
        fontSize: "14px",
        fontWeight: "normal",
      },
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
    axisLine: {
      show: false,
    },
    axisTick: {
      show: false,
    },
    splitLine: {
      show: true,
      lineStyle: {
        type: "solid",
      },
    },
    boundaryGap: true,
  },
  yAxis: {
    type: "value",
    min: 0,
    axisTick: {
      show: false,
    },
    axisLine: {
      show: false,
      // lineStyle: {
      //   width: 0,
      //   type: "dashed",
      // },
    },
    splitLine: {
      show: true,
      lineStyle: {
        type: "solid",
      },
    },
  },
  series: data.map((item, index) => ({
    name: `Data Tahun ${item.year}`,
    type: "bar",
    data: [
      item.keluargaSasaran,
      item.berisiko,
      item.baduta,
      item.balita,
      item.pasanganUsiaSubur,
      item.pasanganUsiaSuburHamil,
    ],
    label: {
      show: true,
      // formatter: function (params) {
      //   // Format your labels as needed
      //   return formatAngka(params.value);
      // },
      position: "top",
    },
    itemStyle: {
      borderRadius: [5, 5, 0, 0],
      color: barColors[index % barColors.length],
    },
    cursor: "auto",
  })),
})

export const chartOptionsMobile = (data: Stunting[]) => ({
  title: {
    show: false,
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
    },
  },
  legend: {
    show: true,
    bottom: -5,
    textStyle: {
      fontSize: 12,
      fontWeight: "normal",
    },
  },
  grid: {
    top: 20,
    right: 10,
    bottom: 150,
    left: 30,
  },
  xAxis: {
    type: "category",
    data: [
      "Keluarga Sasaran",
      "Berisiko",
      "Baduta",
      "Balita",
      "Pasangan Usia Subur (PUS)",
      "PUS Hamil",
    ],
    axisLabel: {
      interval: 0, // Display all labels
      // rotate: 40,
      // margin: 17,
      textStyle: {
        fontSize: "10px",
        fontWeight: "normal",
      },
      formatter: function (value: any) {
        // Define a maximum width
        const maxWidth = 10 // Adjust this value as needed
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
    axisLine: {
      show: false,
    },
    axisTick: {
      show: false,
    },
    splitLine: {
      show: true,
      lineStyle: {
        type: "solid",
      },
    },
    boundaryGap: true,
  },
  yAxis: {
    type: "value",
    min: 0,
    axisTick: {
      show: false,
    },
    axisLine: {
      show: false,
      // lineStyle: {
      //   width: 0,
      //   type: "dashed",
      // },
    },
    axisLabel: {
      textStyle: {
        fontSize: "10px",
        fontWeight: "normal",
      },
    },
    splitLine: {
      show: true,
      lineStyle: {
        type: "solid",
      },
    },
  },
  series: data.map((item, index) => ({
    name: `Data Tahun ${item.year}`,
    type: "bar",
    data: [
      item.keluargaSasaran,
      item.berisiko,
      item.baduta,
      item.balita,
      item.pasanganUsiaSubur,
      item.pasanganUsiaSuburHamil,
    ],
    label: {
      show: true,
      // formatter: function (params) {
      //   // Format your labels as needed
      //   return formatAngka(params.value);
      // },
      position: "top",
      fontSize: 10,
    },
    itemStyle: {
      borderRadius: [5, 5, 0, 0],
      color: barColors[index % barColors.length],
    },
    cursor: "auto",
  })),
  dataZoom: [
    {
      type: "slider",
      start: 50,
      end: 100,
      filterMode: "empty",
      zoomOnMouseWheel: false,
      moveOnMouseMove: true,
      moveOnMouseWheel: true,
      handleSize: 10,
      showDetail: false,
      showDataShadow: false,
      bottom: 70,
      orient: "horizontal",
    },
  ],
})
