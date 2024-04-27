import { IMarginProps } from '@foxy/interfaces'

export const MARGIN_REGEX = /^(?<margin>(?: ?(?:[0-9]+)(?:px|pt|PC|in|cm|mm|em|rem|\%|ex|ch|fr)){0,4})$/

export const MARGIN_PROPS: IMarginProps = {
  margin: undefined,
  marginBlock: undefined,
  marginInline: undefined,
  marginBottom: undefined,
  marginLeft: undefined,
  marginRight: undefined,
  marginTop: undefined
}