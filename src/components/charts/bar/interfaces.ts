import { ChartHandlerArgs } from '@/typings/UniversalProps'
import { BarSeriesOption } from '../../../typings'

export interface BarChartHandlerArgs extends ChartHandlerArgs {
  seriesSettings?: BarSeriesOption[]
}