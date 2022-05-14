import { cloneDeep } from 'lodash-unified'
import { AxisType, MetricsAlias, XAxisSetting, YAxisSetting, GridSeriesSetting } from '@/typings/ChartsProps'
import { Dimensions, Metrics } from '@/typings/UniversalProps'
import { echartsCore, alreadyUseCharts, alreadyUseComponents } from '@/config/echartsCore'

type ComponentName = 
  'GridSimpleComponent' |
  'PolarComponent' |
  'RadarComponent'


function registerComponent(name: ComponentName) {
  if (!alreadyUseComponents.includes(name)) {
    import('echarts/components').then((module) => {
      echartsCore.use(module[name])
      alreadyUseComponents.push(name)
    })
  }
}

function getCategoryAxis(dimensions: unknown[][], settings?: XAxisSetting | YAxisSetting | (XAxisSetting | YAxisSetting)[]) {
  const axis: unknown[] = []
  dimensions.forEach((d, i) => {
    const tempAxis = {
      type: 'category',
      data: d
    }
    
    if (Array.isArray(settings) && settings[i]) {
      Object.assign(tempAxis, cloneDeep(settings[i]))
    } else if (settings) {
      Object.assign(tempAxis, cloneDeep(settings))
    }

    axis.push(tempAxis)
  })

  return axis
}

function getAxis(type: AxisType, dimension?: unknown[], setting?: XAxisSetting | YAxisSetting) {
  const axis: any = { type }

  if (type === 'category') {
    if (!dimension) {
      console.error('dimension must defined when type is \'category\'')
      return
    }
    axis.data = dimension
  }

  return setting ? Object.assign(axis, cloneDeep(setting)) : axis
}

function getSeries(metrics: Metrics, settings: GridSeriesSetting[]) {
  const seriesNames = Object.keys(metrics)
  if (seriesNames.length !== settings.length) {
    console.error('metrics length should matches settings length')
    return
  }

  return seriesNames.map((name, i) => {
    const setting = cloneDeep(settings[i])
    setting.name = name
    setting.data = metrics[name].data
    setting.xAxisIndex = metrics[name].xAxisIndex || 0
    setting.yAxisIndex = metrics[name].yAxisIndex || 0
    return setting
  })
}

export {
  getAxis,
  getSeries,
  getCategoryAxis,
  registerComponent
}