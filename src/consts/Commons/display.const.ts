import { BREAKPOINTS } from '@foxui/enums'

import type { IDisplayInstance, IDisplayOptions } from '@foxui/interfaces'

import type { TBreakpoint } from '@foxui/types'

import type { InjectionKey } from 'vue'

export const FOXUI_DISPLAY_KEY: InjectionKey<IDisplayInstance> = Symbol.for('foxui:display')

export const DEFAULT_DISPLAY_OPTIONS: IDisplayOptions = {
    mobileBreakpoint: 'lg',
    thresholds: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1280,
        xl: 1920,
        xxl: 2560
    }
}

export const BREAKPOINTS_ARRAY: Array<TBreakpoint> = [BREAKPOINTS.SM, BREAKPOINTS.MD, BREAKPOINTS.LG, BREAKPOINTS.XL, BREAKPOINTS.XXL]
