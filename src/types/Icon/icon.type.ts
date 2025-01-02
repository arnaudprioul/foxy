import { FoxyIcon } from "@foxy/components"
import type { Component } from 'vue'

import { IIconAliases, IIconProps, IIconSet } from '@foxy/interfaces'

export type TIcon =
    | string
    | Array<(string | [path: string, opacity: number])>
    | Component

export type TIconOptions = {
  defaultSet?: string
  aliases?: Partial<IIconAliases>
  sets?: Record<string, IIconSet>
}

export type TIconInstance = {
  component: TIconComponent
  icon?: TIcon
}

export type TIconComponent = Component<IIconProps>

export type TFoxyIcon = InstanceType<typeof FoxyIcon>
