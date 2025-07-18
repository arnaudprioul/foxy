import { warn } from 'vue'

export function consoleWarn (message: string): void {
    warn(`Origam: ${message}`)
}

export function consoleError (message: string): void {
    warn(`Origam error: ${message}`)
}
