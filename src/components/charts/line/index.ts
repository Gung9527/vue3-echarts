import { defineComponent, PropType } from 'vue'
import { useSetup, useVNode, useProps } from '@/hooks'
import { LineChartHandlerArgs } from './interfaces'
import lineHandler from './core'

const props = {
  seriesSettings: {
    type: Object as PropType<LineChartHandlerArgs['seriesSettings']>,
  }
}

export default defineComponent({
  name: 'v3-line',

  props: Object.assign(props, useProps()),

  setup(props) {
    const { chartRef, chartSizeStyle, inGrid } = useSetup(props, lineHandler)

    if (!inGrid) {
      return () => useVNode(chartSizeStyle.value, chartRef, 'line')
    }
  }
})
