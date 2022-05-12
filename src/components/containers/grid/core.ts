import { GridHandlerData } from './interfaces'
import { getAxes, getSeries } from '@/utils/echartsUtil'
import { MetricsAlias, SeriesSetting } from '@/typings/ChartsProps'
import { Dimensions, Metrics } from '@/typings/UniversalProps'


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
        dimensions[col] = data.rows.map((row) => row[col])
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


export default function(args: GridHandlerData) {
  const {
    datas,
    xAxisTypes,
    yAxisTypes
  } = args

  const { dimensions, metrics, seriesSettings } = getArgs(datas)
  const series = getSeries(metrics, seriesSettings)

  console.log(series)
}