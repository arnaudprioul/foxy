import { BREAKPOINTS } from '@foxy/enums'

export type TBreakpoint = `${BREAKPOINTS}`

export type TDisplayThresholds = {
  [key in TBreakpoint]: number
}

export type TSSROptions = boolean | {
  clientWidth: number
  clientHeight?: number
}