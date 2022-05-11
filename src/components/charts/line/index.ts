import { defineComponent, PropType, computed, h, ref, onMounted, watch, nextTick } from 'vue'
import { ECharts } from 'echarts/core'
import lineHandler from './core'
import useShareProps from '@/hooks/useShareProps'
import useShareMethods from '@/hooks/useShareMethods'
import useShareRefs from '@/hooks/useShareRefs'
import useShareVNode from '@/hooks/useShareVNode'
import { LineChartHandlerData } from './interfaces'


const { 
  getChartSizeStyle,
  initEChartsInstance,
  resize
} = useShareMethods()

const shareProps = useShareProps()

export default defineComponent({
  name: 'v3-line',

  props: Object.assign({
  }, shareProps),

  setup(props) {
    let echartsInstance: ECharts | undefined = undefined

    // refs
    const { chartRef, ready } = useShareRefs()

    // computed
    const chartSizeStyle = computed(() => getChartSizeStyle(props.width, props.height))
    const option = computed(() => lineHandler(props as LineChartHandlerData))

    // watch
    watch(chartSizeStyle, () => {
      if (echartsInstance) {
        resize(echartsInstance)
      }
    })
    watch(option, (newVal) => {
      if (echartsInstance) {
        echartsInstance.setOption(newVal)
      }
    })
    watch(ready, () => {
      if (echartsInstance) {
        echartsInstance.setOption(option.value)
      }
    })

    // lifeCycle
    onMounted(() => {
      echartsInstance = initEChartsInstance(props.id, chartRef.value)
      ready.value = true
    })

    return {
      chartSizeStyle,
      chartRef,
      option,
      ready
    }
  },

  render() {
    return useShareVNode(this.chartSizeStyle, 'line')
  }
})
