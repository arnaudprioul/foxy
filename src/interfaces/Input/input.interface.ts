import type {
    IAdjacentProps,
    IBorderProps,
    IColorProps,
    ICommonsComponentProps,
    IDensityProps,
    IDimensionProps,
    IDirectionProps,
    IElevationProps,
    IMarginProps,
    IPaddingProps,
    IRoundedProps,
    IValidationProps
} from '@foxui/interfaces'

export interface IInputProps extends ICommonsComponentProps, IDensityProps, IPaddingProps, IMarginProps, IRoundedProps, IColorProps, IBorderProps, IElevationProps, IDimensionProps, IDirectionProps, IValidationProps, IAdjacentProps {
    centerAffix?: boolean
    hideDetails?: boolean | string
    hideSpinButtons?: boolean
    hint?: string
    persistentHint?: boolean
    messages?: Array<string> | string
}
