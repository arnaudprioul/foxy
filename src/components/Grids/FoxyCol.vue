<template>
  <component
      :is="tag"
      :class="colClasses"
      :style="colStyles">
    <slot name="default"/>
  </component>
</template>

<script lang="ts" setup>
	import { useBorder, useBothColor, useMargin, usePadding, useProps } from '@foxy/composables'

  import { IColProps } from '@foxy/interfaces'

  import { toKebabCase } from '@foxy/utils'

  import { computed, StyleValue, toRef } from 'vue'

  const props = withDefaults(defineProps<IColProps>(), { tag: 'div' })

  const {filterProps} = useProps<IColProps>(props)

  const { colorStyles } = useBothColor(toRef(props, 'bgColor'), toRef(props, 'color'))
  const { borderClasses, borderStyles } = useBorder(props)
  const { paddingClasses, paddingStyles } = usePadding(props)
  const { marginClasses, marginStyles } = useMargin(props)

  // CLASSES & STYLES

  const colStyles = computed(() => {
    return [
      borderStyles.value,
      paddingStyles.value,
      marginStyles.value,
      colorStyles.value,
      props.style
    ] as StyleValue
  })
  const colClasses = computed(() => {
    const classes = [
      'foxy-col',
      {
        [`foxy-col--align-${props.align}`]: props.align,
      },
      borderClasses.value,
      paddingClasses.value,
      marginClasses.value,
      props.class,
    ]
    const propMap = {
      align: ['alignSm', 'alignSm', 'alignLg', 'alignXl', 'alignXxl'],
      justify: ['justifySm', 'justifyMd', 'justifyLg', 'justifyXl', 'justifyXxl'],
      offset: ['offsetSm', 'offsetMd', 'offsetLg', 'offsetXl', 'offsetXxl'],
      order: ['orderSm', 'orderMd', 'orderLg', 'orderXl', 'orderXxl'],
      grid: ['sm', 'md', 'lg', 'xl', 'xxl'],
    }

    if (props.cols) {
      classes.push(`foxy-col--${props.cols}`)
    }

    for (let type in propMap) {
      propMap[type as keyof typeof propMap].forEach((prop) => {
        if (props[prop as keyof typeof props]) classes.push(`foxy-col--${toKebabCase(prop)}-${props[prop as keyof typeof props]}`)
      })
    }

    return classes
  })

	// EXPOSE

	defineExpose({
		filterProps
	})
</script>

<style lang="scss" scoped>
  $breakpoints: ('sm': 600px, 'md': 960px, 'lg': 1280px, 'xl': 1920px, 'xxl': 2560px);
  $sizes: 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1;
  $aligns: ('start': flex-start, 'end': flex-end, 'center': center, 'baseline': baseline, 'stretch': stretch);

  %default {
    width: var(--foxy-col---width);

    padding-block-start: calc(var(--foxy-col---padding-block-start, 12) * var(--foxy-row---gutters, 1));
    padding-block-end: calc(var(--foxy-col---padding-block-end, 12) * var(--foxy-row---gutters, 1));
    padding-inline-start: calc(var(--foxy-col---padding-inline-start, 12) * var(--foxy-row---gutters, 1));
    padding-inline-end: calc(var(--foxy-col---padding-inline-end, 12) * var(--foxy-row---gutters, 1));

    margin-block-start: var(--foxy-col---margin-block-start, 0);
    margin-block-end: var(--foxy-col---margin-block-end, 0);
    margin-inline-start: var(--foxy-col---margin-inline-start, 0);
    margin-inline-end: var(--foxy-col---margin-inline-end, 0);
  }

  .foxy-col {
    $this: &;

    @extend %default;
    flex-grow: var(--foxy-col---flex-grow);
    flex-shrink: var(--foxy-col---flex-shrink);
    flex-basis: var(--foxy-col---flex-basis);
    align-self: var(--foxy-col---align-self);

    max-width: var(--foxy-col---max-width);
    box-sizing: var(--foxy-col---box-sizing);

    background-color: var(--foxy-col---background-color);
    color: var(--foxy-col---color);

    &--auto {
      @extend %default;

      --foxy-col---flex-grow: 0;
      --foxy-col---flex-basis: auto;
      --foxy-col---width: auto;
      --foxy-col---max-width: 100%;
    }

    @each $size in $sizes {
      &--#{$size} {
        @extend %default;

        --foxy-col---flex-basis: #{calc(100% / calc(12 / $size))};
        --foxy-col---max-width: #{calc(100% / calc(12 / $size))};
      }

      @if ($size != 12) {
        &--offset-#{$size} {
          --foxy-col---margin-inline-start: #{calc(100% / calc(12 / $size))};
        }
      }
    }
    @each $align, $alignAttr in $aligns {
      &--align-#{$align} {
        --foxy-col---align-self: #{$alignAttr};
      }
    }

    @each $breakpoint, $breakpointSize in $breakpoints {
      &--#{$breakpoint}-auto {
        @extend %default;

        @media (min-width: $breakpointSize) {
          flex: 0 0 auto;
          width: auto;
          max-width: 100%;
        }
      }

      @each $size in $sizes {
        &--#{$breakpoint}-#{$size} {
          @extend %default;

          @media (min-width: $breakpointSize) {
            --foxy-col---flex-basis: #{calc(100% / calc(12 / $size))};
            --foxy-col---max-width: #{calc(100% / calc(12 / $size))};
          }
        }

        @if ($size != 12) {
          &--offset-#{$breakpoint}-#{$size} {
            @media (min-width: $breakpointSize) {
              --foxy-col---margin-inline-start: #{calc(100% / calc(12 / $size))};
            }
          }
        }
      }
      @each $align, $alignAttr in $aligns {
        &--align-#{$breakpoint}-#{$align} {
          @media (min-width: $breakpointSize) {
            --foxy-col---align-self: #{$alignAttr};
          }
        }
      }
    }
  }
</style>

<style>
  :root {
    --foxy-col---width: 100%;

    --foxy-col---box-sizing: border-box;

    --foxy-col---padding-block-start: 12px;
    --foxy-col---padding-block-end: 12px;
    --foxy-col---padding-inline-start: 12px;
    --foxy-col---padding-inline-end: 12px;

    --foxy-col---margin-block-start: 0;
    --foxy-col---margin-block-end: 0;
    --foxy-col---margin-inline-start: 0;
    --foxy-col---margin-inline-end: 0;

    --foxy-col---flex-basis: 0;
    --foxy-col---flex-shrink: 0;
    --foxy-col---flex-grow: 1;
    --foxy-col---max-width: 100%;

    --foxy-col---background-color: transparent;
    --foxy-col---color: #000;

    --foxy-col---align-self: auto;
  }
</style>
