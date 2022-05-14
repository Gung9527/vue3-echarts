<template>
  <!-- <v3-bar
    :data="barData"
    :metrics-alias="metricsAlias"
    :x-axis-setting="xAxisSetting"
    :y-axis-type="'category'"
    :x-axis-type="'value'"
    :series-settings="seriesSettings"
    tooltip-trigger="axis"
  ></v3-bar> -->
  <v3-grid>
    <v3-bar
      :data="barData"
      :metrics-alias="metricsAlias"
    ></v3-bar>
    <v3-line :data="lineData" :y-axis-index="1"></v3-line>
  </v3-grid>
</template>

<script setup lang="ts">
import v3Grid from '@/components/containers/grid'
import v3Bar from '@/components/charts/bar'
import v3Line from '@/components/charts/line'
import { Data, MetricsAlias, TooltipSetting, XAxisSetting, BarSeriesOption } from '@/typings/ChartsProps'
import { ref } from 'vue'


const barData: Data = {
  columns: ['year', 'value'],
  rows: [
    { year: '2013', value: 244423.85 },
    { year: '2014', value: 245011.15 },
    { year: '2015', value: 245624.16 },
    { year: '2016', value: 246233.85 },
    { year: '2017', value: 247314.02 },
    { year: '2018', value: 248681.97 },
  ]
}

const lineData: Data = {
  columns: ['year', 'value'],
  rows: [
    { year: '2013', value: 0.35 },
    { year: '2014', value: 0.24 },
    { year: '2015', value: 0.25 },
    { year: '2016', value: 0.24 },
    { year: '2017', value: 0.68 },
    { year: '2018', value: 0.55 },
  ]
}

const metricsAlias: MetricsAlias = {
  value: '年面积'
}

// const tooltipSetting: TooltipSetting = {
//   borderColor: 'rgba(0, 164, 172, 1)',
//   borderWidth: 1,
//   backgroundColor: 'rgba(5, 41, 73, 0.6)',
//   textStyle: {
//     color: '#fff',
//   },
//   formatter: function (params: any) {
//     const title = `<span style="font-size:16px;font-weight:bold">${params[0].name}年</span>`
//     let text = ''
//     params.forEach((p: any, index: number) => {
//       text += `<br>${p.marker}${p.seriesName}&nbsp;<span style="color: ${p.color}">${p.value}${index ? '%' : '公顷'}</span>`
//     })
//     return title + text
//   },
// }

const xAxisSetting: XAxisSetting = {
  min: 240000,
  max: 250000
}

const seriesSettings: BarSeriesOption[] = [
  {
    barWidth: 15
  }
]
const height = ref(300)

</script>

<style>
</style>
