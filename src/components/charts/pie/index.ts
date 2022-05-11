import { defineComponent, PropType } from 'vue'
import { useSetup, useVNode, useProps } from '@/hooks'
import pieHandler from './core'


export default defineComponent({
  name: 'v3-pie',

  props: Object.assign({
  }, useProps()),

  setup(props) {
    const { chartRef, chartSizeStyle, option, ready } = useSetup(props, pieHandler)

    return {
      chartSizeStyle,
      chartRef,
      option,
      ready
    }
  },

  render() {
    return useVNode(this.chartSizeStyle, 'pie')
  }
})