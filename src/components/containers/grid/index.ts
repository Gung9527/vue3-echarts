import { Component, computed, defineComponent, onMounted, provide, reactive, ref, watch } from 'vue'
import { GridHandlerData } from './interfaces'
import { SeriesOption } from '@/typings/ChartsProps'
import { useEChartsInstance, useProps, useVNode, useSetup } from '@/hooks'

const props = useProps() as { [k: string]: any }
const gridProps: any = {}
const exceptKeys = [ 
  'data',
  'dimensionIndex',
  'metricsAlias',
  'xAxisType',
  'yAxisType',
  'xAxisSetting',
  'yAxisSetting' 
]
Object.keys(props).forEach((key) => {
  if (!exceptKeys.includes(key)) {
    gridProps[key] = props[key]
  }
})

export default defineComponent({
  name: 'v3-grid',
  props: gridProps,

  setup(props, { slots }) {
    const { chartRef, chartSizeStyle } = useSetup(props)
    const { getInstance } = useEChartsInstance()
    
    const datas = ref<GridHandlerData['datas']>({})

    provide('inGrid', true)

    // const option = computed(() => {
    //   const datas = getChildrenDatas()
    //   return {}
    // })

    onMounted(() => {
      datas.value = getChildrenDatas()
    })

    function getChildrenDatas() {
      const children = slots?.default?.()
      const datas: GridHandlerData['datas'] = {}
      if (children) {
        children.forEach((child, i) => {
          if (i < 2) {
            const childComponent = child.type as Component
            const key = childComponent.name!.replace('v3-', '')
            if (key === 'bar' || key === 'line') {
              datas[key] = {
                data: child.props?.data,
                index: i,
                dimensionIndex: child.props?.dimensionIndex,
                metricsAlias: child.props?.metricsAlias
              }
            }
          }
        })
      }

      return datas
    }

    return () => useVNode(chartSizeStyle.value, chartRef, 'grid', slots?.default?.())
  }
})