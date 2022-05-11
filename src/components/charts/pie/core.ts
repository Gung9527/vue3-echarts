import { cloneDeep } from 'lodash-unified'
import { PieChartHandlerArgs } from './interfaces'
import { SeriesOption, TooltipOption, EChartsOption } from '../../../typings/ChartsProps'

function getLegend() {

}

function getTooltip(trigger: PieChartHandlerArgs['tooltipTrigger'], visible: boolean, setting: PieChartHandlerArgs['tooltipSetting']) {
  const tooltip: TooltipOption = {
    show: visible
  }
  if (visible) {
    tooltip.trigger = trigger
    tooltip.show = true
    if (setting) {
      Object.assign(tooltip, cloneDeep(setting))
    }
  }
  return tooltip
}

function getSeries(data: PieChartHandlerArgs['data'], metricsAlias: PieChartHandlerArgs['metricsAlias']) {
  // default dimension index is 0, metrics index is 1
  const { columns, rows } = data
  const dimensionName = columns[0]
  const metircsName = metricsAlias ? (metricsAlias[columns[1]] || columns[1]) : columns[1] 
  const series: SeriesOption = {
    type: 'pie',
    name: metircsName,
    data: rows.map((row) => ({ value: row[columns[1]] as number, name: row[dimensionName] }))
  }

  return series
}

export default function(args: PieChartHandlerArgs) {
  const {
    data,
    metricsAlias,
    tooltipTrigger,
    tooltipVisible,
    tooltipSetting
  } = args

  const series = getSeries(data, metricsAlias)
  const tooltip = getTooltip(tooltipTrigger, tooltipVisible, tooltipSetting)

  return { tooltip, series } as EChartsOption
}