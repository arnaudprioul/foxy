import { useToggleScope } from '@/composables'

import type { TEventProp, TInnerVal, TVModel } from '@/types'

import { getCurrentInstance, toKebabCase } from '@/utils'

import { computed, ref, Ref, toRaw, watch } from 'vue'

export function useVModel<
    Props extends object & { [key in Prop as `onUpdate:${Prop}`]?: TEventProp | undefined },
    Prop extends Extract<keyof Props, string>,
    Inner = Props[Prop],
> (
    props: Props,
    prop: Prop,
    defaultValue?: Props[Prop],
    transformIn: (value?: Props[Prop]) => Inner = (v: any) => v,
    transformOut: (value: Inner) => Props[Prop] = (v: any) => v
): TVModel<Props, Prop, Inner> {
    const vm = getCurrentInstance('useVModel')
    const internal = ref(props[prop] !== undefined ? props[prop] : defaultValue) as Ref<Props[Prop]>
    const kebabProp = toKebabCase(prop)
    const checkKebab = kebabProp !== prop

    const isControlled = checkKebab
        ? computed(() => {
            void props[prop]
            return (
                (Object.prototype.hasOwnProperty.call(vm.vnode.props, prop) || Object.prototype.hasOwnProperty.call(vm.vnode.props, kebabProp)) &&
                (Object.prototype.hasOwnProperty.call(vm.vnode.props, `onUpdate:${prop}`) || Object.prototype.hasOwnProperty.call(vm.vnode.props, `onUpdate:${kebabProp}`))
            )
        })
        : computed(() => {
            void props[prop]
            return (Object.prototype.hasOwnProperty.call(vm.vnode.props, prop) && Object.prototype.hasOwnProperty.call(vm.vnode.props, `onUpdate:${prop}`))
        })

    useToggleScope(() => !isControlled.value, () => {
        watch(() => props[prop], (val) => {
            internal.value = val
        })
    })

    const model = computed({
        get (): any {
            const externalValue = props[prop]

            return transformIn(isControlled.value ? externalValue : internal.value)
        },
        set (internalValue) {
            const newValue = transformOut(internalValue)
            const value = toRaw(isControlled.value ? props[prop] : internal.value)

            if (value === newValue || transformIn(value) === internalValue) {
                return
            }

            internal.value = newValue
            vm?.emit(`update:${prop}`, newValue)
        }
    }) as any as Ref<TInnerVal<Inner>> & { readonly externalValue: Props[Prop] }

    Object.defineProperty(model, 'externalValue', {
        get: () => isControlled.value ? props[prop] : internal.value
    })

    return model
}
