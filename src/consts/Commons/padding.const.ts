import { IPaddingProps } from '@foxy/interfaces'

export const PADDING_REGEX = /^(?<padding>(?: ?(?:[0-9]+)(?:px|pt|PC|in|cm|mm|em|rem|\%|ex|ch|fr)){0,4})$/

export const PADDING_PROPS: IPaddingProps = {
  padding: undefined,
  paddingBlock: undefined,
  paddingInline: undefined,
  paddingBottom: undefined,
  paddingLeft: undefined,
  paddingRight: undefined,
  paddingTop: undefined
}