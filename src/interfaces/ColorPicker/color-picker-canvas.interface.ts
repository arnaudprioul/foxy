import { ICommonsComponentProps, IDimensionProps } from "@foxy/interfaces"

import { THSVA } from "@foxy/types"

export interface IColorPickerCanvasProps extends ICommonsComponentProps, IDimensionProps {
    colorHsv?: THSVA | null
    disabled?: boolean
    dotSize?: string | number
}
