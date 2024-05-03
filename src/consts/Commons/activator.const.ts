import { DELAY_PROPS } from '@foxy/consts'

import { IActivatorProps } from '@foxy/interfaces'

export const ACTIVATOR_PROPS: IActivatorProps = {
  ...DELAY_PROPS,

  activator: undefined,
  activatorProps: undefined,
  closeOnContentClick: undefined,
  target: undefined,
  openOnClick: undefined,
  openOnFocus: undefined,
  openOnHover: undefined
}