import { PROGRESS_TYPE_PROPS, SIZES_PROPS } from '@foxy/consts'

import { IProgressCircularProps, IProgressTypeProps, ISizeProps } from '@foxy/interfaces'

export const PROGRESS_CIRCULAR_PROPS: IProgressCircularProps = {
  ...PROGRESS_TYPE_PROPS as IProgressTypeProps,
  ...SIZES_PROPS as ISizeProps,

  rotate: undefined
}