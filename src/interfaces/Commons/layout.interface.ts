import { ComponentInternalInstance, CSSProperties, Ref } from 'vue'

import { TLayoutPosition } from '@foxy/types'

import { ICommonsComponentProps } from '@foxy/interfaces'

export interface ILayoutProvide {
  register: (
      vm: ComponentInternalInstance,
      options: {
        id: string
        order: Ref<number>
        position: Ref<TLayoutPosition>
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
  getLayoutItem: (id: string) => ILayerItem  | undefined
  items: Ref<ILayerItem []>
  layoutRect: Ref<DOMRectReadOnly | undefined>
  rootZIndex: Ref<number>
}

export interface ILayer {
  top: number
  bottom: number
  left: number
  right: number
}

export interface ILayerItem  extends ILayer {
  id: string
  size: number
  position: TLayoutPosition
}

export interface ILayoutProps extends ICommonsComponentProps {
  overlaps?: Array<string>
  fullHeight?: boolean
}

export interface ILayoutItemProps extends ICommonsComponentProps {
  name?: string
  order: string | number
  absolute?: boolean
  location?: TLayoutPosition
}