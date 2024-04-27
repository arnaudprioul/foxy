import { InjectionKey } from 'vue'

import { FoxyClassIcon, FoxySvgIcon } from '@foxy/components/Icon'

import { IIconSet } from '@foxy/interfaces'

import { TIconOptions } from '@foxy/types'

export const FOXY_ICONS_KEY: InjectionKey<Required<TIconOptions>> = Symbol.for('foxy:icons')

export const DEFAULT_SETS: Record<string, IIconSet> = {
  svg: {
    component: FoxySvgIcon,
  },
  class: {
    component: FoxyClassIcon,
  },
}