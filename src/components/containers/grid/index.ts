import { Component, computed, defineComponent, onMounted, provide, reactive, PropType } from 'vue'
import { GridHandlerData } from './interfaces'
import { SeriesOption } from '@/typings/ChartsProps'
import { useEChartsInstance, useProps, useVNode, useSetup } from '@/hooks'
import gridHandler from './core'

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
    xAxisTypes: {
      type: Array as PropType<GridHandlerData['xAxisTypes']>,
      required: true
    },
    xAxisSettings: {
      type: Array as PropType<GridHandlerData['xAxisSettings']>
    },
    yAxisTypes: {
      type: Array as PropType<GridHandlerData['yAxisTypes']>,
      required: true
    },
    yAxisSettings: {
      type: Array as PropType<GridHandlerData['yAxisSettings']>
    },
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


    onMounted(() => {
      getChildrenDatas()
      gridHandler(Object.assign({ datas }, props) as GridHandlerData)
    })

    function getChildrenDatas() {
      const children = slots?.default?.()
      if (children) {
        children.forEach((child, i) => {
          if (i < 2) {
            const childComponent = child.type as Component
            const key = childComponent.name!.replace('v3-', '')
            if (key === 'bar' || key === 'line') {
              datas.push({
                type: key,
                data: child.props?.data,
                dimensionIndex: child.props?.dimensionIndex,
                metricsAlias: child.props?.metricsAlias
              })
            }
          }
        })
      }
    }

    return () => useVNode(chartSizeStyle.value, chartRef, 'grid', slots?.default?.())
  }
})