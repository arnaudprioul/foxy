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

import { TEditorActions } from "@foxy/types"

export interface ITextareaFieldToolbarProps extends ICommonsComponentProps, IColorProps, IPaddingProps, IMarginProps, IBorderProps, IElevationProps, IDensityProps, IRoundedProps {
    actions?: Array<TEditorActions>
    separator?: string
}
