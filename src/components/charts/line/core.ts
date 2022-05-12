import { cloneDeep } from 'lodash-unified'
import type { LineChartHandlerArgs } from './interfaces'
import type { SeriesOption, AxisPointerOption, TooltipOption, EChartsOption } from '../../../typings/ChartsProps'
import { getCategoryAxis } from '../../../utils/echartsUtil'

interface Metrics {
  [k: string]: (string | number)[]
}


function getXAxis(dimension: (string | number)[], axisType: LineChartHandlerArgs['xAxisType'], axisSettings?: LineChartHandlerArgs['xAxisSetting']) {
  switch (axisType) {
    case 'category':
      return getCategoryAxis([dimension], axisSettings)
    default:
      return Object.assign({
        type: axisType
      }, cloneDeep(axisSettings))
  }
}

function getYAxis(dimension: (string | number)[], axisType: LineChartHandlerArgs['yAxisType'], axisSettings?: LineChartHandlerArgs['yAxisSetting']) {
  switch (axisType) {
    case 'category':
      return getCategoryAxis([dimension], axisSettings)
    default:
      return Object.assign({
        type: axisType
      }, cloneDeep(axisSettings))
  }
}

function getLegend() {

}

function getTooltip(trigger: LineChartHandlerArgs['tooltipTrigger'], visible: boolean, setting?: LineChartHandlerArgs['tooltipSetting']) {
  if (!visible) {
    return {} as TooltipOption
  }

  const tooltip: TooltipOption = {}
  tooltip.trigger = trigger
  tooltip.show = true
  if (setting) {
    Object.assign(tooltip, cloneDeep(setting))
  }
  return tooltip
}

function getAxisPointer(type: LineChartHandlerArgs['axisPointerType'], visible: boolean, setting?: LineChartHandlerArgs['axisPointerSetting']) {
  if (!visible) {
    return {} as AxisPointerOption
  }

  const axisPointer: AxisPointerOption = {}
  axisPointer.type = type
  axisPointer.show = visible
  if (setting) {
    Object.assign(axisPointer, cloneDeep(setting))
  }
  return axisPointer
}

function getSeries(metrics: Metrics, metricsAlias: LineChartHandlerArgs['metricsAlias']) {
  const series: SeriesOption[] = []
  Object.keys(metrics).forEach((key, i) => {
    const tempSeries: SeriesOption = {
      type: 'line',
      name: metricsAlias ? (metricsAlias[key] || key) : key,
      data: metrics[key]
    }
    series.push(tempSeries)
  })
  return series
}

export default function(args: LineChartHandlerArgs) {
  const { 
    data,
    dimensionIndex,
    metricsAlias,
    xAxisType,
    xAxisSetting,
    yAxisType,
    yAxisSetting,
    axisPointerVisible,
    axisPointerType,
    axisPointerSetting,
    tooltipVisible,
    tooltipTrigger,
    tooltipSetting
  } = args

  const _dimensionIndex = dimensionIndex || 0

  const dimension = data.rows.map((row) => {
    return row[data.columns[_dimensionIndex]]
  })

  const metrics: Metrics = {}
  data.columns.forEach((col, i) => {
    if (i !== _dimensionIndex) {
      metrics[col] = data.rows.map((row) => row[col])
    }
  })


  const axisPointer = getAxisPointer(axisPointerType, axisPointerVisible, axisPointerSetting)
  const tooltip = getTooltip(tooltipTrigger, tooltipVisible, tooltipSetting)
  const xAxis = getXAxis(dimension, xAxisType, xAxisSetting)
  const yAxis = getYAxis(dimension, yAxisType, yAxisSetting)
  const series = getSeries(metrics, metricsAlias)

  return { axisPointer, tooltip, xAxis, yAxis, series } as EChartsOption
}