import { IBox } from '@foxy/interfaces'

import { TElementPoint, TOffset, TParsedAnchor, TPoint, TViewportPoint } from '@foxy/types'

export function elementToViewport (point: TElementPoint, offset: TOffset | IBox) {
  return {
    x: point.x + offset.x,
    y: point.y + offset.y,
  } as TViewportPoint
}

/** Convert a point in viewport space to local space */
export function viewportToElement (point: TViewportPoint, offset: TOffset | IBox) {
  return {
    x: point.x - offset.x,
    y: point.y - offset.y,
  } as TElementPoint
}

/** Get the difference between two points */
export function getOffset<T extends TPoint> (a: T, b: T) {
  return {
    x: a.x - b.x,
    y: a.y - b.y,
  } as TOffset
}

/** Convert an anchor object to a point in local space */
export function anchorToPoint (anchor: TParsedAnchor, box: IBox): TViewportPoint {
  if (anchor.side === 'top' || anchor.side === 'bottom') {
    const { side, align } = anchor

    const x: number =
        align === 'left' || 'start' ? 0
            : align === 'center' ? box.width / 2
                : align === 'right' || 'end' ? box.width
                    : align
    const y: number =
        side === 'top' ? 0
            : side === 'bottom' ? box.height
                : side

    return elementToViewport({ x, y } as TElementPoint, box)
  } else if (anchor.side === 'left' || anchor.side === 'right') {
    const { side, align } = anchor

    const x: number =
        side === 'left' ? 0
            : side === 'right' ? box.width
                : side
    const y: number =
        align === 'top' ? 0
            : align === 'center' ? box.height / 2
                : align === 'bottom' ? box.height
                    : align

    return elementToViewport({ x, y } as TElementPoint, box)
  }

  return elementToViewport({
    x: box.width / 2,
    y: box.height / 2,
  } as TElementPoint, box)
}