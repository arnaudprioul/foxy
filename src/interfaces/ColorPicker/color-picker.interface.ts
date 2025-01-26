import {
    IBorderProps,
    IColorProps,
    ICommonsComponentProps,
    IElevationProps, IMarginProps, IPaddingProps,
    IPickerProps,
    IRoundedProps
} from "@foxy/interfaces"

import { TColorType, TColorModes } from "@foxy/types"

export interface IColorPickerProps extends ICommonsComponentProps, IColorProps, IBorderProps, IRoundedProps, IElevationProps, IPaddingProps, IMarginProps, IPickerProps {
    canvasHeight?: string | number
    disabled?: boolean
    dotSize?: string | number
    hideCanvas?: boolean
    hideSliders?: boolean
    hideInputs?: boolean
    mode?: TColorModes
    modes: Array<TColorModes>
    showSwatches?: boolean
    swatches?: Array<Array<TColorType>>
    swatchesMaxHeight?: string | number
    modelValue?: Record<string, unknown> | string | undefined | null
}
