import type {
    IBorderProps,
    IColorProps,
    ICommonsComponentProps,
    IMarginProps,
    IPaddingProps,
    ISizeProps,
    ITagProps
} from '@foxy/interfaces'

import type { TIcon, TIconComponent } from '@foxy/types'

export interface IIconProps {
    icon?: TIcon
}

export interface IIconComponentProps extends IIconProps, IColorProps, ICommonsComponentProps, ITagProps, ISizeProps, IPaddingProps, IMarginProps, IBorderProps {
    disabled?: boolean
}

export interface IIconAliases {
    [name: string]: TIcon
}

export interface IIconSet {
    component: TIconComponent
}
