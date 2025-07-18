import type { IImgProps, IWindowItemProps } from '@origam/interfaces'

export interface ICarouselItemProps extends IImgProps, IWindowItemProps {
    transition?: boolean | string
}
