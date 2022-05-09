import { LineSeriesOption } from 'echarts/charts'

export type LineSeriesExtraSetting = {
  metricsName: string,
  setting: Omit<LineSeriesOption, 'data' | 'type'>
}

export type LineSeriesDataExtraSetting = NonNullable<LineSeriesOption['data']>