import { ECharts } from 'echarts/core';
import { echartsCore } from "@/config/echartsCore";
import { EChartsInitOpts } from '@/typings/UniversalProps'

type Instances = { [k: string]: ECharts }

const instances: Instances = {}

export default function () {
  const init = (dom: HTMLElement, instanceId: string, theme?: string | object, initOpts?: EChartsInitOpts) => {
    const instance = echartsCore.init(dom, theme, initOpts)
    instances[instanceId] = instance
    return instance
  }

  const getInstance = (instanceId: string) => {
    return instances[instanceId]
  }

  return {
    init,
    getInstance
  }
}