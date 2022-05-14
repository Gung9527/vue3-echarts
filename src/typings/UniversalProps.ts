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

export type EChartsInitOpts = {
  devicePixelRatio?: number,
  renderer?: 'canvas' | 'svg',
  useDirtyRect?: boolean,
  ssr?: boolean,
  locale?: string
}

export type ChartHandlerArgs = {
  data: Data,
  dimensionIndex: number,
  metricsAlias?: MetricsAlias,
  xAxisType: AxisType,
  yAxisType: AxisType,
  xAxisSetting?: XAxisSetting
  yAxisSetting?: YAxisSetting
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

export type Dimensions = {
  [k: string]: unknown[]
}

export type Metrics = {
  [k: string]: {
    dimName: string,
    data: (string | number)[],
    xAxisIndex: 0 | 1,
    yAxisIndex: 0 | 1
  }
}