import type { IIconProps } from '@origam/interfaces'

import { TStatus, TStatusPosition } from '@origam/types'

export interface IStatusProps extends IIconProps {
    status?: TStatus
    statusIconPosition?: TStatusPosition
}
