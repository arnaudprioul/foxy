import type { IImgProps, IWindowItemProps } from '@foxui/interfaces'

export interface ICarouselItemProps extends IImgProps, IWindowItemProps {
    transition?: boolean | string
}
