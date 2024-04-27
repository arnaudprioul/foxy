import { DELAY_PROPS } from '@foxy/consts'

import { IActivatorProps, IDelayProps } from '@foxy/interfaces'

export const ACTIVATOR_PROPS: IActivatorProps = {
  ...DELAY_PROPS as IDelayProps,

  activator: undefined,
  activatorProps: undefined,
  closeOnContentClick: undefined,
  target: undefined,
  openOnClick: undefined,
  openOnFocus: undefined,
  openOnHover: undefined
}