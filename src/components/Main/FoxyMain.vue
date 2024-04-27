<template>
  <component
      :is="tag"
      :class="mainClasses"
      :style="mainStyles">
    <div :class="{'foxy-main__scroller': props.scrollable}" class="foxy-main__wrapper">
      <slot name="default"></slot>
    </div>
  </component>
</template>

<script lang="ts" setup>
  import { useBorder, useLayout, useMargin, usePadding, useRounded, useSsrBoot } from '@foxy/composables'

  import { IMainProps } from '@foxy/interfaces'

  import { computed, StyleValue } from 'vue'

  const props = withDefaults(defineProps<IMainProps>(), { tag: 'main' })

  const { mainStyles: mainLayoutStyles } = useLayout()
  const { ssrBootStyles } = useSsrBoot()
  const { roundedClasses, roundedStyles } = useRounded(props)
  const { borderClasses, borderStyles } = useBorder(props)
  const { paddingClasses, paddingStyles } = usePadding(props)
  const { marginClasses, marginStyles } = useMargin(props)

  // CLASS & STYLES

  const mainStyles = computed(() => {
    return [
      mainLayoutStyles.value,
      ssrBootStyles.value,
      roundedStyles.value,
      borderStyles.value,
      paddingStyles.value,
      marginStyles.value,
      props.style
    ] as StyleValue
  })
  const mainClasses = computed(() => {
    return [
      'foxy-main',
      {
        'foxy-main--scrollable': props.scrollable
      },
      roundedClasses.value,
      borderClasses.value,
      paddingClasses.value,
      marginClasses.value,
      props.class
    ]
  })
</script>

<style lang="scss" scoped>
  .foxy-main {
    $this: &;

    flex: var(--foxy-main--flex);
    max-width: var(--foxy-main--max-width);
    transition-duration: var(--foxy-main--transition-duration);
    transition-property: var(--foxy-main--transition-property);
    transition-timing-function: var(--foxy-main--transition-timing-function);
    padding-inline-start: var(--foxy-layout---position-left);
    padding-inline-end: var(--foxy-layout---position-right);
    padding-block-start: var(--foxy-layout---position-top);
    padding-block-end: var(--foxy-layout---position-bottom);

    &__scroller {
      max-width: var(--foxy-main__scroller--max-width);
      position: var(--foxy-main__scroller--position);
    }

    &--scrollable {
      display: var(--foxy-main--display);
      position: var(--foxy-main--position);
      top: var(--foxy-main--position-top);
      left: var(--foxy-main--position-left);
      width: var(--foxy-main--width);
      height: var(--foxy-main--height);

      #{$this}__scroller {
        flex: 1 1 auto;
        overflow-y: auto;

        --foxy-layout---position-left: 0px;
        --foxy-layout---position-right: 0px;
        --foxy-layout---position-top: 0px;
        --foxy-layout---position-bottom: 0px;
      }
    }
  }
</style>

<style>
  :root {
    --foxy-main--flex: 1 0 auto;

    --foxy-main--transition-duration: 0.2s;
    --foxy-main--transition-property: all;
    --foxy-main--transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);

    --foxy-main--max-width: 100%;
    --foxy-main--width: 100%;
    --foxy-main--height: 100%;

    --foxy-main--display: flex;

    --foxy-main--position: absolute;
    --foxy-main--position-top: 0;
    --foxy-main--position-left: 0;

    --foxy-main__scroller--position: relative;
    --foxy-main__scroller--max-width: 100%;
  }
</style>