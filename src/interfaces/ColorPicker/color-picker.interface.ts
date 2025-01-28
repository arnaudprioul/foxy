import {
    IBorderProps,
    IColorPickerCanvasProps,
    IColorProps,
    ICommonsComponentProps,
    IElevationProps,
    IMarginProps,
    IPaddingProps,
    IPickerProps,
    IRoundedProps
} from "@foxy/interfaces"

import { TColorModes, TColorType } from "@foxy/types"

export interface IColorPickerProps extends ICommonsComponentProps, IBorderProps, IRoundedProps, IElevationProps, IPaddingProps, IMarginProps, IPickerProps, IColorProps, IColorPickerCanvasProps {
    canvasHeight?: string | number
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
