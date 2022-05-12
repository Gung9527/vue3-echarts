<template>
  <!-- <v3-bar
    :data="barData"
    :metrics-alias="metricsAlias"
    :tooltip-setting="tooltipSetting"
    :y-axis-settings="yAxisSettings"
    :series-settings="seriesSettings"
    tooltip-trigger="axis"
  ></v3-bar> -->
  <v3-grid>
    <v3-bar
      :data="barData"
      :metrics-alias="metricsAlias"
      :tooltip-setting="tooltipSetting"
      :y-axis-settings="yAxisSettings"
      :series-settings="seriesSettings"
      tooltip-trigger="axis"
    ></v3-bar>
  </v3-grid>
</template>

<script setup lang="ts">
import v3Grid from '@/components/containers/grid'
import v3Bar from '@/components/charts/bar'
import { Data, MetricsAlias, TooltipSetting, YAxisSetting, BarSeriesOption } from '@/typings/ChartsProps'
import { ref } from 'vue'

const barData: Data = {
  columns: ['year', 'value'],
  rows: [
    { year: '2013', value: 244420.85 },
    { year: '2014', value: 245011.15 },
    { year: '2015', value: 245624.16 },
    { year: '2016', value: 246233.85 },
    { year: '2017', value: 247314.02 },
    { year: '2018', value: 248681.97 },
  ]
}

const metricsAlias: MetricsAlias = {
  value: '年面积'
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

const yAxisSettings: YAxisSetting[] = [{
  min: 240000,
  max: 250000
}]

const seriesSettings: BarSeriesOption[] = [
  {
    barWidth: 10
  }
]
const height = ref(300)

</script>

<style>
</style>
