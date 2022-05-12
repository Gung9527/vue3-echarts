import { defineComponent, PropType } from 'vue'
import { useSetup, useVNode, useProps } from '@/hooks'
import lineHandler from './core'


export default defineComponent({
  name: 'v3-line',

  props: Object.assign({
  }, useProps()),

  setup(props) {
    const { chartRef, chartSizeStyle, inGrid } = useSetup(props, lineHandler)

    if (!inGrid) {
      return () => useVNode(chartSizeStyle.value, chartRef, 'line')
    }
  }
})
