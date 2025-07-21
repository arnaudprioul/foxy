import type {
    IBorderProps,
    ICommonsComponentProps,
    IDimensionProps,
    IMarginProps,
    IPaddingProps,
    IRoundedProps,
    ITagProps
} from '@/interfaces'

export interface IMainProps extends ITagProps, ICommonsComponentProps, IPaddingProps, IMarginProps, IBorderProps, IRoundedProps, IDimensionProps {
    scrollable?: boolean
}
