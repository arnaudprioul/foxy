import { COMMONS_COMPONENT_PROPS, GROUP_ITEM_PROPS, LAZY_PROPS } from '@foxy/consts'
import { IWindowItemProps } from '@foxy/interfaces'

export const WINDOW_ITEM_PROPS: IWindowItemProps = {
  ...COMMONS_COMPONENT_PROPS,
  ...LAZY_PROPS,
  ...GROUP_ITEM_PROPS,

  reverseTransition: undefined,
  transition: undefined,
}