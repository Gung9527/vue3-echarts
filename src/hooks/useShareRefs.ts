import { ref } from 'vue'

export default function() {
  return {
    chartRef: ref<HTMLElement | undefined>(undefined),
    ready: ref<boolean>(false)
  }
}