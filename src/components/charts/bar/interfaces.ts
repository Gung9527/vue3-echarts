import { ChartHandlerArgs } from '@/typings/UniversalProps'
import { BarSeriesOption } from '@/typings/ChartsProps'

export interface BarChartHandlerArgs extends ChartHandlerArgs {
  seriesSettings?: BarSeriesOption[]
}