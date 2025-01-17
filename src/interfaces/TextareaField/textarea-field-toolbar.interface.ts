import {
    IBorderProps,
    IColorProps,
    ICommonsComponentProps,
    IDensityProps,
    IElevationProps,
    IMarginProps,
    IPaddingProps,
    IRoundedProps
} from "@foxy/interfaces"

import { TEditorModule } from "@foxy/types"

export interface ITextareaFieldToolbarProps extends ICommonsComponentProps, IColorProps, IPaddingProps, IMarginProps, IBorderProps, IElevationProps, IDensityProps, IRoundedProps {
    modules?: Array<TEditorModule>
    zIndex?: number
}
