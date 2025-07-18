import type {
    IActiveProps,
    IAvatarProps,
    IBorderProps,
    IColorProps,
    ICommonsComponentProps,
    IDensityProps,
    IDirectionProps,
    IElevationProps,
    IHoverProps,
    IMarginProps,
    IPaddingProps,
    IRoundedProps,
    ISizeProps,
    ITagProps
} from "@foxui/interfaces"

export interface IAvatarGroupProps extends ICommonsComponentProps, IDirectionProps, IDensityProps, IRoundedProps, ISizeProps, ITagProps, IColorProps, IPaddingProps, IMarginProps, IBorderProps, IElevationProps, IHoverProps, IActiveProps {
    items?: Array<IAvatarProps>
    max?: number
    expandOnHover?: boolean
    expandOnClick?: boolean
}
