import { FoxuiIcon } from "@foxui/components"

import type { IIconAliases, IIconProps, IIconSet } from '@foxui/interfaces'
import type { Component } from 'vue'

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

export type TFoxuiIcon = InstanceType<typeof FoxuiIcon>
