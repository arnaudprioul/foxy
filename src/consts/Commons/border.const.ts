import { IBorderProps } from '@foxy/interfaces'

export const BORDER_REGEX = /^(?<width>(?: ?(?:[0-9]+)(?:px|pt|PC|in|cm|mm|em|rem|\%|ex|ch|fr)){0,4}) {0,1}(?<style>(?:(?: ?(?:none|hidden|dotted|dashed|solid|double|groove|ridge|inset|outset))+){0,4}) ?(?<color>(?: ?(?:(?:(?:#)(?:[a-f0-9]{3}|[a-f0-9]{6}))|(?:(?:rgb|hsl|rgba)a?\(.*\))|(?:[A-Za-z]+))){0,4})$/

export const BORDER_PROPS: IBorderProps = {
  border: undefined,
  borderBlock: undefined,
  borderInline: undefined,
  borderBottom: undefined,
  borderLeft: undefined,
  borderRight: undefined,
  borderTop: undefined,
  borderColor: undefined,
  borderStyle: undefined
}