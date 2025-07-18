import type { IDateOptions, IDisplayOptions, IGoToOptions, ILocaleOptions, IRtlOptions } from '@origam/interfaces'

import type { TIconOptions, TSSROptions } from '@origam/types'

import type { ExtractPropTypes, StyleValue } from 'vue'

export interface IOrigamOptions {
    aliases?: any
    blueprint?: IBlueprint
    components?: any
    directives?: any
    icons?: TIconOptions
    display?: IDisplayOptions
    ssr?: TSSROptions
    goTo?: IGoToOptions
    date?: IDateOptions
    locale?: ILocaleOptions & IRtlOptions
}

export interface IBlueprint extends Omit<IOrigamOptions, 'blueprint'> {
}

export interface ICommonsComponentProps {
    id?: string,
    class?: string | Array<string> | object,
    style?: string | Array<string> | object | StyleValue
}

export interface ITagProps {
    tag?: string
}

export interface ISample {
    t: number
    d: number
}

export interface IIntersectionObserverInit {
    root?: Element | Document | null;
    rootMargin?: string;
    threshold?: number | Array<number>;
}

export interface IFilterPropsOptions<PropsOptions extends {
    [key: string]: any
}, Props = ExtractPropTypes<PropsOptions>> {
    props: PropsOptions

    filterProps<
        T extends Partial<Props>,
        U extends Extract<keyof T, string>
    > (properties: T, excludes?: string[]): Partial<Pick<T, U>>
}

export interface IConfigurableDocument {
    document?: Document
}
