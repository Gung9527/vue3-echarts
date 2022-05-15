import { ChartHandlerArgs } from '../../../typings'
import { PieSeriesOption } from 'echarts/charts'

export interface PieChartHandlerArgs extends ChartHandlerArgs {
  seriesSettings: PieSeriesOption[]
}