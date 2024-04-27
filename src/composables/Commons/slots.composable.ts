import { useSlots as _useSlots } from 'vue'

export function useSlots () {
  const slots = _useSlots()

  const hasSlot = (slotName: string): boolean => {
    return !!slots[slotName]
  }

  return { hasSlot, slots: slots }
}