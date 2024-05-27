import { COLOR_PROPS, COMMONS_COMPONENT_PROPS, TAG_PROPS } from '@foxy/consts'

import { ILoaderProps } from '@foxy/interfaces'

export const LOADER_PROPS: ILoaderProps = {
  ...COMMONS_COMPONENT_PROPS,
  ...TAG_PROPS,
  ...COLOR_PROPS,

  loading: undefined
}