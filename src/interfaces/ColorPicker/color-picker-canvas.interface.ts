import { ICommonsComponentProps, IDimensionProps } from "@foxy/interfaces"

import { THSV } from "@foxy/types"

export interface IColorPickerCanvasProps extends ICommonsComponentProps, IDimensionProps {
    colorHsv?: THSV
    disabled?: boolean
    dotSize?: string | number
}
