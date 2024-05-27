import { PROGRESS_TYPE_PROPS, SIZES_PROPS } from '@foxy/consts'

import { IProgressCircularProps } from '@foxy/interfaces'

export const PROGRESS_CIRCULAR_PROPS: IProgressCircularProps = {
  ...PROGRESS_TYPE_PROPS,
  ...SIZES_PROPS,

  rotate: undefined
}