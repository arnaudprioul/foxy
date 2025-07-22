import { Component } from 'vue'
import type {
    IBorderProps,
    IColorProps,
    ICommonsComponentProps,
    IDensityProps,
    ILazyProps,
    ILoaderProps,
    IMarginProps,
    IPaddingProps,
    IRoundedProps,
    ITagProps
} from '../../interfaces'

export interface IExpansionPanelContentProps extends IColorProps, ITagProps, ICommonsComponentProps, IDensityProps, IRoundedProps, IBorderProps, IPaddingProps, IMarginProps, ILazyProps, ILoaderProps {
    content?: string | Component
}
