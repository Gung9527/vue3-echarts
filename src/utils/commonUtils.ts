import { camelCase, paramCase } from 'change-case/dist.es2015'
import { Data, Dimensions, Metrics, MetricsAlias } from '../typings'

function randomId() {
  return Math.random().toString(36).substring(2)
}

function getValue(obj: any, key: string, defaultValue?: any) {
  return obj[key] || obj[paramCase(key)] || obj[camelCase(key)] || defaultValue
}

function getDimensionsAndMetrics(data: Data, dimensionIndex: number, metricsAlias?: MetricsAlias) {
  const metrics: Metrics = {}
  const dimensions: Dimensions = {}

  const dimIndex = dimensionIndex || 0
  data.columns.forEach((col, i) => {
    if (i === dimIndex) {
      dimensions[col] = data.rows.map((row) => row[col])
    } else {
      metrics[metricsAlias ? metricsAlias[col] || col : col] = {
        dimName: col,
        data: data.rows.map((row) => row[col]),
        xAxisIndex: 0,
        yAxisIndex: 0
      }
    }
  })

  return { metrics, dimensions }
}

export {
  randomId,
  getValue,
  getDimensionsAndMetrics
}