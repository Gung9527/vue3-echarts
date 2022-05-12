import { cloneDeep } from 'lodash-unified'
import { AxisType, MetricsAlias, XAxisSetting, YAxisSetting, SeriesSetting } from '@/typings/ChartsProps'
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

function getAxis(dimensions: unknown[], type: AxisType, setting?: XAxisSetting | YAxisSetting) {
  const axis: any = { type }
  switch (type) {
    case 'category':
      axis.data = dimensions
      break
    default:
      break
  }
  return setting ? Object.assign(axis, cloneDeep(setting)) : axis
}

function getAxes(dimensions: unknown[][], types: AxisType[], setting?: (XAxisSetting | YAxisSetting)[]) {
  if (dimensions.length !== types.length) {
    console.error('dimensions length should matches types length')
    return
  }

  const axes: any[] = dimensions.map((d, i) => {
    return getAxis(d, types[i], setting?.[i])
  })
  return axes
}

function getSeries(metrics: Metrics, settings: SeriesSetting[]) {
  const seriesNames = Object.keys(metrics)
  if (seriesNames.length !== settings.length) {
    console.error('metrics length should matches settings length')
    return
  }

  return seriesNames.map((name, i) => {
    const setting = cloneDeep(settings[i])
    setting.name = name
    setting.data = metrics[name].data
    return setting
  })
}

export {
  getAxis,
  getAxes,
  getSeries,
  getCategoryAxis,
  registerComponent
}