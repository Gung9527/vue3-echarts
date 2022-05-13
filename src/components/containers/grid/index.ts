import { computed, defineComponent, onMounted, provide, reactive, PropType, Component } from 'vue'
import { GridHandlerData } from './interfaces'
import { SeriesOption } from '@/typings/ChartsProps'
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
    
    const datas = reactive<GridHandlerData['datas']>([])
    const xAxisTypes = reactive<GridHandlerData['xAxisTypes']>([])
    const yAxisTypes = reactive<GridHandlerData['yAxisTypes']>([])
    const xAxisSettings = reactive<GridHandlerData['xAxisSettings']>([])
    const yAxisSettings = reactive<GridHandlerData['yAxisSettings']>([])


    onMounted(() => {
      getArgsFromChildren()
      gridHandler(Object.assign({ 
        datas,
        xAxisTypes,
        yAxisTypes,
        xAxisSettings,
        yAxisSettings
      }, props) as GridHandlerData)
    })

    function getArgsFromChildren() {
      const children = slots?.default?.()
      if (children) {
        children.forEach((child, i) => {
          if (i < 2) {
            if (child.type === v3Bar || child.type === v3Line) {
              const key = child.type.name!.replace('v3-', '')
              if (key === 'bar' || key === 'line') {
                datas.push({
                  type: key,
                  data: child.props?.data,
                  dimensionIndex: child.props?.dimensionIndex,
                  metricsAlias: child.props?.metricsAlias
                })

                xAxisTypes.push(child.props?.xAxisType || 'category')
                yAxisTypes.push(child.props?.yAxisType || 'value')
                child.props?.xAxisSetting && xAxisSettings.push(child.props?.xAxisSetting)
                child.props?.yAxisSetting && yAxisSettings.push(child.props?.yAxisSetting)
              }
            }
          }
        })
      }
    }

    return () => useVNode(chartSizeStyle.value, chartRef, 'grid', slots?.default?.())
  }
})