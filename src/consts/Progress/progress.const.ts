import { PROGRESS_CIRCULAR_PROPS } from '@foxy/consts/Progress/progress-circular.const.ts'
import { PROGRESS_LINEAR_PROPS } from '@foxy/consts/Progress/progress-linear.const.ts'
import { IProgressCircularProps, IProgressLinearProps, IProgressProps, IProgressTypeProps } from '@foxy/interfaces'

export const MAGIC_RADIUS = 20
export const CIRCUMFERENCE = 2 * Math.PI * MAGIC_RADIUS

export const PROGRESS_PROPS: IProgressProps = {
  ...PROGRESS_LINEAR_PROPS as IProgressLinearProps,
  ...PROGRESS_CIRCULAR_PROPS as IProgressCircularProps
}

export const PROGRESS_TYPE_PROPS :IProgressTypeProps = {
  indeterminate: undefined,
  modelValue: undefined,
  thickness: undefined,
  active: undefined,
  absolute: undefined,
  max: undefined,
  striped: undefined
}