import { defineComponent, PropType, computed, h, ref, onMounted, watch } from 'vue'
import { ECharts } from 'echarts/core'
import { LineSeriesExtraSetting, LineSeriesDataExtraSetting } from './interfaces'
import line from './core'
import useShareProps from '@/hooks/useShareProps'
import useShareMethods from '@/hooks/useShareMethods'
import useShareRefs from '@/hooks/useShareRefs'
import useShareVNode from '@/hooks/useShareVNode'


const { 
  getChartSizeStyle,
  initEChartsInstance,
  resize
} = useShareMethods()

const shareProps = useShareProps()

export default defineComponent({
  name: 'v3-line',

  props: Object.assign({
    seriesExtraSetting: {
      type: Array as PropType<Array<LineSeriesExtraSetting>>
    }
  }, shareProps),

  setup(props) {
    let echartsInstance: ECharts | undefined = undefined

    // refs
    const { chartRef } = useShareRefs()

    // computed
    const chartSizeStyle = computed(() => getChartSizeStyle(props.width, props.height))
    const option = computed(() => line(props.data!, props.xAxisType, props.yAxisType))

    // watch
    watch(chartSizeStyle, () => {
      if (echartsInstance) {
        resize(echartsInstance)
      }
    })

    // lifeCycle
    onMounted(() => {
      echartsInstance = initEChartsInstance(props.id, chartRef.value)
      if (echartsInstance) {
        echartsInstance.setOption(option.value)
      } else {
        console.error('echarts doesn\'t init')
      }
    })

    return {
      chartSizeStyle,
      chartRef
    }
  },

  render() {
    return useShareVNode(this.chartSizeStyle, 'line')
  }
})
