import {
    IBorderProps, IChipProps,
    IColorProps,
    ICommonsComponentProps,
    IDensityProps,
    IElevationProps,
    IFieldProps,
    IInputProps,
    IMarginProps,
    IPaddingProps,
    IRoundedProps
} from "@foxy/interfaces"

import { TFile, TFileSize } from "@foxy/types"

export interface IFileFieldProps extends ICommonsComponentProps, IColorProps, IDensityProps, IFieldProps, IInputProps, IPaddingProps, IMarginProps, IBorderProps, IRoundedProps, IElevationProps {
    chips?: boolean
    counter?: boolean
    placeholder?: string
    persistentPlaceholder?: boolean
    persistentCounter?: boolean
    multiple?: boolean
    showSize?: TFileSize
    modelValue?: TFile
    chipProps?: IChipProps
    divider?: string
}
