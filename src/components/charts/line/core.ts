import { LineChartHandlerArgs } from './interfaces'
import { EChartsOption } from 'echarts'
import { 
  getDimensionsAndMetrics,
  getAxis,
  getAxisPointer,
  getLegend,
  getSeries,
  getTooltip
} from '../../../utils'
import { GridSeriesSetting } from '../../../typings'

export default function(args: LineChartHandlerArgs) {
  const { 
    data,
    dimensionIndex,
    metricsAlias,
    seriesSettings,
    xAxisType,
    xAxisSetting,
    yAxisType,
    yAxisSetting,
    legendType,
    legendVisible,
    legendSetting,
    axisPointerVisible,
    axisPointerType,
    axisPointerSetting,
    tooltipVisible,
    tooltipTrigger,
    tooltipSetting,
    gridSetting
  } = args

  const { dimensions, metrics } = getDimensionsAndMetrics(data, dimensionIndex, metricsAlias)
  const dimensionData = dimensions[data.columns[dimensionIndex]]

  const axisPointer = getAxisPointer(axisPointerType, axisPointerVisible, axisPointerSetting)
  const tooltip = getTooltip(tooltipTrigger, tooltipVisible, tooltipSetting)
  const legend = getLegend(legendType, legendVisible, legendSetting)
  const xAxis = getAxis(xAxisType, dimensionData, xAxisSetting)
  const yAxis = getAxis(yAxisType, dimensionData, yAxisSetting)

  let series: GridSeriesSetting[] = []
  if (seriesSettings) {
    seriesSettings.forEach((setting) => setting.type = 'line')
    series = getSeries(metrics, seriesSettings)!
  } else {
    series = getSeries(metrics, [{ type: 'line' }])!
  }

  const option = { axisPointer, tooltip, legend, xAxis, yAxis, series } as EChartsOption
  if (gridSetting) {
    option.grid = gridSetting
  }
  return option
}