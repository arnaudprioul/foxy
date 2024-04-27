import { warn } from 'vue'

export function consoleWarn (message: string): void {
  warn(`Foxy: ${message}`)
}

export function consoleError (message: string): void {
  warn(`Foxy error: ${message}`)
}