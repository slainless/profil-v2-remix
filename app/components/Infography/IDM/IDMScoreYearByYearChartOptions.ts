/* eslint-disable @typescript-eslint/no-explicit-any */
import type { IDM } from "Services/idm.ts"

export const chartOptions = (data: IDM.Main[]) => ({
  title: { show: false },
  legend: { show: false },
  grid: {},
  xAxis: [
    {
      type: "category",
      data: data.map((v) => v.SUMMARIES.TAHUN),
      axisLabel: {
        interval: 0, // Display all labels
        textStyle: { fontSize: "14px", fontWeight: 500 },
      },
      axisTick: { show: false },
      axisLine: {
        lineStyle: { width: 0, type: "dashed" },
      },
      splitLine: {
        show: true,
        lineStyle: { type: "dashed" },
      },
      inverse: true,
    },
  ],
  yAxis: [
    {
      type: "value",
      min: 0,
      max: 1,
      splitNumber: 10,
      data: data,
      axisLabel: {
        interval: 0, // Display all labels
        textStyle: { fontSize: "14px", fontWeight: 500 },
      },
      splitLine: {
        show: true,
        lineStyle: { type: "dashed" },
      },
    },
  ],
  series: [
    {
      type: "line",
      data: data.map((v) => v.SUMMARIES.SKOR_SAAT_INI),
      symbolSize: 15,
      color: "#FFB9A1",
      inverse: true,
    },
  ],
  tooltip: {
    trigger: "axis",
    axisPointer: { type: "shadow" },
    formatter: function (params: any) {
      const current = data[params[0].dataIndex] as IDM.Main
      return `<b>Tahun ${
        current.SUMMARIES.TAHUN
      }: ${current.SUMMARIES.SKOR_SAAT_INI.toFixed(4)} (${
        current.SUMMARIES.STATUS
      })</b>`
    },
  },
})

export const chartOptionsMobile = (data: IDM.Main[]) => ({
  title: { show: false },
  legend: { show: false },
  grid: { top: 20, right: 20, bottom: 30, left: 35 },
  xAxis: [
    {
      type: "category",
      data: data.map((v) => v.SUMMARIES.TAHUN),
      axisLabel: {
        interval: 0, // Display all labels
        // textStyle: { fontSize: "14px", fontWeight: 500 },
      },
      axisTick: { show: false },
      axisLine: {
        lineStyle: { width: 0, type: "dashed" },
      },
      splitLine: {
        show: true,
        lineStyle: { type: "dashed" },
      },
      inverse: true,
    },
  ],
  yAxis: [
    {
      type: "value",
      min: 0,
      max: 1,
      splitNumber: 10,
      data: data,
      axisLabel: {
        interval: 0, // Display all labels
        // textStyle: { fontSize: "14px", fontWeight: 500 },
      },
      splitLine: {
        show: true,
        lineStyle: { type: "dashed" },
      },
    },
  ],
  series: [
    {
      type: "line",
      data: data.map((v) => v.SUMMARIES.SKOR_SAAT_INI),
      symbolSize: 10,
      color: "#FFB9A1",
      inverse: true,
    },
  ],
  tooltip: {
    trigger: "axis",
    axisPointer: { type: "shadow" },
    formatter: function (params: any) {
      const current = data[params[0].dataIndex]
      return `<b>Tahun ${
        current.SUMMARIES.TAHUN
      }: ${current.SUMMARIES.SKOR_SAAT_INI.toFixed(4)} (${
        current.SUMMARIES.STATUS
      })</b>`
    },
  },
})
