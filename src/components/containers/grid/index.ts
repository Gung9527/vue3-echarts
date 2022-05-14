import { computed, defineComponent, onMounted, provide, reactive, toRaw, watch } from 'vue'
import { GridHandlerData } from './interfaces'
import { getValue } from '@/utils'
import { SeriesOption, EChartsOption } from '@/typings/ChartsProps'
import { useEChartsInstance, useProps, useVNode, useSetup } from '@/hooks'
import gridHandler from './core'
import v3Bar from '../../charts/bar'
import v3Line from '../../charts/line'

const { 
  id, 
  width, 
  height, 
  gridSetting, 
  legendVisible, 
  legendType, 
  legendSetting, 
  tooltipVisible,
  tooltipTrigger,
  tooltipSetting,
  axisPointerVisible,
  axisPointerType,
  axisPointerSetting
} = useProps()

interface Args {
  datas: GridHandlerData['datas'],
  xAxisTypes: GridHandlerData['xAxisTypes'],
  yAxisTypes: GridHandlerData['yAxisTypes'],
  xAxisSettings: GridHandlerData['xAxisSettings'],
  yAxisSettings: GridHandlerData['yAxisSettings']
}

export default defineComponent({
  name: 'v3-grid',
  props: {
    id,
    width,
    height,
    gridSetting,
    legendVisible,
    legendType,
    legendSetting,
    tooltipVisible,
    tooltipTrigger,
    tooltipSetting,
    axisPointerVisible,
    axisPointerType,
    axisPointerSetting
  },

  setup(props, { slots }) {
    provide('inGrid', true)

    const { chartRef, chartSizeStyle } = useSetup(props)
    const { getInstance } = useEChartsInstance()
    

    const args = reactive<Args>({
      datas: [],
      xAxisTypes: [],
      yAxisTypes: [],
      xAxisSettings: [],
      yAxisSettings: []
    })

    watch(args, () => {
      const option = gridHandler(Object.assign(toRaw(args), props) as GridHandlerData)
      initChart(option)
    })

    onMounted(() => {
      getArgsFromChildren()
    })

    function getArgsFromChildren() {
      const children = slots?.default?.()
      if (children) {
        children.forEach((child, i) => {
          if (i < 2) {
            if (child.type === v3Bar || child.type === v3Line) {
              const key = child.type.name!.replace('v3-', '')
              if (key === 'bar' || key === 'line') {
                args.datas.push({
                  type: key,
                  data: getValue(child.props, 'data'),
                  dimensionIndex: getValue(child.props, 'dimensionIndex', 0),
                  xAxisIndex: getValue(child.props, 'xAxisIndex', 0),
                  yAxisIndex: getValue(child.props, 'yAxisIndex', 0),
                  metricsAlias: getValue(child.props, 'metricsAlias')
                })

                args.xAxisTypes.push(getValue(child.props, 'xAxisType', 'category'))
                args.yAxisTypes.push(getValue(child.props, 'yAxisType', 'value'))

                const xAxisSetting = getValue(child.props, 'xAxisSetting')
                const yAxisSetting = getValue(child.props, 'yAxisSetting')
                xAxisSetting && args.xAxisSettings.push(xAxisSetting)
                yAxisSetting && args.yAxisSettings.push(yAxisSetting)
              }
            }
          }
        })
      }
    }

    function initChart(option: EChartsOption) {
      const ec = getInstance(props.id)
      if (ec) {
        ec.setOption(option)
      }
    }

    return () => useVNode(chartSizeStyle.value, chartRef, 'grid', slots?.default?.())
  }
})