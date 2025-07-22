import type { ComponentInternalInstance, ComputedRef, CSSProperties, Ref } from 'vue'
import type { ICommonsComponentProps } from '../../interfaces'

import type { TDirectionBoth } from '../../types'

export interface ILayoutProvide {
    register: (
        vm: ComponentInternalInstance,
        options: {
            id: string
            order: Ref<number>
            position: Ref<TDirectionBoth>
            layoutSize: Ref<number | string>
            elementSize: Ref<number | string | undefined>
            active: Ref<boolean>
            disableTransitions?: Ref<boolean>
            absolute: Ref<boolean | undefined>
        }
    ) => {
        layoutItemStyles: Ref<CSSProperties>
        layoutItemScrimStyles: Ref<CSSProperties>
        zIndex: Ref<number>
    }
    unregister: (id: string) => void
    mainRect: Ref<ILayer>
    mainStyles: Ref<CSSProperties>
    getLayoutItem: (id: string) => ILayerItem | undefined
    items: Ref<Array<ILayerItem>>
    layoutRect: Ref<DOMRectReadOnly | undefined>
    rootZIndex: Ref<number>
    layoutId: ComputedRef<string>
}

export interface ILayer {
    top: number
    bottom: number
    left: number
    right: number
}

export interface ILayerItem extends ILayer {
    id: string
    size: number
    position: TDirectionBoth
}

export interface ILayoutProps extends ICommonsComponentProps {
    overlaps?: Array<string>
    fullHeight?: boolean
}

export interface ILayoutItemProps extends ICommonsComponentProps {
    name?: string
    order: string | number
    absolute?: boolean
    location?: TDirectionBoth
}
