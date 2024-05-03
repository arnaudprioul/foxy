import { LOCATION_PROPS, PROGRESS_TYPE_PROPS, ROUNDED_PROPS } from '@foxy/consts'

import { IProgressLinearProps } from '@foxy/interfaces'

export const PROGRESS_LINEAR_PROPS: IProgressLinearProps = {
  ...PROGRESS_TYPE_PROPS,
  ...ROUNDED_PROPS,
  ...LOCATION_PROPS,

  bufferValue: undefined,
  clickable: undefined,
  reverse: undefined,
  stream: undefined
}
