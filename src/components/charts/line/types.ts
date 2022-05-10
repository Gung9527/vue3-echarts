import {
  Data,
  MetricsAlias,
  AxisType,
  XAxisSetting,
  YAxisSetting,
  LegendSetting,
  TooltipSetting,
  AxisPointerSetting
} from '@/typings/ChartsProps'

export type LineChartHandlerData = {
  data: Data,
  dimensionIndex: number,
  metricsAlias?: MetricsAlias,
  xAxisType: AxisType,
  yAxisType: AxisType,
  xAxisSettings?: XAxisSetting | Array<XAxisSetting>
  yAxisSettings?: YAxisSetting | Array<YAxisSetting>
  legendVisible: boolean,
  legendType: 'plain' | 'scroll',
  legendSetting?: LegendSetting,
  tooltipVisible: boolean,
  tooltipTrigger: 'item' | 'axis' | 'none',
  tooltipSetting?: TooltipSetting,
  axisPointerVisible: boolean,
  axisPointerType: 'line' | 'shadow' | 'none',
  axisPointerSetting?: AxisPointerSetting
}