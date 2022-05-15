import { cloneDeep } from 'lodash-unified'
import { echartsCore, alreadyUseCharts, alreadyUseComponents } from '@/config/echartsCore'
import { 
  Dimensions,
  Metrics,
  AxisType,
  MetricsAlias,
  XAxisSetting,
  YAxisSetting,
  GridSeriesSetting,
  LegendSetting,
  TooltipSetting,
  AxisPointerSetting
} from '@/typings'


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

function getAxis(type: AxisType, dimensionData?: unknown[], setting?: XAxisSetting | YAxisSetting) {
  const axis: any = { type }

  if (type === 'category') {
    if (!dimensionData) {
      console.error('dimensionData must defined when type is \'category\'')
      return
    }
    axis.data = dimensionData
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
    if (
      setting.type === 'line' || 
      setting.type === 'bar'
    ) {
      setting.xAxisIndex = metrics[name].xAxisIndex || 0
      setting.yAxisIndex = metrics[name].yAxisIndex || 0
    }
    return setting
  })
}

function getLegend(type: 'plain' | 'scroll', visible: boolean, setting?: LegendSetting) {
  if (!visible) {
    return { show: false } as LegendSetting
  }

  let _setting: LegendSetting = {}
  _setting.show = true,
  _setting.type = type
  if (setting) {
    Object.assign(_setting, cloneDeep(setting))
  }

  return _setting
}

function getTooltip(trigger: 'item' | 'axis' | 'none', visible: boolean, setting?: TooltipSetting) {
  if (!visible) {
    return { show: false } as TooltipSetting
  }

  let _setting: TooltipSetting = {}
  _setting.show = true,
  _setting.trigger = trigger
  if (setting) {
    Object.assign(_setting, cloneDeep(setting))
  }

  return _setting
}

function getAxisPointer(type: 'line' | 'shadow' | 'none', visible: boolean, setting?: AxisPointerSetting) {
  if (!visible) {
    return { } as AxisPointerSetting
  }

  let _setting: AxisPointerSetting = {}
  _setting.show = true,
  _setting.type = type
  if (setting) {
    Object.assign(_setting, cloneDeep(setting))
  }

  return _setting
}

export {
  getAxis,
  getSeries,
  getCategoryAxis,
  getLegend,
  getTooltip,
  getAxisPointer,
  registerComponent
}