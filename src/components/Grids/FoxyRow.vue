<template>
  <component
      :is="tag"
      :class="rowClasses"
      :style="rowStyles"
  >
    <slot name="default"/>
  </component>
</template>

<script
    lang="ts"
    setup
>
  import { useBorder, useBothColor, useDensity, useMargin, usePadding, useProps } from '@foxy/composables'
  import { DENSITY } from '@foxy/enums'

  import { IRowProps } from '@foxy/interfaces'

  import { toKebabCase } from '@foxy/utils'

  import { computed, StyleValue, toRef } from 'vue'

  const props = withDefaults(defineProps<IRowProps>(), { tag: 'div', density: DENSITY.DEFAULT })

  const { filterProps } = useProps<IRowProps>(props)

  const { colorStyles } = useBothColor(toRef(props, 'bgColor'), toRef(props, 'color'))
  const { densityClasses } = useDensity(props)
  const { borderClasses, borderStyles } = useBorder(props)
  const { paddingClasses, paddingStyles } = usePadding(props)
  const { marginClasses, marginStyles } = useMargin(props)

  // CLASSES & STYLES

  const rowStyles = computed(() => {
    return [
      borderStyles.value,
      paddingStyles.value,
      marginStyles.value,
      colorStyles.value,
      props.style
    ] as StyleValue
  })
  const rowClasses = computed(() => {
    const classes = [
      'foxy-row',
      {
        [`foxy-row--align-${props.align}`]: props.align,
        [`foxy-row--justify-${props.justify}`]: props.justify
      },
      densityClasses.value,
      borderClasses.value,
      paddingClasses.value,
      marginClasses.value,
      props.class
    ]
    const propMap = {
      align: ['alignSm', 'alignMd', 'alignLg', 'alignXl', 'alignXxl'],
      justify: ['justifySm', 'justifyMd', 'justifyLg', 'justifyXl', 'justifyXxl']
    }

    for (let type in propMap) {
      propMap[type as keyof typeof propMap].forEach((prop) => {
        if (props[prop as keyof typeof props]) classes.push(`foxy-row--${toKebabCase(prop)} : ${props[prop as keyof typeof props]}`)
      })
    }

    return classes
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
$breakpoints: ('sm': 600px, 'md': 960px, 'lg': 1280px, 'xl': 1920px, 'xxl': 2560px);
$justifies: ('start': flex-start, 'end': flex-end, 'center': center, 'space-between': space-between, 'space-around': space-around, 'space-evenly': space-evenly);
$aligns: ('start': flex-start, 'end': flex-end, 'center': center, 'baseline': baseline, 'stretch': stretch);

.foxy-row {
  display: var(--foxy-row---display);
  flex-wrap: var(--foxy-row---flex-wrap);
  flex: var(--foxy-row---flex);
  align-items: var(--foxy-row---align-items);
  justify-content: var(--foxy-row---justify-content);
  box-sizing: var(--foxy-row---box-sizing);

  padding-block-start: var(--foxy-container---padding-block-start);
  padding-block-end: var(--foxy-container---padding-block-end);
  padding-inline-start: var(--foxy-container---padding-inline-start);
  padding-inline-end: var(--foxy-container---padding-inline-end);

  margin-block-start: calc(var(--foxy-row---margin-block-start) + var(--foxy-row---density));
  margin-block-end: calc(var(--foxy-row---margin-block-end) + var(--foxy-row---density));
  margin-inline-start: calc(var(--foxy-row---margin-inline-start) + var(--foxy-row---density));
  margin-inline-end: calc(var(--foxy-row---margin-inline-end) + var(--foxy-row---density));

  + .v-row {
    margin-block-start: calc((var(--foxy-row---margin-block-start) + var(--foxy-row---density)) * -1);
  }

  &--density-default {
    --foxy-row---density: -8px;

    > .foxy-col,
    > [class*=foxy-col-] {
      // padding 4px
    }
  }

  &--density-compact {
    --foxy-row---density: 0;

    > .foxy-col,
    > [class*=foxy-col-] {
      // padding 4px
    }
  }

  &--bordered {
    border-width: var(--foxy-row--bordered---border-width);
    box-shadow: var(--foxy-row--bordered---box-shadow);
  }

  @each $align, $alignAttr in $aligns {
    &--align-#{$align} {
      --foxy-row---align-items: #{$alignAttr};
    }
  }

  @each $justify, $justifyAttr in $justifies {
    &--justify-#{$justify} {
      --foxy-row---justify-content: #{$justifyAttr};
    }
  }

  @each $breakpoint, $breakpointSize in $breakpoints {
    @each $align, $alignAttr in $aligns {
      &--align-#{$breakpoint}-#{$align} {
        @media (min-width: $breakpointSize) {
          --foxy-row---align-items: #{$alignAttr};
        }
      }
    }

    @each $justify, $justifyAttr in $justifies {
      &--justify-#{$breakpoint}-#{$justify} {
        @media (min-width: $breakpointSize) {
          --foxy-row---justify-content: #{$justifyAttr};
        }
      }
    }
  }
}
</style>

<style>
:root {
  --foxy-row---display: flex;
  --foxy-row---flex-wrap: wrap;
  --foxy-row---flex: 1 1 auto;

  --foxy-row---box-sizing: border-box;

  --foxy-row---padding-block-start: 0;
  --foxy-row---padding-block-end: 0;
  --foxy-row---padding-inline-start: 0;
  --foxy-row---padding-inline-end: 0;

  --foxy-row---margin-block-start: -4px;
  --foxy-row---margin-block-end: -4px;
  --foxy-row---margin-inline-start: -4px;
  --foxy-row---margin-inline-end: -4px;

  --foxy-row---align-items: stretch;
  --foxy-row---justify-content: flex-start
}
</style>
