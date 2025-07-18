import type {
    IBorderProps,
    ICommonsComponentProps,
    IDirectionProps,
    IDisplayProps,
    IGroupProps,
    IMarginProps,
    IPaddingProps,
    IRoundedProps,
    ITagProps
} from '@foxui/interfaces'
import type { TIcon } from '@foxui/types'

export interface ISlideGroupProps extends ICommonsComponentProps, ITagProps, IDirectionProps, IGroupProps, IPaddingProps, IMarginProps, IRoundedProps, IBorderProps, IDisplayProps {
    centerActive?: boolean
    nextIcon?: TIcon
    prevIcon?: TIcon
    showArrows?: boolean | string
}
