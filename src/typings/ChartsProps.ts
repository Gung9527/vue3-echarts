import { 
  XAXisOption, 
  YAXisOption,
  GridOption,
  LegendOption, 
  TooltipOption,
  AxisPointerOption
} from 'echarts/types/dist/shared'

export type Data = {
  columns: Array<string>,
  rows: Array<{ [k: string]: string | number }>
}

export type MetricsAlias = { [k: string]: string }

export type AxisType = 'category' | 'value' | 'time' | 'log'

export type XAxisSetting = Omit<XAXisOption, 'data' | 'type'>

export type YAxisSetting = Omit<YAXisOption, 'data' | 'type'>

export type GridSetting = GridOption

export type LegendSetting = Omit<LegendOption, 'type' | 'show'>

export type TooltipSetting = Omit<TooltipOption, 'show' | 'trigger'>

export type AxisPointerSetting = Omit<AxisPointerOption, 'show' | 'type'>

export type { SeriesOption, EChartsOption, AxisPointerOption, TooltipOption } from 'echarts/types/dist/shared'