import type { IColorProps, ICommonsComponentProps, ITagProps } from '@foxui/interfaces'

export interface ILoaderProps extends ICommonsComponentProps, ITagProps, IColorProps {
    loading?: boolean | number,
    loadingText?: string
}
