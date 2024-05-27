import { BREAKPOINTS } from '@foxy/enums'

import {IDisplayInstance, IDisplayOptions, IDisplayProps} from '@foxy/interfaces'

import { TBreakpoint } from '@foxy/types'

import { InjectionKey } from 'vue'

export const FOXY_DISPLAY_KEY: InjectionKey<IDisplayInstance> = Symbol.for('foxy:display')

export const DEFAULT_DISPLAY_OPTIONS: IDisplayOptions = {
  mobileBreakpoint: 'lg',
  thresholds: {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920,
    xxl: 2560,
  },
}

export const BREAKPOINTS_ARRAY: Array<TBreakpoint> = [BREAKPOINTS.SM, BREAKPOINTS.MD, BREAKPOINTS.LG, BREAKPOINTS.XL, BREAKPOINTS.XXL]

export const DISPLAY_PROPS: IDisplayProps = {
  mobileBreakpoint: undefined
}
