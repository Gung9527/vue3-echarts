import * as echarts from 'echarts/core'

import {
  LineChart
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
  LineChart
])


const echartsCore = echarts
export default echartsCore