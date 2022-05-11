import { ECharts } from 'echarts/core'
import { EChartsOption } from '../typings/ChartsProps'
import { ref, computed, watch, onMounted } from 'vue'
import useEChartsInstance from './useEChartsInstance'


export default function(props: any, handler: (args: any) => EChartsOption) {
  let ec: ECharts | undefined = undefined
  const { init } = useEChartsInstance()

  // ref
  const chartRef = ref<HTMLElement | undefined>(undefined)
  const ready = ref<boolean>(false)

  // computed
  const chartSizeStyle = computed(() => getChartSizeStyle(props.width, props.height))
  const option = computed(() => handler(props))

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

  // methods
  function getChartSizeStyle(width: string | number, height: string | number) {
    const reg = /^-?[0-9]+(.)?[0-9]+(px|vh|vw|em|rem|%)$/g
    const sizeObj = {
      width: '',
      height: ''
    }
    if (typeof width === 'string' && reg.test(width)) {
      sizeObj.width = width
    } else if (typeof width === 'number' || !isNaN(Number(width))) {
      sizeObj.width = `${width}px`
    } else {
      sizeObj.width = '500px'
    }
  
    if (typeof height === 'string' && reg.test(height)) {
      sizeObj.height = height
    } else if (typeof height === 'number' || !isNaN(Number(height))) {
      sizeObj.height = `${height}px`
    } else {
      sizeObj.height = '300px'
    }
  
    return sizeObj
  }

  return {
    chartRef,
    chartSizeStyle,
    option,
    ready
  }
}