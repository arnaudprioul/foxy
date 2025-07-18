import type { ICommonsComponentProps, IDimensionProps } from "@foxui/interfaces"

import type { THSVA } from "@foxui/types"

export interface IColorPickerPreviewProps extends ICommonsComponentProps, IDimensionProps {
    colorHsv?: THSVA | null
    disabled?: boolean
    hideAlpha?: boolean
}
