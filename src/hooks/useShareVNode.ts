import { ComputedRef, h, VNode } from 'vue'

interface SizeType {
  width: string,
  height: string
}

export default function(size: SizeType, className?: string, slots?: VNode[]) {
  const containerClassName = `v3-echarts__${className || 'container'}`

  return h('div', {
    class: containerClassName,
    style: size
  }, [
    h('div', {
      ref: 'chartRef',
      class: `${containerClassName}--chart`,
      style: { width: '100%', height: '100%' }
    }),
    slots && slots
  ])
}