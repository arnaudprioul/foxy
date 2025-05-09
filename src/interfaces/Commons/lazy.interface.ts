import type { ICommonsComponentProps, IDimensionProps, ITagProps, ITransitionComponentProps } from '@foxy/interfaces'

export interface ILazyProps {
    eager?: boolean
}

export interface ILazyComponentProps extends ICommonsComponentProps, IDimensionProps, ITagProps, ITransitionComponentProps {
    modelValue?: boolean
    options?: IntersectionObserverInit
}
