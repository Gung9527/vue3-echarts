<template>
  <div class="v3-echarts__grid-container" :style="sizeStyle">
    <div class="v3-echarts__grid-container-main" ref="echartsContainerRef"></div>
    <slot></slot>
  </div>
</template>

<script lang='ts' setup>
import { onMounted, ref, computed, reactive, provide, watch, nextTick } from 'vue'
import { EChartsInitOpts, GridPositionSettings, AxisBaseSettings } from '@/typings/GridProps'
import useEChartsInstance from '@/hooks/useEChartsInstance'
import { randomId } from '@/utils'
import { ECharts } from 'echarts/core';

const { init } = useEChartsInstance()
let ehcartsInstance: ECharts | null = null

// props
const props = withDefaults(defineProps<{
  id?: string,
  width?: number,
  height?: number,
  theme?: string,
  initOpts?: EChartsInitOpts,
  positionSettings?: GridPositionSettings,
  xAxisSettings?: Array<AxisBaseSettings>,
  yAxisSettings?: Array<AxisBaseSettings>
}>(), {
  id: randomId(),
  width: 500,
  height: 300
})

// ref
const echartsContainerRef = ref()
const series = reactive<any[]>([])

// computed
const sizeStyle = computed(() => ({
  width: `${props.width}px`,
  height: `${props.height}px`
}))

// watch
watch(series, (newVal) => {
  nextTick(() => {
    if (ehcartsInstance) {
      const options = {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: newVal
      }
      ehcartsInstance.setOption(options)
    }
  })

})

// lifecycle
onMounted(() => {
  const dom = echartsContainerRef.value as HTMLElement
  if (dom) {
    ehcartsInstance = init(dom, props.id, props.theme, props.initOpts)
  }
})

function appendSeries(_series: any) {
  series.push(_series)
}

provide('appendSeriesFunc', appendSeries)

defineExpose({
  id: props.id
})
</script>

<style>
.v3-echarts__grid-container .v3-echarts__grid-container-main {
  width: 100%;
  height: 100%
}
</style>