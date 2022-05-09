export type EChartsInitOpts = {
  devicePixelRatio?: number,
  renderer?: 'canvas' | 'svg',
  useDirtyRect?: boolean,
  ssr?: boolean,
  locale?: string
}

export type GridPositionSettings = {
  left?: number | string,
  top?: number | string,
  right?: number | string,
  bottom?: number | string,
  z?: number,
  zlevel?: number
}

export type AxisBaseSettings = {
  type: 'value' | 'category' | 'time' | 'log'
  id?: string,
  name?: string,
  min?: number | string | Function,
  max?: number | string | Function,
  z?: number,
  zlevel?: number
}
