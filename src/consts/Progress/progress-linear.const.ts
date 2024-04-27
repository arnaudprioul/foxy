import { LOCATION_PROPS, PROGRESS_TYPE_PROPS, ROUNDED_PROPS } from '@foxy/consts'

import { ILocationProps, IProgressLinearProps, IProgressTypeProps, IRoundedProps } from '@foxy/interfaces'

export const PROGRESS_LINEAR_PROPS: IProgressLinearProps = {
  ...PROGRESS_TYPE_PROPS as IProgressTypeProps,
  ...ROUNDED_PROPS as IRoundedProps,
  ...LOCATION_PROPS as ILocationProps,

  bufferValue: undefined,
  clickable: undefined,
  reverse: undefined,
  stream: undefined
}
