export function getRangeSliderOffset (e: MouseEvent | TouchEvent, el: HTMLElement, direction: string) {
  const vertical = direction === 'vertical'
  const rect = el.getBoundingClientRect()
  const touch = 'touches' in e ? e.touches[0] : e

  return vertical
      ? touch.clientY - (rect.top + rect.height / 2)
      : touch.clientX - (rect.left + rect.width / 2)
}

export function createRange (length: number, start = 0): number[] {
  return Array.from({ length }, (_v, k) => start + k)
}