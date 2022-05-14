import { defineComponent, PropType } from 'vue'
import { useSetup, useVNode, useProps } from '@/hooks'
import { BarChartHandlerArgs } from './interfaces'
import barHandler from './core'

const props = {
  seriesSettings: {
    type: Object as PropType<BarChartHandlerArgs['seriesSettings']>,
  }
}

export default defineComponent({
  name: 'v3-bar',

  props: Object.assign(props, useProps()),

  setup(props) {
    const { chartRef, chartSizeStyle, inGrid } = useSetup(props, barHandler)

    if (!inGrid) {
      return () => useVNode(chartSizeStyle.value, chartRef, 'bar')
    }
  },
})