import type { ICommonsComponentProps, IDimensionProps } from "@origam/interfaces"

import type { THSVA } from "@origam/types"

export interface IColorPickerPreviewProps extends ICommonsComponentProps, IDimensionProps {
    colorHsv?: THSVA | null
    disabled?: boolean
    hideAlpha?: boolean
}
