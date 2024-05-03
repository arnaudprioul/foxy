<template>
  <foxy-window-item
      :class="carouselItemClasses"
      :style="carouselItemStyles"
      v-bind="windowItemProps">
    <template #default>
      <slot name="default">
        <foxy-img v-bind="{ ...attrs , ...imgProps }">
          <template v-if="hasSlot('content')" #default>
            <slot name="content"/>
          </template>

          <template v-if="hasSlot('error')" #error>
            <slot name="error"/>
          </template>

          <template v-if="hasSlot('placeholder')" #placeholder>
            <slot name="placeholder"/>
          </template>
        </foxy-img>
      </slot>
    </template>
  </foxy-window-item>
</template>

<script lang="ts" setup>
  import { FoxyImg, FoxyWindowItem } from '@foxy/components'
  import { useSlots } from '@foxy/composables'

  import { IMG_PROPS, WINDOW_ITEM_PROPS } from '@foxy/consts'

  import { ICarouselItemProps, IImgProps, IWindowItemProps } from '@foxy/interfaces'

  import { omit, pick } from '@foxy/utils'

  import { computed, StyleValue, useAttrs } from 'vue'

  const props = withDefaults(defineProps<ICarouselItemProps>(), {
    transition: undefined,
    reverseTransition: undefined
  })

  const attrs = useAttrs()

  const windowItemProps = computed(() => {
    const windowItemProp = pick(props, Object.keys(WINDOW_ITEM_PROPS) as Array<keyof IWindowItemProps>)

    return omit(windowItemProp, ['class', 'style'])
  })
  const imgProps = computed(() => {
    const imgProp = pick(props, Object.keys(IMG_PROPS) as Array<keyof IImgProps>)

    return omit(imgProp, ['class', 'style'])
  })

  const { hasSlot } = useSlots()

  // CLASS & STYLES

  const carouselItemStyles = computed(() => {
    return [
      props.style
    ] as StyleValue
  })
  const carouselItemClasses = computed(() => {
    return [
      'foxy-carousel-item',
      props.class,
    ]
  })
</script>

<style lang="scss" scoped>
  .foxy-carousel-item {
    display: block;
    height: inherit;
    text-decoration: none;

    > .foxy-img {
      height: inherit;
    }
  }
</style>

<style>
  :root {

  }
</style>
