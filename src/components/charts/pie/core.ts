import { PieChartHandlerArgs } from './interfaces'
import { EChartsOption } from 'echarts'
import { 
  getDimensionsAndMetrics,
  getAxis,
  getAxisPointer,
  getLegend,
  getSeries,
  getTooltip
} from '@/utils'
import { Data, GridSeriesSetting, PieSeriesOption } from '@/typings'

function getPieSeries(data: Data) {
  if (data.columns.length < 2) {
    console.error('data columns amount should be 2 while using pie chart')
    return {}
  }

  const series: PieSeriesOption = {
    type: 'pie',
    data: []
  }
  data.rows.forEach((row, i) => {
    series.data?.push({
      name: row[data.columns[0]] as string,
      value: row[data.columns[1]] as number
    })
  })

  return series
}

export default function(args: PieChartHandlerArgs) {
  const { 
    data,
    metricsAlias,
    seriesSettings,
    legendType,
    legendVisible,
    legendSetting,
    tooltipVisible,
    tooltipTrigger,
    tooltipSetting
  } = args


  const tooltip = getTooltip(tooltipTrigger, tooltipVisible, tooltipSetting)
  const legend = getLegend(legendType, legendVisible, legendSetting)

  const series = getPieSeries(data)

  const option = { tooltip, legend, series } as EChartsOption
  return option
}