import { defineComponent, PropType } from 'vue'
import { useSetup, useVNode, useProps } from '@/hooks'
import barHandler from './core'


export default defineComponent({
  name: 'v3-bar',

  props: Object.assign({
  }, useProps()),

  setup(props) {
    const { chartRef, chartSizeStyle, option, ready } = useSetup(props, barHandler)

    return {
      chartSizeStyle,
      chartRef,
      option,
      ready
    }
  },

  render() {
    return useVNode(this.chartSizeStyle, 'bar')
  }
})