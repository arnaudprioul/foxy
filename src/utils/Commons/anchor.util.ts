import { BLOCK_ARRAY, INLINE_ARRAY } from '@foxy/consts'

import { TAnchor, TBlock, TInline, TParsedAnchor } from '@foxy/types'

export function parseAnchor (anchor: TAnchor) {
  let [side, align] = anchor.split(' ') as [TBlock | TInline | 'center', TBlock | TInline | 'center' | undefined]

  if (!align) {
    align =
        BLOCK_ARRAY.includes(side as TBlock)? 'start'
            : INLINE_ARRAY.includes(side as TInline) ? 'top'
                : 'center'
  }

  return { side, align } as TParsedAnchor
}

export function flipSide (anchor: TParsedAnchor) {
  return {
    side: {
      center: 'center',
      top: 'bottom',
      bottom: 'top',
      left: 'right',
      right: 'left',
    }[anchor.side],
    align: anchor.align,
  } as TParsedAnchor
}

export function flipAlign (anchor: TParsedAnchor) {
  return {
    side: anchor.side,
    align: {
      center: 'center',
      top: 'bottom',
      bottom: 'top',
      left: 'right',
      right: 'left',
    }[anchor.align],
  } as TParsedAnchor
}

export function flipCorner (anchor: TParsedAnchor) {
  return {
    side: anchor.align,
    align: anchor.side,
  } as TParsedAnchor
}

export function getAxis (anchor: TParsedAnchor) {
  return BLOCK_ARRAY.includes(anchor.side as TBlock) ? 'y' : 'x'
}