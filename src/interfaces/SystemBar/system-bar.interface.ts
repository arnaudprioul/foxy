import {
    IBorderProps, IColorProps,
    ICommonsComponentProps, IDimensionProps,
    IElevationProps,
    ILayoutItemProps,
    IRoundedProps,
    ITagProps
} from "@foxy/interfaces"

export interface ISystemBarProps extends ICommonsComponentProps, ITagProps, IElevationProps, IColorProps, ILayoutItemProps, IRoundedProps, IBorderProps, IDimensionProps {
    window?: boolean
}
