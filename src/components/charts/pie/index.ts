import { defineComponent, computed, watch, nextTick, onMounted } from 'vue'
import { ECharts } from 'echarts/core'
import useShareProps from '@/hooks/useShareProps'
import useShareMethods from '@/hooks/useShareMethods'
import useShareRefs from '@/hooks/useShareRefs'
import useShareVNode from '@/hooks/useShareVNode'

const shareProps = useShareProps()
const {
  getChartSizeStyle,
  resize,
  initEChartsInstance
} = useShareMethods()

export default defineComponent({
  props: Object.assign({}, shareProps),

  setup(props) {
    const chartSizeStyle = computed(() => getChartSizeStyle(props.width, props.height))

    return {
      chartSizeStyle
    }
  },

  render() {
    return useShareVNode(this.chartSizeStyle, 'pie')
  }
})