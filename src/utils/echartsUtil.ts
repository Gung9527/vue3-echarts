import { cloneDeep } from 'lodash-unified'
import { XAxisSetting, YAxisSetting } from '@/typings/ChartsProps'

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


export {
  getCategoryAxis
}