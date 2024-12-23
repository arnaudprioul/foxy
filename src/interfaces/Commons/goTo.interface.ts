import { ComponentPublicInstance } from "vue"

export interface IGoToOptions {
    container: ComponentPublicInstance | HTMLElement | string
    duration: number
    layout: boolean
    offset: number
    easing: string | ((t: number) => number)
    patterns: (t: number) => number
}

export interface IGoToInstance {
    options: IGoToOptions
}
