import { ICommonsComponentProps, IDimensionProps } from "@foxy/interfaces"

import { THSVA } from "@foxy/types"

export interface IColorPickerPreviewProps extends ICommonsComponentProps, IDimensionProps {
    colorHsv?: THSVA | null
    disabled?: boolean
    hideAlpha?: boolean
}
