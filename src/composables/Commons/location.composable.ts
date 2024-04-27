import { useToggleScope } from '@foxy/composables'

import { IN_BROWSER, LOCATION_STRATEGIES, OPPOSITE_MAP } from '@foxy/consts'

import { ILocationProps, ILocationStrategyData, ILocationStrategyProps } from '@foxy/interfaces'

import { TAnchor } from '@foxy/types'

import { parseAnchor } from '@foxy/utils'

import { computed, CSSProperties, onScopeDispose, ref, watch } from 'vue'

export function useLocation (props: ILocationProps, opposite = false, offset?: (side: string) => number) {

  const locationStyles = computed(() => {
    if (!props.location) return {}

    const { side, align } = parseAnchor(
        props.location.split(' ').length > 1
            ? props.location
            : `${props.location} center` as TAnchor
    )

    const getOffset = (side: string) => {
      return offset
          ? offset(side)
          : 0
    }

    const styles = {} as CSSProperties

    if (side !== 'center') {
      if (opposite) styles[OPPOSITE_MAP[side]] = `calc(100% - ${getOffset(side)}px)`
      else styles[side] = 0
    }
    if (align !== 'center') {
      if (opposite) styles[OPPOSITE_MAP[align]] = `calc(100% - ${getOffset(align)}px)`
      else styles[align] = 0
    } else {
      if (side === 'center') styles.top = styles.left = '50%'
      else {
        styles[({
          top: 'left',
          bottom: 'left',
          left: 'top',
          right: 'top',
        } as const)[side]] = '50%'
      }
      styles.transform = {
        top: 'translateX(-50%)',
        bottom: 'translateX(-50%)',
        left: 'translateY(-50%)',
        right: 'translateY(-50%)',
        center: 'translate(-50%, -50%)',
      }[side]
    }

    return styles
  })

  return { locationStyles }
}

export function useLocationStrategies (
    props: ILocationStrategyProps,
    data: ILocationStrategyData
) {
  const contentStyles = ref({})
  const updateLocation = ref<(e: Event) => void>()

  const handleResize = (e: Event) => {
    updateLocation.value?.(e)
  }

  if (IN_BROWSER) {
    useToggleScope(() => !!(data.isActive.value && props.locationStrategy), reset => {
      watch(() => props.locationStrategy, reset)
      onScopeDispose(() => {
        window.removeEventListener('resize', handleResize)
        updateLocation.value = undefined
      })

      window.addEventListener('resize', handleResize, { passive: true })

      if (typeof props.locationStrategy === 'function') {
        updateLocation.value = props.locationStrategy(data, props, contentStyles)?.updateLocation
      } else {
        updateLocation.value = LOCATION_STRATEGIES[props.locationStrategy](data, props, contentStyles)?.updateLocation
      }
    })
  }

  return {
    contentStyles,
    updateLocation,
  }
}
