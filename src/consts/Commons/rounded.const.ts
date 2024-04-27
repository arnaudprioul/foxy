import { IRoundedProps } from '@foxy/interfaces'

export const BORDER_RADIUS_REGEX = /^(?<radius>(?: ?(?:[0-9]+)(?:px|pt|PC|in|cm|mm|em|rem|\%|ex|ch|fr)){0,4})$/

export const ROUNDED_PROPS: IRoundedProps = {
  rounded: undefined,
  roundedBottomLeft: undefined,
  roundedTopLeft: undefined,
  roundedBottomRight: undefined,
  roundedTopRight: undefined
}