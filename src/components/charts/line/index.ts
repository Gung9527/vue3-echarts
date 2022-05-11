import { defineComponent, PropType } from 'vue'
import { useSetup, useVNode, useProps } from '@/hooks'
import lineHandler from './core'


export default defineComponent({
  name: 'v3-line',

  props: Object.assign({
  }, useProps()),

  setup(props) {
    const { chartRef, chartSizeStyle, option, ready } = useSetup(props, lineHandler)

    return {
      chartSizeStyle,
      chartRef,
      option,
      ready
    }
  },

  render() {
    return useVNode(this.chartSizeStyle, 'line')
  }
})
