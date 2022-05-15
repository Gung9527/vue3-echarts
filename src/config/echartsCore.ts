import * as echarts from 'echarts/core'

import {
  BarChart,
  LineChart,
  PieChart
} from 'echarts/charts'

import {
  LegendComponent,
  AxisPointerComponent,
  TitleComponent,
  TooltipComponent,
  GridComponent,
} from 'echarts/components'


import { LabelLayout, UniversalTransition } from 'echarts/features'

import { CanvasRenderer, SVGRenderer } from 'echarts/renderers'

echarts.use([
  AxisPointerComponent,
  LegendComponent,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
  SVGRenderer,
  LineChart,
  BarChart,
  PieChart
])

const alreadyUseComponents = [ 'AxisPointerComponent', 'TitleComponent', 'TooltipComponent', 'GridComponent' ]
const alreadyUseCharts = [ 'BarChart', 'PieChart', 'LineChart' ]

const echartsCore = echarts
export { 
  echartsCore,
  alreadyUseComponents,
  alreadyUseCharts
}