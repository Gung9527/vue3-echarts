import { GridHandlerData } from './interfaces'
import { 
  getAxis,
  getSeries,
  getLegend,
  getTooltip
} from '@/utils'
import { Dimensions, Metrics, MetricsAlias, GridSeriesSetting, XAXisOption, YAXisOption, EChartsOption } from '@/typings'

interface GetGridAxesArgs {
  dimensions: Dimensions,
  types: GridHandlerData['xAxisTypes'] | GridHandlerData['yAxisTypes'],
  settings: GridHandlerData['xAxisSettings'] | GridHandlerData['yAxisSettings']
}

function getArgs(datas: GridHandlerData['datas']) {
  const dimensions: Dimensions = {}
  const metrics: Metrics = {}
  const seriesSettings: GridSeriesSetting[] = [] 
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
        metrics[metricsAlias ? metricsAlias[col] || `${d.type}_${col}` : `${d.type}_${col}`] = {
          dimName,
          xAxisIndex: d.xAxisIndex,
          yAxisIndex: d.yAxisIndex,
          data: data.rows.map((row) => row[col])
        }
        seriesSettings.push({
          type: d.type
        })
      }
    })

    
  })

  return { dimensions, metrics, seriesSettings }
}

function getGridAxes(args: GetGridAxesArgs) {
  const { dimensions, types, settings } = args
  const _dimensions = Object.keys(dimensions).map((d) => dimensions[d])
  const axes: (XAXisOption | YAXisOption)[] = []
  
  types.forEach((type, i) => {
    if (type === 'category') {
      _dimensions[i] && axes.push(getAxis(type, _dimensions[i], settings[i]))
    } else {
      axes.push(getAxis(type, undefined, settings[i]))
    }
  })

  return axes
}


export default function(args: GridHandlerData) {
  const {
    datas,
    xAxisTypes,
    yAxisTypes,
    xAxisSettings,
    yAxisSettings,
    legendType,
    legendVisible,
    legendSetting,
    tooltipTrigger,
    tooltipVisible,
    tooltipSetting
  } = args

  const { dimensions, metrics, seriesSettings } = getArgs(datas)
  
  const xAxis = getGridAxes({ dimensions, types: xAxisTypes, settings: xAxisSettings })
  const yAxis = getGridAxes({ dimensions, types: yAxisTypes, settings: yAxisSettings })
  const legend = getLegend(legendType, legendVisible, legendSetting)
  const tooltip = getTooltip(tooltipTrigger, tooltipVisible, tooltipSetting)
  const series = getSeries(metrics, seriesSettings)

  const options = { legend, tooltip, xAxis, yAxis, series } as EChartsOption
  console.log(options)
  return options
}