import { cloneDeep } from 'lodash-unified'
import { BarChartHandlerData } from './interfaces'
import { SeriesOption, AxisPointerOption, TooltipOption, EChartsOption } from '../../../typings/ChartsProps'
import { getCategoryAxis } from '../../../utils/echartsUtil'

interface Metrics {
  [k: string]: (string | number)[]
}


function getXAxis(dimension: (string | number)[], axisType: BarChartHandlerData['xAxisType'], axisSettings?: BarChartHandlerData['xAxisSettings']) {
  switch (axisType) {
    case 'category':
      return getCategoryAxis([dimension], axisSettings)
    default:
      return {
        type: axisType
      }
  }
}

function getYAxis(dimension: (string | number)[], axisType: BarChartHandlerData['yAxisType'], axisSettings?: BarChartHandlerData['yAxisSettings']) {
  switch (axisType) {
    case 'category':
      return getCategoryAxis([dimension], axisSettings)
    default:
      return {
        type: axisType
      }
  }
}

function getLegend() {

}

function getTooltip(trigger: BarChartHandlerData['tooltipTrigger'], visible: boolean, setting?: BarChartHandlerData['tooltipSetting']) {
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

function getAxisPointer(type: BarChartHandlerData['axisPointerType'], visible: boolean, setting?: BarChartHandlerData['axisPointerSetting']) {
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

function getSeries(metrics: Metrics, metricsAlias: BarChartHandlerData['metricsAlias']) {
  const series: SeriesOption[] = []
  Object.keys(metrics).forEach((key, i) => {
    const tempSeries: SeriesOption = {
      type: 'bar',
      name: metricsAlias ? (metricsAlias[key] || key) : key,
      data: metrics[key]
    }
    series.push(tempSeries)
  })
  return series
}

export default function(args: BarChartHandlerData) {
  const { 
    data,
    dimensionIndex,
    metricsAlias,
    xAxisType,
    xAxisSettings,
    yAxisType,
    yAxisSettings,
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
  const xAxis = getXAxis(dimension, xAxisType, xAxisSettings)
  const yAxis = getYAxis(dimension, yAxisType, yAxisSettings)
  const series = getSeries(metrics, metricsAlias)

  return { axisPointer, tooltip, xAxis, yAxis, series } as EChartsOption
}