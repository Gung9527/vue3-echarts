import { ChartHandlerArgs } from '@/typings/UniversalProps'
import { LineSeriesOption } from '@/typings/ChartsProps'

export interface LineChartHandlerArgs extends ChartHandlerArgs {
  seriesSettings?: LineSeriesOption[]
}