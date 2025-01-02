import { IImgProps, IWindowItemProps } from '@foxy/interfaces'

export interface ICarouselItemProps extends IImgProps, IWindowItemProps {
    transition?: boolean | string
}
