import { DataType, SeriesExtraSettings } from '@/typings/ChartsProps'
import { deepClone } from '@/utils/commonUtils'

type GridSeriesType = 'line' | 'bar' | 'scatter'


function getGridSeries(type: GridSeriesType, data: DataType, extra?: SeriesExtraSettings[]) {
  const series: any[] = []
  Object.keys(data).forEach((dimension: string, index: number) => {
    const _series = {
      data: data[dimension]
    }
    if (Array.isArray(extra)) {
      
    }
  })
}
