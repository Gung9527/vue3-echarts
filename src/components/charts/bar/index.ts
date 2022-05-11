import { defineComponent, computed, watch, nextTick, onMounted } from 'vue'
import { ECharts } from 'echarts/core'
import barHandler from './core'
import useShareProps from '@/hooks/useShareProps'
import useShareMethods from '@/hooks/useShareMethods'
import useShareRefs from '@/hooks/useShareRefs'
import useShareVNode from '@/hooks/useShareVNode'
import { BarChartHandlerData } from './interfaces'

const shareProps = useShareProps()
const {
  getChartSizeStyle,
  resize,
  initEChartsInstance
} = useShareMethods()

export default defineComponent({
  name: 'v3-bar',

  props: Object.assign({
  }, shareProps),

  setup(props) {
    let echartsInstance: ECharts | undefined = undefined

    // refs
    const { chartRef, ready } = useShareRefs()

    // computed
    const chartSizeStyle = computed(() => getChartSizeStyle(props.width, props.height))
    const option = computed(() => barHandler(props as BarChartHandlerData))

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
    return useShareVNode(this.chartSizeStyle, 'bar')
  }
})