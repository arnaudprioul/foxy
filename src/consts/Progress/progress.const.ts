import { PROGRESS_LINEAR_PROPS, PROGRESS_CIRCULAR_PROPS } from '@foxy/consts'

import { IProgressProps } from '@foxy/interfaces'

export const MAGIC_RADIUS = 20
export const CIRCUMFERENCE = 2 * Math.PI * MAGIC_RADIUS

export const PROGRESS_PROPS: IProgressProps = {
  ...PROGRESS_LINEAR_PROPS,
  ...PROGRESS_CIRCULAR_PROPS,

  type: undefined
}