import { warn } from 'vue'

export function consoleWarn (message: string): void {
    warn(`Foxui: ${message}`)
}

export function consoleError (message: string): void {
    warn(`Foxui error: ${message}`)
}
