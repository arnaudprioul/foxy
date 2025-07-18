import type { IImgProps, ILayoutItemProps, IScrollProps, IToolbarProps } from '@origam/interfaces'

import type { TBlock } from "@origam/types"

export interface IAppBarProps extends IToolbarProps, ILayoutItemProps, IScrollProps {
    location?: TBlock
    image?: IImgProps
}
