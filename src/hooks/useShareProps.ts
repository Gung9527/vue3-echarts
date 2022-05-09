import { PropType } from 'vue'
import { GridComponentOption } from 'echarts/components'
import { Data, AxisType } from '@/typings/ChartsProps'
import { randomId } from '@/utils'

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
      type: Array as PropType<Array<{name: string, alias: string}>>
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
    grid: {
      type: Object as PropType<GridComponentOption>
    },
    xAxisType: {
      type: String as PropType<AxisType>,
      default: 'category'
    },
    yAxisType: {
      type: String as PropType<AxisType>,
      default: 'value'
    },
  }
}