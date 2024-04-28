import { computed, isRef, Ref } from 'vue'

import { TColor } from '@foxy/types'

import { getForeground, isCssColor, isParsableColor, parseColor } from '@foxy/utils'

export function useColor (colors: Ref<{ background?: TColor, text?: TColor }>) {
  const colorStyles = computed(() => {
    const styles = []

    if (colors.value.background) {
      if (colors.value.background === 'transparent') {
        styles.push(`background-color: ${colors.value.background}`)
      }

      if (isCssColor(colors.value.background)) {
        styles.push(`background-color: ${colors.value.background}`)

        if (!colors.value.text && isParsableColor(colors.value.background)) {
          const backgroundColor = parseColor(colors.value.background)

          if (backgroundColor.a == null || backgroundColor.a === 1) {
            styles.push(`color: ${getForeground(backgroundColor)}`)
          }
        }
      }
    }

    if (colors.value.text) {
      if (isCssColor(colors.value.text)) {
        styles.push(`color: ${colors.value.text}`)
      }
    }

    return styles
  })

  return { colorStyles }
}

export function useBothColor<T extends Record<K, TColor>, K extends string> (bgColorProps: T | Ref<TColor>, colorProps: T | Ref<TColor>, name?: K) {
  const colors = computed(() => ({
    text: isRef(colorProps) ? colorProps.value : (name ? colorProps[name] : null),
    background: isRef(bgColorProps) ? bgColorProps.value : (name ? bgColorProps[name] : null),
  }))

  return useColor(colors)
}

export function useTextColor<T extends Record<K, TColor>, K extends string> (
    props: T | Ref<TColor>,
    name?: K
) {
  const colors = computed(() => ({
    text: isRef(props) ? props.value : (name ? props[name] : null),
  }))

  const { colorStyles: textColorStyles } = useColor(colors)

  return { textColorStyles }
}

export function useBackgroundColor<T extends Record<K, TColor>, K extends string> (
    props: T | Ref<TColor>,
    name?: K
) {
  const colors = computed(() => ({
    background: isRef(props) ? props.value : (name ? props[name] : null),
  }))

  const { colorStyles: backgroundColorStyles } = useColor(colors)

  return { backgroundColorStyles }
}