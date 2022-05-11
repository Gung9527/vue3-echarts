import { cloneDeep } from 'lodash-unified'
import { XAxisSetting, YAxisSetting } from '@/typings/ChartsProps'
import { echartsCore, alreadyUseCharts, alreadyUseComponents } from '@/config/echartsCore'

type ComponentName = 
  'GridSimpleComponent' |
  'PolarComponent' |
  'RadarComponent'

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

function registerComponent(name: ComponentName) {
  if (!alreadyUseComponents.includes(name)) {
    import('echarts/components').then((module) => {
      echartsCore.use(module[name])
      alreadyUseComponents.push(name)
    })
  }
}


export {
  getCategoryAxis,
  registerComponent
}