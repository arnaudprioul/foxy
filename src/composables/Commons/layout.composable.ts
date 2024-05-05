import { useResizeObserver } from '@foxy/composables'

import { FOXY_LAYOUT_ITEM_KEY, FOXY_LAYOUT_KEY, ROOT_ZINDEX } from '@foxy/consts'

import { TLayoutPosition } from '@foxy/types'

import { convertToUnit, findChildrenWithProvide, generateLayers, getCurrentInstance, getUid } from '@foxy/utils'

import type { ComponentInternalInstance, ComputedRef, CSSProperties, Ref } from 'vue'
import {
  computed,
  inject,
  onActivated,
  onBeforeUnmount,
  onDeactivated,
  onMounted,
  provide,
  reactive,
  ref,
  shallowRef
} from 'vue'

export function useLayout () {
  const layout = inject(FOXY_LAYOUT_KEY)

  if (!layout) throw new Error('[Foxy] Could not find injected layout')

  return {
    getLayoutItem: layout.getLayoutItem,
    mainRect: layout.mainRect,
    mainStyles: layout.mainStyles,
  }
}

export function useLayoutItem (options: {
  id: string | undefined
  order: Ref<number>
  position: Ref<TLayoutPosition>
  layoutSize: Ref<number | string>
  elementSize: Ref<number | string | undefined>
  active: Ref<boolean> | ComputedRef<boolean>
  disableTransitions?: Ref<boolean>
  absolute: Ref<boolean | undefined>
}) {
  const layout = inject(FOXY_LAYOUT_KEY)

  if (!layout) throw new Error('[Foxy] Could not find injected layout')

  const id = options.id ?? `layout-item-${getUid()}`

  const vm = getCurrentInstance('useLayoutItem')

  provide(FOXY_LAYOUT_ITEM_KEY, shallowRef({ id }))

  const isKeptAlive = shallowRef(false)
  onDeactivated(() => isKeptAlive.value = true)
  onActivated(() => isKeptAlive.value = false)

  const {
    layoutItemStyles,
    layoutItemScrimStyles,
  } = layout.register(vm, {
    ...options,
    active: computed(() => isKeptAlive.value ? false : options.active.value),
    id,
  })

  onBeforeUnmount(() => layout.unregister(id))

  return { layoutItemStyles, layoutRect: layout.layoutRect, layoutItemScrimStyles }
}

