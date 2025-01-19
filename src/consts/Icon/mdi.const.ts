import { h } from 'vue'

import { FoxyClassIcon } from '@foxy/components'

import { MDI_ICONS } from '@foxy/enums'

import { IIconAliases, IIconSet } from '@foxy/interfaces'

export const MDI: IIconSet = {
  // Not using mergeProps here, functional components merge props by default (?)
  component: (props: any) => h(FoxyClassIcon, { ...props, class: 'mdi' }),
}

export const MDI_ALIASES: IIconAliases = {
  ...MDI_ICONS
}
