<template>
  <div
      :class="responsiveClasses"
      :style="responsiveStyles"
  >
    <div
        :style="aspectStyles"
        class="foxy-responsive__sizer"
    />
    <slot name="additional"/>
    <div
        v-if="slots.default"
        :class="responsiveContentClasses"
    >
      <slot name="default"/>
    </div>
  </div>
</template>

<script
    lang="ts"
    setup
>
  import {
    useAspectRatio,
    useBorder,
    useDimension,
    useMargin,
    usePadding, useProps,
    useRounded
  } from '@foxy/composables'

  import { IResponsiveProps } from '@foxy/interfaces'

  import { computed, StyleValue, useSlots } from 'vue'

  const props = withDefaults(defineProps<IResponsiveProps>(), {})

  const { filterProps } = useProps<IResponsiveProps>(props)

  const { aspectStyles } = useAspectRatio(props)
  const { dimensionStyles } = useDimension(props)
  const slots = useSlots()
  const { roundedClasses, roundedStyles } = useRounded(props)
  const { borderClasses, borderStyles } = useBorder(props)
  const { paddingClasses, paddingStyles } = usePadding(props)
  const { marginClasses, marginStyles } = useMargin(props)

  // CLASS & STYLES

  const responsiveStyles = computed(() => {
    return [
      dimensionStyles.value,
      roundedStyles.value,
      borderStyles.value,
      paddingStyles.value,
      marginStyles.value,
      props.style
    ] as StyleValue
  })
  const responsiveClasses = computed(() => {
    return [
      'foxy-responsive',
      { 'foxy-responsive--inline': props.inline },
      roundedClasses.value,
      borderClasses.value,
      paddingClasses.value,
      marginClasses.value,
      props.class
    ]
  })
  const responsiveContentClasses = computed(() => {
    return [
      'foxy-responsive__content',
      props.contentClass
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
.foxy-responsive {
  $this: &;

  display: var(--foxy-responsive---display);
  flex: var(--foxy-responsive---flex);
  max-height: var(--foxy-responsive---max-height);
  max-width: var(--foxy-responsive---max-width);
  min-width: var(--foxy-responsive---min-width);
  min-height: var(--foxy-responsive---min-width);
  overflow: var(--foxy-responsive---overflow);
  position: var(--foxy-responsive---position);
  width: var(--foxy-responsive---width);
  height: var(--foxy-responsive---height);

  &--inline {
    display: var(--foxy-responsive--inline---display);
    flex: var(--foxy-responsive--inline---flex);
  }

  &__content {
    flex: var(--foxy-responsive__content---flex);
    max-width: var(--foxy-responsive__content---max-width);
    margin: var(--foxy-responsive__content---margin);
  }

  &__sizer {
    flex: var(--foxy-responsive__sizer---flex);
    transition: var(--foxy-responsive__sizer---transition);
    pointer-events: var(--foxy-responsive__sizer---pointer-events);
    padding-block-end: var(--foxy-responsive__sizer---padding-block-end);

    ~ #{$this}__content {
      --foxy-responsive__content---margin-inline-start: -100%
    }
  }
}
</style>

<style>
:root {
  --foxy-responsive---display: flex;
  --foxy-responsive---flex: 1 0 auto;
  --foxy-responsive---max-height: 100%;
  --foxy-responsive---max-width: 100%;
  --foxy-responsive---min-height: 0;
  --foxy-responsive---min-width: 0;
  --foxy-responsive---width: auto;
  --foxy-responsive---height: auto;
  --foxy-responsive---overflow: hidden;
  --foxy-responsive---position: relative;

  --foxy-responsive--inline---display: inline-flex;
  --foxy-responsive--inline---flex: 0 0 auto;

  --foxy-responsive__content---flex: 1 0 0px;
  --foxy-responsive__content---max-width: 100%;
  --foxy-responsive__content---margin-block-start: 0;
  --foxy-responsive__content---margin-block-end: 0;
  --foxy-responsive__content---margin-block: var(--foxy-responsive__content---margin-block-start) var(--foxy-responsive__content---margin-block-end);
  --foxy-responsive__content---margin-inline-start: 0;
  --foxy-responsive__content---margin-inline-end: 0;
  --foxy-responsive__content---margin-inline: var(--foxy-responsive__content---margin-inline-start) var(--foxy-responsive__content---margin-inline-end);
  --foxy-responsive__content---margin: var(--foxy-responsive__content---margin-block) var(--foxy-responsive__content---margin-inline);

  --foxy-responsive__sizer---flex: 1 0 0px;
  --foxy-responsive__sizer---transition-properties: padding-bottom;
  --foxy-responsive__sizer---transition-duration: 0.2s;
  --foxy-responsive__sizer---transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  --foxy-responsive__sizer---transition: var(--foxy-responsive__sizer---transition-properties) var(--foxy-responsive__sizer---transition-duration) var(--foxy-responsive__sizer---transition-timing-function);
  --foxy-responsive__sizer---pointer-events: none;
  --foxy-responsive__sizer---padding-block-end: 0;
}
</style>
