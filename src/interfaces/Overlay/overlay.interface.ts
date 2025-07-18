import type {
    IActivatorProps,
    ICommonsComponentProps,
    IDimensionProps,
    ILazyProps,
    ILocationStrategyProps,
    IScrimProps,
    IScrollStrategyProps,
    ITransitionComponentProps
} from '@foxy/interfaces'

export interface IOverlayProps extends ICommonsComponentProps, IDimensionProps, IActivatorProps, ILocationStrategyProps, IScrollStrategyProps, ILazyProps, ITransitionComponentProps, IScrimProps {
    absolute?: boolean
    attach?: boolean | string | Element
    closeOnBack?: boolean
    contentClass?: string | Array<string>,
    contentProps?: any
    disabled?: boolean
    noClickAnimation?: boolean
    modelValue?: boolean
    zIndex?: number | string
    disableGlobalStack?: boolean
    persistent?: boolean
}
