<template>
  <foxy-window-item
      ref="foxyWindowItemRef"
      :class="carouselItemClasses"
      :style="carouselItemStyles"
      v-bind="windowItemProps"
  >
    <template #default>
      <slot name="default">
        <foxy-img
            ref="foxyImgRef"
            v-bind="{...attrs , ...imgProps}"
        >
          <template
              v-if="slots.content"
              #default
          >
            <slot name="content"/>
          </template>

          <template
              v-if="slots.error"
              #error
          >
            <slot name="error"/>
          </template>

          <template
              v-if="slots.placeholder"
              #placeholder
          >
            <slot name="placeholder"/>
          </template>
        </foxy-img>
      </slot>
    </template>
  </foxy-window-item>
</template>

<script
    lang="ts"
    setup
>
  import { FoxyImg, FoxyWindowItem } from '@foxy/components'

  import { useProps } from '@foxy/composables'

  import { ICarouselItemProps } from '@foxy/interfaces'

  import { TFoxyImg, TFoxyWindowItem } from "@foxy/types"

  import { computed, ref, StyleValue, useAttrs, useSlots } from 'vue'

  const props = withDefaults(defineProps<ICarouselItemProps>(), {
    transition: undefined,
    reverseTransition: undefined
  })

  const { filterProps } = useProps<ICarouselItemProps>(props)

  const attrs = useAttrs()

  const foxyWindowItemRef = ref<TFoxyWindowItem>()
  const foxyImgRef = ref<TFoxyImg>()

  const windowItemProps = computed(() => {
    return foxyWindowItemRef.value?.filterProps(props)
  })
  const imgProps = computed(() => {
    return foxyImgRef.value?.filterProps(props)
  })

  const slots = useSlots()

  // CLASS & STYLES

  const carouselItemStyles = computed(() => {
    return [
      props.style
    ] as StyleValue
  })
  const carouselItemClasses = computed(() => {
    return [
      'foxy-carousel-item',
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
