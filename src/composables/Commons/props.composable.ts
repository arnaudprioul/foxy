import type { IFilterPropsOptions } from "@origam/interfaces"

import { pick } from "@origam/utils"

import { ExtractPropTypes } from "vue"

export function useProps<T extends Record<string, any>> (props: T): IFilterPropsOptions<T> {
    const defaultExcludes = ['class', 'style', 'id']

    const filterProps = <U extends Partial<ExtractPropTypes<T>>> (
        properties: U,
        excludes: string[] = defaultExcludes
    ) => {
        const propKeys = Object.keys(props).filter(key => !excludes.includes(key)) as Extract<keyof U, string>[]
        return pick(properties, propKeys) as Partial<U>
    }

    return {filterProps, props}
}
