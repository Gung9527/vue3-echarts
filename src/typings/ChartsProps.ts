import { XAXisOption, YAXisOption } from "echarts/types/dist/shared"

export type Data = {
  columns: Array<string>,
  rows: Array<{ [k: string]: string | number }>
}

export type AxisType = 'category' | 'value' | 'time' | 'log'

export type AxisSettings = Omit<XAXisOption, 'data' | 'type'> | Omit<YAXisOption, 'data' | 'type'>