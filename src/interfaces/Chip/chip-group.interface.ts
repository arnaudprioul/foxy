import type {
    IBorderProps,
    IColorProps,
    ICommonsComponentProps,
    IGroupProps,
    IMarginProps,
    IPaddingProps,
    IRoundedProps,
    ISlideGroupProps,
    ITagProps
} from '@/interfaces'

export interface IChipGroupProps extends ICommonsComponentProps, ITagProps, IGroupProps, IColorProps, IMarginProps, IPaddingProps, IBorderProps, IRoundedProps, ISlideGroupProps {
    column?: boolean
    filter?: boolean
    valueComparator?: (a: any, b: any) => boolean
}
