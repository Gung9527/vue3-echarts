import { ComputedRef, h, VNode, Ref } from 'vue'

interface SizeType {
  width: string,
  height: string
}

export default function(size: SizeType, ref?: Ref<HTMLElement | undefined>, className?: string, slots?: VNode[]) {
  const containerClassName = `v3-echarts__${className || 'container'}`

  return h('div', {
    class: containerClassName,
    style: size
  }, [
    h('div', {
      ref: ref,
      class: `${containerClassName}--chart`,
      style: { width: '100%', height: '100%' }
    }),
    slots && slots
  ])
}