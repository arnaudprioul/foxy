import type { IColorProps, ICommonsComponentProps, IDirectionProps, IMarginProps } from '@/interfaces'

export interface IDividerProps extends ICommonsComponentProps, IColorProps, IMarginProps, IDirectionProps {
    inset?: boolean
    length?: number | string
    thickness?: number | string
}
