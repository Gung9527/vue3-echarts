import * as echarts from 'echarts/core'

import {
  BarChart,
  LineChart,
  PieChart
} from 'echarts/charts'

import {
  AxisPointerComponent,
  TitleComponent,
  TooltipComponent,
  GridComponent,
} from 'echarts/components'


import { LabelLayout, UniversalTransition } from 'echarts/features'

import { CanvasRenderer, SVGRenderer } from 'echarts/renderers'

echarts.use([
  AxisPointerComponent,
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


const echartsCore = echarts
export default echartsCore