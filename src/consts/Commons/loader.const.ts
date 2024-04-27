import { COLOR_PROPS, COMMONS_COMPONENT_PROPS, TAG_PROPS } from '@foxy/consts'

import { IColorProps, ICommonsComponentProps, ILoaderProps, ITagProps } from '@foxy/interfaces'

export const LOADER_PROPS: ILoaderProps = {
  ...COMMONS_COMPONENT_PROPS as ICommonsComponentProps,
  ...TAG_PROPS as ITagProps,
  ...COLOR_PROPS as IColorProps,

  loading: undefined
}