import { IFilterPropsOptions } from "@foxy/interfaces"

import { pick } from "@foxy/utils"

import { ComponentPropsOptions, ExtractPropTypes } from "vue"

export function useProps<PropsOptions extends Readonly<ComponentPropsOptions>, Props = ExtractPropTypes<PropsOptions>> (props: PropsOptions): IFilterPropsOptions<PropsOptions> {
    const filterProps = <
        T extends Partial<Props>,
        U extends Extract<keyof T, string>
    > (properties: T, excludes: string[] = ['class', 'style', 'id']): Partial<Pick<T, U>> => {
        const propKeys = Object.keys(props)
            .filter((key) => {
                return !excludes.includes(key)
            })

        return pick(properties, propKeys)
    }

    return {
        filterProps,
        props
    }
}
