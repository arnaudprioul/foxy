import type { ICommonsComponentProps, IDimensionProps } from "@foxui/interfaces"

import type { THSVA } from "@foxui/types"

export interface IColorPickerCanvasProps extends ICommonsComponentProps, IDimensionProps {
    colorHsv?: THSVA | null
    disabled?: boolean
    dotSize?: string | number
}
