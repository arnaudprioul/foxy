import type { ComputedRef, Ref } from 'vue'
import { computed, isRef, ref } from 'vue'
import type { IColorProps } from "../../interfaces"
import type { TColor } from '../../types'
import { getForeground, isCssColor, isParsableColor, parseColor } from '../../utils'

export function useColor (colors: ComputedRef<{ background?: TColor, text?: TColor }>) {
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

    return {colorStyles}
}

export function useBothColor<T extends Record<K, TColor>, K extends string> (bgColorProps: T | Ref<TColor> | ComputedRef<TColor>, colorProps: T | Ref<TColor> | ComputedRef<TColor>, name?: K) {
    const bothColors = computed(() => {
        return {
            text: isRef(colorProps) ? colorProps.value : (name ? colorProps[name] : null),
            background: isRef(bgColorProps) ? bgColorProps.value : (name ? bgColorProps[name] : null)
        }
    })

    return useColor(bothColors)
}

export function useTextColor<T extends Record<K, TColor>, K extends string> (
    props: T | Ref<TColor>,
    name?: K
) {
    const colors = computed(() => ({
        text: isRef(props) ? props.value : (name ? props[name] : null)
    }))

    const {colorStyles: textColorStyles} = useColor(colors)

    return {textColorStyles}
}

export function useBackgroundColor<T extends Record<K, TColor>, K extends string> (
    props: T | Ref<TColor>,
    name?: K
) {
    const colors = computed(() => ({
        background: isRef(props) ? props.value : (name ? props[name] : null)
    }))

    const {colorStyles: backgroundColorStyles} = useColor(colors)

    return {backgroundColorStyles}
}

export function useColorEffect (props: IColorProps, isHover: Ref<boolean> | ComputedRef<boolean> = ref(false), isActive: Ref<boolean> | ComputedRef<boolean> = ref(false)) {
    const activeColor = computed(() => {
        return props.activeColor ? props.activeColor : props.color
    })
    const hoverColor = computed(() => {
        return props.hoverColor ? props.hoverColor : props.color
    })
    const color = computed(() => {
        return isHover.value ? hoverColor.value : isActive.value ? activeColor.value : props.color
    })
    const activeBgColor = computed(() => {
        return props.activeBgColor ? props.activeBgColor : props.bgColor
    })
    const hoverBgColor = computed(() => {
        return props.hoverBgColor ? props.hoverBgColor : props.bgColor
    })
    const bgColor = computed(() => {
        return isHover.value ? hoverBgColor.value : isActive.value ? activeBgColor.value : props.bgColor
    })

    const {colorStyles} = useBothColor(bgColor, color)

    return {colorStyles, color, bgColor}
}
