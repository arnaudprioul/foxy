import type { TEventProp, TInnerVal } from '@foxui/types'

import { Ref } from 'vue'

export type TVModel<
    Props extends object & { [key in Prop as `onUpdate:${Prop}`]?: TEventProp | undefined },
    Prop extends Extract<keyof Props, string>,
    Inner = Props[Prop]
> = Ref<TInnerVal<Inner>> & { readonly externalValue: Props[Prop] }