export function useCreateLayout (props: { overlaps?: Array<string>, fullHeight?: boolean }) {
  const parentLayout = inject(FOXY_LAYOUT_KEY, null)

  const rootZIndex = computed(() => parentLayout ? parentLayout.rootZIndex.value - 100 : ROOT_ZINDEX)
  const registered = ref<Array<string>>([])
  const positions = reactive(new Map<string, Ref<TLayoutPosition>>())
  const layoutSizes = reactive(new Map<string, Ref<number | string>>())
  const priorities = reactive(new Map<string, Ref<number>>())
  const activeItems = reactive(new Map<string, Ref<boolean>>())
  const disabledTransitions = reactive(new Map<string, Ref<boolean>>())
  const { resizeRef, contentRect: layoutRect } = useResizeObserver()

  const computedOverlaps = computed(() => {
    const map = new Map<string, { position: TLayoutPosition, amount: number }>()
    const overlaps = props.overlaps ?? []
    for (const overlap of overlaps.filter(item => item.includes(':'))) {
      const [top, bottom] = overlap.split(':')
      if (!registered.value.includes(top) || !registered.value.includes(bottom)) continue

      const topPosition = positions.get(top)
      const bottomPosition = positions.get(bottom)
      const topAmount = layoutSizes.get(top) as Ref<string>
      const bottomAmount = layoutSizes.get(bottom) as Ref<string>

      if (!topPosition || !bottomPosition || !topAmount || !bottomAmount) continue

      map.set(bottom, { position: topPosition.value, amount: parseInt(topAmount.value, 10) })
      map.set(top, { position: bottomPosition.value, amount: -parseInt(bottomAmount.value, 10) })
    }

    return map
  })

  const layers = computed(() => {
    const uniquePriorities = [...new Set([...priorities.values()].map(p => p.value))].sort((a, b) => a - b)
    const layout = []

    for (const p of uniquePriorities) {
      const items = registered.value.filter(id => priorities.get(id)?.value === p)
      layout.push(...items)
    }

    return generateLayers(layout, positions, layoutSizes, activeItems)
  })

  const transitionsEnabled = computed(() => {
    return !Array.from(disabledTransitions.values()).some(ref => ref.value)
  })

  const mainRect = computed(() => {
    return layers.value[layers.value.length - 1].layer
  })

  const mainStyles = computed<CSSProperties>(() => {
    return {
      '--foxy-layout---position-left': convertToUnit(mainRect.value.left),
      '--foxy-layout---position-right': convertToUnit(mainRect.value.right),
      '--foxy-layout---position-top': convertToUnit(mainRect.value.top),
      '--foxy-layout---position-bottom': convertToUnit(mainRect.value.bottom),
      ...(transitionsEnabled.value ? undefined : { transition: 'none' }),
    }
  })

  const items = computed(() => {
    return layers.value.slice(1).map(({ id }, index) => {
      const { layer } = layers.value[index]
      const size = layoutSizes.get(id)
      const position = positions.get(id)

      return {
        id,
        ...layer,
        size: Number(size!.value),
        position: position!.value,
      }
    })
  })

  const getLayoutItem = (id: string) => {
    return items.value.find(item => item.id === id)
  }

  const rootVm = getCurrentInstance('createLayout')

  const isMounted = shallowRef(false)
  onMounted(() => {
    isMounted.value = true
  })

  provide(FOXY_LAYOUT_KEY, {
    register: (
        vm: ComponentInternalInstance,
        {
          id,
          order,
          position,
          layoutSize,
          elementSize,
          active,
          disableTransitions,
          absolute,
        }
    ) => {
      priorities.set(id, order)
      positions.set(id, position)
      layoutSizes.set(id, layoutSize)
      activeItems.set(id, active)
      disableTransitions && disabledTransitions.set(id, disableTransitions)

      const instances = findChildrenWithProvide(FOXY_LAYOUT_KEY, rootVm?.vnode)
      const instanceIndex = instances.indexOf(vm)

      if (instanceIndex > -1) registered.value.splice(instanceIndex, 0, id)
      else registered.value.push(id)

      const index = computed(() => items.value.findIndex(i => i.id === id))
      const zIndex = computed(() => rootZIndex.value + (layers.value.length * 2) - (index.value * 2))

      const layoutItemStyles = computed<CSSProperties>(() => {
        const isHorizontal = position.value === 'left' || position.value === 'right'
        const isOppositeHorizontal = position.value === 'right'
        const isOppositeVertical = position.value === 'bottom'
        const styles = {
          [position.value]: 0,
          '--foxy-layout---zIndex': zIndex.value,
          '--foxy-layout---transform': `translate${isHorizontal ? 'X' : 'Y'}(${(active.value ? 0 : -110) * (isOppositeHorizontal || isOppositeVertical ? -1 : 1)}%)`,
          '--foxy-layout---position': absolute.value || rootZIndex.value !== ROOT_ZINDEX ? 'absolute' : 'fixed',
          ...(transitionsEnabled.value ? undefined : { '--foxy-layout---transition': 'none' }),
        } as const

        if (!isMounted.value) return styles

        const item = items.value[index.value]

        if (!item) throw new Error(`[Foxy] Could not find layout item "${id}"`)

        const overlap = computedOverlaps.value.get(id)

        if (overlap) {
          item[overlap.position] += overlap.amount
        }

        return {
          ...styles,
          'height':
              isHorizontal ? `calc(100% - ${convertToUnit(item.top)} - ${convertToUnit(item.bottom)})`
                  : elementSize.value ? `${convertToUnit(elementSize.value)}`
                      : undefined,
          left: isOppositeHorizontal ? undefined : convertToUnit(item.left),
          right: isOppositeHorizontal ? convertToUnit(item.right) : undefined,
          top: position.value !== 'bottom' ? convertToUnit(item.top) : undefined,
          bottom: position.value !== 'top' ? convertToUnit(item.bottom) : undefined,
          'width':
              !isHorizontal ? `calc(100% - ${convertToUnit(item.left)} - ${convertToUnit(item.right)})`
                  : elementSize.value ? `${convertToUnit(elementSize.value)}`
                      : undefined,
        }
      })

      const layoutItemScrimStyles = computed<CSSProperties>(() => ({
        '--foxy-layout---zIndex': zIndex.value - 1,
      }))

      return { layoutItemStyles, layoutItemScrimStyles, zIndex }
    },
    unregister: (id: string) => {
      priorities.delete(id)
      positions.delete(id)
      layoutSizes.delete(id)
      activeItems.delete(id)
      disabledTransitions.delete(id)
      registered.value = registered.value.filter(v => v !== id)
    },
    mainRect,
    mainStyles,
    getLayoutItem,
    items,
    layoutRect,
    rootZIndex,
  })

  const layoutClasses = computed(() => [
    'foxy-layout',
    { 'foxy-layout--full-height': props.fullHeight },
  ])

  const layoutStyles = computed(() => ({
    '--foxy-layout---zIndex': parentLayout ? rootZIndex.value : undefined,
    '--foxy-layout---position': parentLayout ? 'relative' as const : undefined,
    '--foxy-layout---overflow': parentLayout ? 'hidden' : undefined,
  }))

  return {
    layoutClasses,
    layoutStyles,
    getLayoutItem,
    items,
    layoutRect,
    layoutRef: resizeRef,
  }
}