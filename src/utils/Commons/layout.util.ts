import type { Ref } from 'vue'

import { ILayer } from '@foxy/interfaces'

import { TLayoutPosition } from '@foxy/types'

export function generateLayers (
    layout: Array<string>,
    positions: Map<string, Ref<TLayoutPosition>>,
    layoutSizes: Map<string, Ref<number | string>>,
    activeItems: Map<string, Ref<boolean>>,
): Array<{ id: string, layer: ILayer }> {
  let previousLayer: ILayer = { top: 0, left: 0, right: 0, bottom: 0 }
  const layers = [{ id: '', layer: { ...previousLayer } }]

  for (const id of layout) {
    const position = positions.get(id)
    const amount = layoutSizes.get(id)
    const active = activeItems.get(id)
    if (!position || !amount || !active) continue

    const layer = {
      ...previousLayer,
      [position.value]: parseInt(previousLayer[position.value], 10) + (active.value ? parseInt(amount.value, 10) : 0),
    }

    layers.push({
      id,
      layer,
    })

    previousLayer = layer
  }

  return layers
}