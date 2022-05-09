<template>
  <v3-line :width="500" :height="height" :data="seriesData"></v3-line>
</template>

<script setup lang="ts">
import v3Line from '@/components/charts/line'
import { Data } from '@/typings/ChartsProps'
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

const height = ref(350)

</script>

<style>
</style>
