import { IAdjacentInnerProps, IAdjacentProps } from '@foxy/interfaces'

export const ADJACENT_PROPS: IAdjacentProps = {
  appendAvatar: undefined,
  appendIcon: undefined,
  prependAvatar: undefined,
  prependIcon: undefined,
  'onClick:prepend': undefined,
  'onClick:append': undefined
}

export const ADJACENT_INNER_PROPS: IAdjacentInnerProps = {
  appendInnerAvatar: undefined,
  appendInnerIcon: undefined,
  prependInnerAvatar: undefined,
  prependInnerIcon: undefined,
  clearIcon: undefined,
  clearable: undefined,

  'onClick:clear': undefined,
  'onClick:appendInner': undefined,
  'onClick:prependInner': undefined,
}