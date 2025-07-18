import type { IIconProps } from '@foxui/interfaces'

import { TStatus, TStatusPosition } from '@foxui/types'

export interface IStatusProps extends IIconProps {
    status?: TStatus
    statusIconPosition?: TStatusPosition
}
