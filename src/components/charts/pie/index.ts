import { defineComponent, PropType } from 'vue'
import { useSetup, useVNode, useProps } from '@/hooks'
import pieHandler from './core'


export default defineComponent({
  name: 'v3-pie',

  props: Object.assign({
  }, useProps()),

  setup(props) {
    const { chartRef, chartSizeStyle, inGrid } = useSetup(props, pieHandler)

    if (!inGrid) {
      return () => useVNode(chartSizeStyle.value, chartRef, 'line')
    }
  }
})