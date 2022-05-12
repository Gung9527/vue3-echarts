import { ECharts } from 'echarts/core'
import { EChartsOption, SeriesOption } from '../typings/ChartsProps'
import { ref, computed, watch, onMounted, inject } from 'vue'
import useEChartsInstance from './useEChartsInstance'
import useMethods from './useMethods'


export default function(props: any, handler?: (args: any) => EChartsOption) {
  let ec: ECharts | undefined = undefined
  const { init } = useEChartsInstance()
  const { getSizeStyle } = useMethods()

  const inGrid = inject<boolean>('inGrid')

  // ref
  const chartRef = ref<HTMLElement | undefined>(undefined)
  const ready = ref<boolean>(false)

  // computed
  const chartSizeStyle = computed(() => getSizeStyle(props.width, props.height))
  const option = computed(() => handler ? handler(props) : {})

  if (!inGrid) {
    // watch
    watch(chartSizeStyle, () => {
      if (ec) {
        console.log('resized')
      }
    })
    watch(option, (newVal) => {
      if (ec) {
        ec.setOption(newVal)
      }
    })
    watch(ready, () => {
      if (ec) {
        ec.setOption(option.value)
      }
    })
    

    // lifeCycle
    onMounted(() => {
      if (chartRef.value) {
        ec = init(chartRef.value, props.id)
        ready.value = true
      }
    })
  }

  return {
    chartRef,
    chartSizeStyle,
    ready,
    option,
    inGrid
  }
}