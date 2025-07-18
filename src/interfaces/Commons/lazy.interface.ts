import type { ICommonsComponentProps, IDimensionProps, ITagProps, ITransitionComponentProps } from '@foxui/interfaces'

export interface ILazyProps {
    eager?: boolean
}

export interface ILazyComponentProps extends ICommonsComponentProps, IDimensionProps, ITagProps, ITransitionComponentProps {
    modelValue?: boolean
    options?: IntersectionObserverInit
}
