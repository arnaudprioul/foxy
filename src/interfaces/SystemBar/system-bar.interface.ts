import type {
    IBorderProps,
    IColorProps,
    ICommonsComponentProps,
    IDimensionProps,
    IElevationProps,
    ILayoutItemProps,
    IRoundedProps,
    ITagProps
} from "@foxui/interfaces"

export interface ISystemBarProps extends ICommonsComponentProps, ITagProps, IElevationProps, IColorProps, ILayoutItemProps, IRoundedProps, IBorderProps, IDimensionProps {
    window?: boolean
}
