export function useThrottleFn<T extends any[]> (fn: Function, wait: number): (...args: T) => void {
  let timer: any
  return (...args: T) => {
    if (!timer) {
      fn(...args)
      timer = setTimeout(() => {
        clearTimeout(timer)
        timer = null
      }, wait)
    }
  }
}