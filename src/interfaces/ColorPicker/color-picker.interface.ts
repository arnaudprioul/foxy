import type {
    IBorderProps,
    IColorPickerCanvasProps,
    IColorPickerEditProps,
    IColorPickerPreviewProps,
    IColorPickerSwatchesProps,
    IColorProps,
    ICommonsComponentProps,
    IElevationProps,
    IMarginProps,
    IPaddingProps,
    IPickerProps,
    IRoundedProps
} from "../../interfaces"

import type { THSVA } from "../../types"

export interface IColorPickerProps extends ICommonsComponentProps, IBorderProps, IRoundedProps, IElevationProps, IPaddingProps, IMarginProps, IPickerProps, IColorProps, IColorPickerCanvasProps, IColorPickerPreviewProps, IColorPickerEditProps, IColorPickerSwatchesProps {
    canvasHeight?: string | number
    canvasWidth?: string | number
    hideCanvas?: boolean
    hideSliders?: boolean
    hideInputs?: boolean
    showSwatches?: boolean
    swatchesMaxHeight?: string | number
    modelValue?: Record<string, unknown> | string | undefined | null
}

export interface IColorPickerMode {
    inputProps: Record<string, unknown>
    inputs: Array<{
        [key: string]: any
        label: string
        getValue: (color: any) => number | string
        getColor: (color: any, v: string) => any
    }>
    from: (color: any) => THSVA
    to: (color: THSVA) => any
}
