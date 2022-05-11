<template>
  <v3-line 
    :width="500" 
    :height="height" 
    :data="seriesData"
    :metrics-alias="metricsAlias"
    :tooltip-setting="tooltipSetting"
    tooltip-trigger="axis"
  ></v3-line>
  <v3-bar 
    :width="500" 
    :height="height" 
    :data="seriesData"
    :metrics-alias="metricsAlias"
    tooltip-trigger="axis"
  ></v3-bar>
  <v3-pie 
    :width="500"
    :height="height" 
    :data="seriesData"
    tooltip-trigger="item"
  ></v3-pie>
</template>

<script setup lang="ts">
import v3Line from '@/components/charts/line'
import v3Bar from '@/components/charts/bar'
import v3Pie from '@/components/charts/pie'
import { Data, MetricsAlias, TooltipSetting } from '@/typings/ChartsProps'
import { ref } from 'vue';

const seriesData: Data = {
  columns: ['day', 'value1', 'value2'],
  rows: [
    { day: 'Mon', value1: 150, value2: 100 },
    { day: 'Tue', value1: 230, value2: 100 },
    { day: 'Wen', value1: 224, value2: 100 },
    { day: 'Thu', value1: 218, value2: 100 },
    { day: 'Fri', value1: 135, value2: 100 },
    { day: 'Sat', value1: 147, value2: 100 },
    { day: 'Sun', value1: 260, value2: 100 },
  ]
}

const metricsAlias: MetricsAlias = {
  value1: '值1',
  value2: '值2'
}

const tooltipSetting: TooltipSetting = {
  borderColor: 'rgba(0, 164, 172, 1)',
  borderWidth: 1,
  backgroundColor: 'rgba(5, 41, 73, 0.6)',
  textStyle: {
    color: '#fff',
  },
  formatter: function (params: any) {
    const title = `<span style="font-size:16px;font-weight:bold">${params[0].name}年</span>`
    let text = ''
    params.forEach((p: any, index: number) => {
      text += `<br>${p.marker}${p.seriesName}&nbsp;<span style="color: ${p.color}">${p.value}${index ? '%' : '公顷'}</span>`
    })
    return title + text
  },
}
const height = ref(300)

</script>

<style>
</style>
