import { AxisType, Data, MetricsAlias, XAxisSetting, YAxisSetting } from '@/typings/ChartsProps'
import { ChartHandlerArgs } from '@/typings/UniversalProps'

type ChartType = 'bar' | 'line'
type BaseType = Omit<
  ChartHandlerArgs, 
    'data'
  | 'dimensionIndex'
  | 'metricsAlias'
  | 'xAxisType'
  | 'yAxisType'
  | 'xAxisSetting'
  | 'yAxisSetting'
>

export interface GridHandlerData extends BaseType {
  datas: {
    type: ChartType,
    data: Data,
    dimensionIndex: number,
    xAxisIndex: 0 | 1,
    yAxisIndex: 0 | 1,
    metricsAlias?: MetricsAlias
  }[],
  xAxisTypes: AxisType[],
  xAxisSettings: XAxisSetting[],
  yAxisTypes: AxisType[],
  yAxisSettings: YAxisSetting[]
}
