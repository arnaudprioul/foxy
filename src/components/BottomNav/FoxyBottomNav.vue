<template>
  <component
      :is="tag"
      :class="bottomNavClasses"
      :style="bottomNavStyles">
    <div class="foxy-bottom-nav__content">
      <slot name="default"/>
    </div>
  </component>
</template>

<script lang="ts" setup>
  import {
    useBorder,
    useBothColor,
    useDensity,
    useElevation,
    useGroup,
    useLayoutItem,
    useRounded,
    useSsrBoot
  } from '@foxy/composables'

  import { FOXY_BTN_TOGGLE_KEY } from '@foxy/consts'

  import { IBottomNavProps } from '@foxy/interfaces'

  import { convertToUnit, useProxiedModel } from '@foxy/utils'

  import { computed, StyleValue, toRef } from 'vue'

  const props = withDefaults(defineProps<IBottomNavProps>(), {
    tag: 'nav',
    name: 'bottom-navigation',
    modelValue: true,
    selectedClass: 'foxy-bottom-nav__item--selected',
    height: 56,
    active: true,
  })

  const emits = defineEmits(['update:modelValue', 'update:active'])

  const { borderClasses, borderStyles } = useBorder(props)
  const { colorStyles } = useBothColor(toRef(props, 'bgColor'), toRef(props, 'color'))
  const { densityClasses } = useDensity(props)
  const { elevationClasses } = useElevation(props)
  const { roundedClasses, roundedStyles } = useRounded(props)
  const { ssrBootStyles } = useSsrBoot()
  const height = computed(() => {
    return Number(props.height) - (props.density === 'compact' ? 16 : 0)
  })

  const isActive = useProxiedModel(props, 'active')

  const { layoutItemStyles } = useLayoutItem({
    id: props.name,
    order: computed(() => parseInt(props.order, 10)),
    position: computed(() => 'bottom'),
    layoutSize: computed(() => isActive.value ? height.value : 0),
    elementSize: height,
    active: isActive,
    absolute: toRef(props, 'absolute'),
  })

  useGroup(props, FOXY_BTN_TOGGLE_KEY)

  // CLASS & STYLES

  const bottomNavStyles = computed(() => {
    return [
      {
        height: convertToUnit(height.value),
        transform: `translateY(${convertToUnit(!isActive.value ? 100 : 0, '%')})`,
      },
      roundedStyles.value,
      colorStyles.value,
      borderStyles.value,
      layoutItemStyles.value,
      ssrBootStyles.value,
      props.style
    ] as StyleValue
  })
  const bottomNavClasses = computed(() => {
    return [
      'foxy-bottom-nav',
      {
        'foxy-bottom-nav--active': isActive.value,
        'foxy-bottom-nav--grow': props.grow,
        'foxy-bottom-nav--shift': props.mode === 'shift',
      },
      borderClasses.value,
      densityClasses.value,
      elevationClasses.value,
      roundedClasses.value,
      props.class,
    ]
  })
</script>
