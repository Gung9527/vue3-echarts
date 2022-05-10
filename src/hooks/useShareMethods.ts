import useEChartsInstance from './useEChartsInstance'
import { EChartsInitOpts } from '@/typings/UniversalProps'
import { ECharts } from 'echarts/core'

const { init } = useEChartsInstance()

export default function () {
  const getChartSizeStyle = (width: string | number, height: string | number) => {
    const reg = /^-?[0-9]+(.)?[0-9]+(px|vh|vw|em|rem|%)$/g
    const sizeObj = {
      width: '',
      height: ''
    }
    if (typeof width === 'string' && reg.test(width)) {
      sizeObj.width = width
    } else if (typeof width === 'number' || !isNaN(Number(width))) {
      sizeObj.width = `${width}px`
    } else {
      sizeObj.width = '500px'
    }

    if (typeof height === 'string' && reg.test(height)) {
      sizeObj.height = height
    } else if (typeof height === 'number' || !isNaN(Number(height))) {
      sizeObj.height = `${height}px`
    } else {
      sizeObj.height = '300px'
    }

    return sizeObj
  }

  const initEChartsInstance = (instanceId: string, dom?: HTMLElement, theme?: string | object, initOpts?: EChartsInitOpts) => {
    if (dom) {
      return init(dom, instanceId, theme, initOpts)
    }
  }

  const resize = (instance: ECharts) => {
    instance.resize({
      animation: {
        duration: 500
      }
    })
  }

  return {
    getChartSizeStyle,
    initEChartsInstance,
    resize
  }
}