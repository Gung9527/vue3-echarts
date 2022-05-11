import { PropType } from 'vue'
import { randomId } from '@/utils'
import type { 
  Data,
  MetricsAlias,
  AxisType,
  XAxisSetting,
  YAxisSetting,
  AxisPointerSetting,
  GridSetting,
  LegendSetting,
  TooltipSetting
} from '@/typings/ChartsProps'


export default function () {
  return {
    data: {
      type: Object as PropType<Data>,
      required: true
    },
    dimensionIndex: {
      type: Number,
      default: 0
    },
    metricsAlias: {
      type: Object as PropType<MetricsAlias>
    },
    id: {
      type: String,
      default: () => randomId()
    },
    width: {
      type: [Number, String],
      default: 500
    },
    height: {
      type: [Number, String],
      default: 300
    },
    gridSetting: {
      type: Object as PropType<GridSetting>
    },
    xAxisType: {
      type: String as PropType<AxisType>,
      default: 'category'
    },
    yAxisType: {
      type: String as PropType<AxisType>,
      default: 'value'
    },
    xAxisSettings: {
      type: Object as PropType<XAxisSetting | Array<XAxisSetting>>
    },
    yAxisSettings: {
      type: Object as PropType<YAxisSetting | Array<YAxisSetting>>
    },
    legendVisible: {
      type: Boolean,
      default: true
    },
    legendType: {
      type: String as PropType<'plain' | 'scroll'>,
      default: 'plain'
    },
    legendSetting: {
      type: Object as PropType<LegendSetting>
    },
    tooltipVisible: {
      type: Boolean,
      default: true
    },
    tooltipTrigger: {
      type: String as PropType<'item' | 'axis' | 'none'>,
      default: 'item'
    },
    tooltipSetting: {
      type: Object as PropType<TooltipSetting>
    },
    axisPointerVisible: {
      type: Boolean,
      default: false
    },
    axisPointerType: {
      type: String as PropType<'line' | 'shadow' | 'none'>,
      default: 'line'
    },
    axisPointerSetting: {
      type: Object as PropType<AxisPointerSetting>
    }
  }
}