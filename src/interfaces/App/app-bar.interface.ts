import type { IImgProps, ILayoutItemProps, IScrollProps, IToolbarProps } from '../../interfaces'

import type { TBlock } from "../../types"

export interface IAppBarProps extends IToolbarProps, ILayoutItemProps, IScrollProps {
    location?: TBlock
    image?: IImgProps
}
