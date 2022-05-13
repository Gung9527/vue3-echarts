import { GridHandlerData } from './interfaces'
import { getAxes, getSeries } from '@/utils/echartsUtil'
import { MetricsAlias, SeriesSetting } from '@/typings/ChartsProps'
import { Dimensions, Metrics } from '@/typings/UniversalProps'

interface GetGridAxesArgs {
  dimensions: Dimensions,
  types: GridHandlerData['xAxisTypes'] | GridHandlerData['yAxisTypes'],
  settings: GridHandlerData['xAxisSettings'] | GridHandlerData['yAxisSettings']
}

function getArgs(datas: GridHandlerData['datas']) {
  const dimensions: Dimensions = {}
  const metrics: Metrics = {}
  const seriesSettings: SeriesSetting[] = [] 
  datas.forEach((d) => {
    const data = d.data
    const metricsAlias = d.metricsAlias
    const dimIndex = d.dimensionIndex || 0
    const dimName = data.columns[dimIndex]
    data.columns.forEach((col, ri) => {
      if (ri === dimIndex) {
        if (dimensions[col]) {
          // merge data if dimension name is same
          const temp = dimensions[col].concat(data.rows.map((row) => row[col]))
          dimensions[col] = Array.from(new Set(temp))
        } else {
          dimensions[col] = data.rows.map((row) => row[col])
        }
      } else {
        metrics[metricsAlias ? metricsAlias[col] || col : col] = {
          dimName,
          data: data.rows.map((row) => row[col])
        }
      }
    })

    seriesSettings.push({
      type: d.type
    })
  })

  return { dimensions, metrics, seriesSettings }
}

function getGridAxes(args: GetGridAxesArgs) {
  const { dimensions, types, settings } = args
  const _dimensions = Object.keys(dimensions).map((d) => dimensions[d])
  return getAxes(
    _dimensions,
    types,
    settings
  )
}


export default function(args: GridHandlerData) {
  const {
    datas,
    xAxisTypes,
    yAxisTypes,
    xAxisSettings,
    yAxisSettings
  } = args

  const { dimensions, metrics, seriesSettings } = getArgs(datas)
  const xAxis = getGridAxes({ dimensions, types: xAxisTypes, settings: xAxisSettings })
  const yAxis = getGridAxes({ dimensions, types: yAxisTypes, settings: yAxisSettings })
  const series = getSeries(metrics, seriesSettings)

  console.log({ xAxis, yAxis, series })
}