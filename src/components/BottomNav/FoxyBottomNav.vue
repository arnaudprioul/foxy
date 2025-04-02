<template>
  <component
      :is="tag"
      :class="bottomNavClasses"
      :style="bottomNavStyles"
  >
    <div class="foxy-bottom-nav__content">
      <slot name="default"/>
    </div>
  </component>
</template>

<script
    lang="ts"
    setup
>
  import {
    useBorder,
    useBothColor,
    useDensity,
    useElevation,
    useGroup,
    useLayoutItem,
    useProps,
    useRounded,
    useSsrBoot,
    useVModel
  } from '@foxy/composables'

  import { FOXY_BTN_TOGGLE_KEY } from '@foxy/consts'

  import { IBottomNavProps } from '@foxy/interfaces'

  import { convertToUnit, int } from '@foxy/utils'

  import { computed, StyleValue, toRef } from 'vue'

  const props = withDefaults(defineProps<IBottomNavProps>(), {
    tag: 'nav',
    name: 'bottom-navigation',
    modelValue: true,
    selectedClass: 'foxy-bottom-nav__item--selected',
    height: 56,
    active: true
  })

  defineEmits(['update:modelValue', 'update:active'])

  const { filterProps } = useProps<IBottomNavProps>(props)

  const { borderClasses, borderStyles } = useBorder(props)
  const { colorStyles } = useBothColor(toRef(props, 'bgColor'), toRef(props, 'color'))
  const { densityClasses } = useDensity(props)
  const { elevationClasses } = useElevation(props)
  const { roundedClasses, roundedStyles } = useRounded(props)
  const { ssrBootStyles } = useSsrBoot()

  const height = computed(() => {
    return Number(props.height) - (props.density === 'compact' ? 16 : 0)
  })

  const isActive = useVModel(props, 'active')

  const { layoutItemStyles } = useLayoutItem({
    id: props.name,
    order: computed(() => int(props.order)),
    position: computed(() => 'bottom'),
    layoutSize: computed(() => isActive.value ? height.value : 0),
    elementSize: height,
    active: isActive,
    absolute: toRef(props, 'absolute')
  })

  useGroup(props, FOXY_BTN_TOGGLE_KEY)

  // CLASS & STYLES

  const bottomNavStyles = computed(() => {
    return [
      {
        height: convertToUnit(height.value),
        transform: `translateY(${convertToUnit(!isActive.value ? 100 : 0, '%')})`
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
        'foxy-bottom-nav--shift': props.mode === 'shift'
      },
      borderClasses.value,
      densityClasses.value,
      elevationClasses.value,
      roundedClasses.value,
      props.class
    ]
  })

  // EXPOSE

  defineExpose({
    filterProps
  })
</script>

<style
    lang="scss"
    scoped
>
.foxy-bottom-nav {
  $this: &;

  display: flex;
  max-width: 100%;
  overflow: hidden;
  position: absolute;
  transition: transform, color, 0.2s, 0.1s cubic-bezier(0.4, 0, 0.2, 1);
  border-color: currentColor;
  border-style: solid;
  border-width: 0;
  border-radius: 0;

  &--bordered {
    border-width: thin;
    box-shadow: none;
  }

  &--active {
    box-shadow: 0px 2px 4px -1px var(--v-shadow-key-umbra-opacity, rgba(0, 0, 0, 0.2)), 0px 4px 5px 0px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.14)), 0px 1px 10px 0px var(--v-shadow-key-ambient-opacity, rgba(0, 0, 0, 0.12));
  }

  &--grow {
    #{$this}__content {
      > :deep(.foxy-btn) {
        flex-grow: 1;
      }
    }
  }

  &--shift {
    &__content {
      > :deep(.foxy-btn) {
        &:not(.foxy-btn--selected) {
          .foxy-btn__content {
            transform: translateY(0.5rem);

            > span {
              transition: inherit;
              opacity: 0;
            }
          }
        }
      }
    }
  }

  &__content {
    display: flex;
    flex: none;
    font-size: 0.75rem;
    justify-content: center;
    transition: inherit;
    width: 100%;

    > :deep(.foxy-btn) {
      font-size: inherit;
      height: 100%;
      max-width: 168px;
      min-width: 80px;
      text-transform: none;
      transition: inherit;
      width: auto;
      border-radius: 0;

      .foxy-btn__content,
      .foxy-btn__icon {
        transition: inherit;
      }

      .foxy-btn__icon {
        font-size: 1.5rem;
      }
    }
  }
}
</style>

<style>
:root {

}
</style>
