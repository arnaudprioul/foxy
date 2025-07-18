import type { TIcon } from '@foxy/types'

export interface IAdjacentProps {
    appendAvatar?: string
    appendIcon?: TIcon
    prependAvatar?: string
    prependIcon?: TIcon
}

export interface IAdjacentInnerProps {
    appendInnerAvatar?: string
    appendInnerIcon?: TIcon
    prependInnerAvatar?: string
    prependInnerIcon?: TIcon
    clearIcon?: TIcon
    clearable?: boolean
}
