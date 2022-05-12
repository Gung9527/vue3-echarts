import { cloneDeep } from 'lodash-unified'
import { BarChartHandlerArgs } from './interfaces'
import { BarSeriesOption, AxisPointerOption, TooltipOption, EChartsOption } from '../../../typings/ChartsProps'
import { getCategoryAxis } from '../../../utils/echartsUtil'

interface Metrics {
  [k: string]: (string | number)[]
}


function getXAxis(dimension: (string | number)[], axisType: BarChartHandlerArgs['xAxisType'], axisSettings?: BarChartHandlerArgs['xAxisSetting']) {
  switch (axisType) {
    case 'category':
      return getCategoryAxis([dimension], axisSettings)
    default:
      return Object.assign({
        type: axisType
      }, cloneDeep(axisSettings))
  }
}

function getYAxis(dimension: (string | number)[], axisType: BarChartHandlerArgs['yAxisType'], axisSettings?: BarChartHandlerArgs['yAxisSetting']) {
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

function getTooltip(trigger: BarChartHandlerArgs['tooltipTrigger'], visible: boolean, setting?: BarChartHandlerArgs['tooltipSetting']) {
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

function getAxisPointer(type: BarChartHandlerArgs['axisPointerType'], visible: boolean, setting?: BarChartHandlerArgs['axisPointerSetting']) {
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

function getSeries(metrics: Metrics, setting: BarChartHandlerArgs['seriesSettings'], metricsAlias: BarChartHandlerArgs['metricsAlias']) {
  const series: BarSeriesOption[] = []
  Object.keys(metrics).forEach((key, i) => {
    const tempSeries: BarSeriesOption = {
      type: 'bar',
      name: metricsAlias ? (metricsAlias[key] || key) : key,
      data: metrics[key]
    }
    if (Array.isArray(setting) && setting[i]) {
      Object.assign(tempSeries, setting[i])
    }
    series.push(tempSeries)
  })
  return series
}

export default function(args: BarChartHandlerArgs) {
  const { 
    data,
    dimensionIndex,
    metricsAlias,
    seriesSettings,
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
  const series = getSeries(metrics, seriesSettings, metricsAlias)

  return { axisPointer, tooltip, xAxis, yAxis, series } as EChartsOption
}