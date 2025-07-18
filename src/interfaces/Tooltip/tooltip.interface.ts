import type {
    IActivatorProps,
    ICommonsComponentProps,
    IDimensionProps,
    ILazyProps,
    ILocationStrategyProps,
    IOverlayProps,
    IScrimProps,
    IScrollStrategyProps,
    ITransitionComponentProps
} from '@foxui/interfaces'

export interface ITooltipProps extends ICommonsComponentProps, IOverlayProps, IDimensionProps, IActivatorProps, ILocationStrategyProps, IScrollStrategyProps, ILazyProps, ITransitionComponentProps, IScrimProps {
    id?: string
    text?: string
}
