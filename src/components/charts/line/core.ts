import type { Data, AxisType, AxisSettings } from "@/typings/ChartsProps"
import { LineSeriesOption } from 'echarts/charts'
import { EChartsOption } from "echarts/types/dist/shared"

function getBaseAxis(data: Data, axisType: AxisType, dimensionIndex: number = 0) {
  const { columns, rows } = data
  if (axisType === 'category') {
    const dimension = columns[dimensionIndex]
    const data = rows.map((row) => row[dimension])

    return {
      type: 'category',
      data
    }
  } else {
    return {
      type: axisType
    }
  }
}

function getXAxis(data: Data, axisType: AxisType) {
  const baseAxis = getBaseAxis(data, axisType)
  return baseAxis
}

function getYAxis(data: Data, axisType: AxisType) {
  const baseAxis = getBaseAxis(data, axisType)
  return baseAxis
}

function getSeries(data: Data) {
  const { columns, rows } = data
  const series: LineSeriesOption[] = []
  for (let i = 1; i < columns.length; i++) {
    series.push({
      type: 'line',
      data: rows.map((row) => row[columns[i]])
    })
  }

  return series
}

export default function (data: Data, xAxisType: AxisType, yAxisType: AxisType, xAxisSettings?: AxisSettings, yAxisSettings?: AxisSettings) {
  const xAxis = getXAxis(data, xAxisType)
  const yAxis = getYAxis(data, yAxisType)
  const series = getSeries(data)

  return { xAxis, yAxis, series} as EChartsOption
}