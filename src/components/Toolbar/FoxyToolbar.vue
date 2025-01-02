<template>
  <component
      :is="tag"
      :class="barClasses"
      :style="barStyles">
    <slot name="default">
      <div class="foxy-toolbar__wrapper">
        <div v-if="hasPrepend" class="foxy-toolbar__prepend">
          <slot name="prepend"></slot>
        </div>
        <div v-if="hasContent" class="foxy-toolbar__content">
          <slot name="content"></slot>
        </div>
        <div v-if="hasAppend" class="foxy-toolbar__append">
          <slot name="append"></slot>
        </div>
      </div>
    </slot>
  </component>
</template>

<script lang="ts" setup>
  import { computed, StyleValue, toRef } from 'vue'

  import {
	  useBorder,
	  useBothColor,
	  useDensity,
	  useElevation,
	  useRounded,
	  useSlots,
	  usePadding,
	  useMargin,
	  useProps
  } from '@foxy/composables'

  import { DENSITY } from '@foxy/enums'

  import { IToolbarProps } from '@foxy/interfaces'

  import { convertToUnit } from '@foxy/utils'

  const props = withDefaults(defineProps<IToolbarProps>(), {
    tag: 'header',
    height: 64,
    density: DENSITY.DEFAULT,
    modelValue: true
  })

  const {filterProps} = useProps<IToolbarProps>(props)

  const { colorStyles } = useBothColor(toRef(props, 'bgColor'), toRef(props, 'color'))
  const { elevationClasses } = useElevation(props)
  const { roundedClasses, roundedStyles } = useRounded(props)
  const { borderClasses, borderStyles } = useBorder(props)
  const { paddingClasses, paddingStyles } = usePadding(props)
  const { marginClasses, marginStyles } = useMargin(props)
  const { densityClasses } = useDensity(props)

  const { hasSlot } = useSlots()

  const hasPrepend = computed(() => {
    return hasSlot('prepend')
  })
  const hasContent = computed(() => {
    return hasSlot('content')
  })
  const hasAppend = computed(() => {
    return hasSlot('append')
  })

  // CLASS & STYLES

  const barStyles = computed(() => {
    return [
      colorStyles.value,
      roundedStyles.value,
      borderStyles.value,
      paddingStyles.value,
      marginStyles.value,
      `--foxy-toolbar---height: ${convertToUnit(props.height)}`,
      props.style
    ] as StyleValue
  })
  const barClasses = computed(() => {
    return [
      'foxy-toolbar',
      {
        'foxy-toolbar---absolute': props.absolute,
        'foxy-toolbar---collapse': props.collapse,
        'foxy-toolbar---flat': props.flat,
        'foxy-toolbar---floating': props.floating,
      },
      borderClasses.value,
      paddingClasses.value,
      marginClasses.value,
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

<style lang="scss" scoped>
  .foxy-toolbar {
    $this: &;

    max-width: var(--foxy-toolbar---max-width);
    width: var(--foxy-toolbar---width);
    height: var(--foxy-toolbar---height);
    box-sizing: var(--foxy-toolbar---box-sizing);

    overflow: var(--foxy-toolbar---overflow);

    position: var(--foxy-layout---position, var(--foxy-toolbar---position));
    z-index: var(--foxy-layout---zIndex, 1000);

    transform: var(--foxy-layout---transform);
    transition-duration: var(--foxy-toolbar---transition-duration);
    transition-property: var(--foxy-toolbar---transition-property);
    transition-timing-function: var(--foxy-toolbar---transition-timing-function);

    border-color: var(--foxy-toolbar---border-color);
    border-style: var(--foxy-toolbar---border-style);
    border-width: var(--foxy-toolbar---border-width);
    border-radius: var(--foxy-toolbar---border-radius);

    background: var(--foxy-toolbar---background);
    box-shadow: var(--foxy-toolbar---box-shadow);
    color: var(--foxy-toolbar---color);

    &--bordered {
      --foxy-toolbar---border-width: thin;
      --foxy-toolbar---box-shadow: none;
    }

    &--rounded {
      --foxy-toolbar---border-radius: 4px;
    }

    &--absolute {
      --foxy-toolbar---position: absolute;
    }

    &--collapse {
      --foxy-toolbar---max-width: 112px;
      --foxy-toolbar---overflow: hidden;
      --foxy-toolbar---border-end-end-radius: 24px;

      #{$this}__title {
        --foxy-toolbar__title---display: none;
      }
    }

    &--flat {
      --foxy-toolbar---box-shadow: none;
    }

    &--floating {
      --foxy-toolbar---display: inline-flex;
    }

    &__wrapper {
      align-items: var(--foxy-toolbar__wrapper---align-items);
      display: var(--foxy-toolbar__wrapper---display);
      flex: var(--foxy-toolbar__wrapper---flex);
      flex-direction: var(--foxy-toolbar__wrapper---flex-direction);
      justify-content: var(--foxy-toolbar__wrapper---justify-content);
      height: var(--foxy-toolbar__wrapper---height);
    }

    &__content,
    &__extension {
      align-items: var(--foxy-toolbar__content---align-items);
      display: var(--foxy-toolbar__content---display);
      flex: var(--foxy-toolbar__content---flex);
      position: var(--foxy-toolbar__content---position);
      transition: var(--foxy-toolbar__content---transition);
      width: var(--foxy-toolbar__content---width);
    }

    &__content {
      height: var(--foxy-toolbar__content---height);

      > .foxy-btn:first-child {
        margin-inline-start: 10px;
      }

      > .foxy-btn:last-child {
        margin-inline-end: 10px;
      }

      > #{$this}__title {
        --foxy-toolbar__title---margin-inline-start: 16px;
      }
    }

    &__prepend {
      align-items: var(--foxy-toolbar__prepend---align-items);
      align-self: var(--foxy-toolbar__prepend---align-self);
      display: var(--foxy-toolbar__prepend---display);
      margin-inline: var(--foxy-toolbar__prepend---margin-inline);
      height: var(--foxy-toolbar__prepend---height);
    }

    &__append {
      align-items: var(--foxy-toolbar__append---align-items);
      align-self: var(--foxy-toolbar__append---align-self);
      display: var(--foxy-toolbar__append---display);
      margin-inline: var(--foxy-toolbar__append---margin-inline);
      height: var(--foxy-toolbar__append---height);
    }

    &__title {
      flex: 1 1;
      align-self: var(--foxy-toolbar__title---align-self);
      padding: var(--foxy-toolbar__title---padding);
      font-size: var(--foxy-toolbar__title---font-size);
      min-width: var(--foxy-toolbar__title---min-width);
      font-weight: var(--foxy-toolbar__title---font-weight);
      letter-spacing: var(--foxy-toolbar__title---letter-spacing);
      line-height: var(--foxy-toolbar__title---line-height);
      text-transform: var(--foxy-toolbar__title---text-transform);
      margin: var(--foxy-toolbar__title---margin);
      display: var(--foxy-toolbar__title---display);
    }

    &__items {
      display: flex;
      height: inherit;
      align-self: stretch;

      > .foxy-btn {
        border-radius: 0;
      }
    }
  }
</style>

<style>
  :root {
    --foxy-toolbar---border-top-width: 0;
    --foxy-toolbar---border-left-width: 0;
    --foxy-toolbar---border-bottom-width: 0;
    --foxy-toolbar---border-right-width: 0;
    --foxy-toolbar---border-width: var(--foxy-toolbar---border-top-width) var(--foxy-toolbar---border-left-width) var(--foxy-toolbar---border-bottom-width) var(--foxy-toolbar---border-right-width);
    --foxy-toolbar---border-color: rgba(0, 0, 0, 0.87);
    --foxy-toolbar---border-style: solid;
    --foxy-toolbar---border-start-start-radius: 0;
    --foxy-toolbar---border-start-end-radius: 0;
    --foxy-toolbar---border-end-start-radius: 0;
    --foxy-toolbar---border-end-end-radius: 0;
    --foxy-toolbar---border-radius: var(--foxy-toolbar---border-start-start-radius) var(--foxy-toolbar---border-start-end-radius) var(--foxy-toolbar---border-end-start-radius) var(--foxy-toolbar---border-end-end-radius);

    --foxy-toolbar---max-width: 100%;
    --foxy-toolbar---width: 100%;

    --foxy-toolbar---box-sizing: border-box;

    --foxy-toolbar---position: relative;

    --foxy-toolbar---overflow: hidden;

    --foxy-toolbar---transition-duration: 0.2s;
    --foxy-toolbar---transition-property: height, width, transform, max-width, left, right, top, bottom, box-shadow;
    --foxy-toolbar---transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);

    --foxy-toolbar---color: rgba(0, 0, 0, 0.87);
    --foxy-toolbar---box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.2), 0px 0px 0px 0px rgba(0, 0, 0, 0.14), 0px 0px 0px 0px rgba(0, 0, 0, 0.12);
    --foxy-toolbar---background: rgb(255, 255, 255);

    --foxy-toolbar__wrapper---flex: none;
    --foxy-toolbar__wrapper---display: flex;
    --foxy-toolbar__wrapper---align-items: flex-start;
    --foxy-toolbar__wrapper---flex-direction: column;
    --foxy-toolbar__wrapper---justify-content: space-between;
    --foxy-toolbar__wrapper---height: 100%;

    --foxy-toolbar__title---display: block;
    --foxy-toolbar__title---min-width: 0;
    --foxy-toolbar__title---font-size: 1.25rem;
    --foxy-toolbar__title---font-weight: 400;
    --foxy-toolbar__title---letter-spacing: 0;
    --foxy-toolbar__title---line-height: 1.75rem;
    --foxy-toolbar__title---text-transform: none;
    --foxy-toolbar__title---align-self: inherit;
    --foxy-toolbar__title---margin-inline-start: 0;
    --foxy-toolbar__title---margin-inline-end: 0;
    --foxy-toolbar__title---margin-inline: var(--foxy-toolbar__title---margin-inline-start) var(--foxy-toolbar__title---margin-inline-end);
    --foxy-toolbar__title---margin-block-start: 0;
    --foxy-toolbar__title---margin-block-end: 0;
    --foxy-toolbar__title---margin-block: var(--foxy-toolbar__title---margin-inline-start) var(--foxy-toolbar__title---margin-inline-end);
    --foxy-toolbar__title---margin: var(--foxy-toolbar__title---margin-block) var(--foxy-toolbar__title---margin-inline);
    --foxy-toolbar__title---padding-block-start: 0;
    --foxy-toolbar__title---padding-block-end: 0;
    --foxy-toolbar__title---padding-block: var(--foxy-toolbar__title---padding-block-start) var(--foxy-toolbar__title---padding-block-end);
    --foxy-toolbar__title---padding-inline-start: 0;
    --foxy-toolbar__title---padding-inline-end: 0;
    --foxy-toolbar__title---padding-inline: var(--foxy-toolbar__title---padding-inline-start) var(--foxy-toolbar__title---padding-inline-end);
    --foxy-toolbar__title---padding: var(--foxy-toolbar__title---padding-block) var(--foxy-toolbar__title---padding-inline);

    --foxy-toolbar__content---display: flex;
    --foxy-toolbar__content---align-items: center;
    --foxy-toolbar__content---width: 100%;
    --foxy-toolbar__content---position: relative;
    --foxy-toolbar__content---transition: inherit;
    --foxy-toolbar__content---flex: 0 0 auto;
    --foxy-toolbar__content---height: 100%;

    --foxy-toolbar__append---margin-inline-start: auto;
    --foxy-toolbar__append---margin-inline-end: 10px;
    --foxy-toolbar__append---margin-inline: var(--foxy-toolbar__append---margin-inline-start) var(--foxy-toolbar__append---margin-inline-end);
    --foxy-toolbar__append---align-items: center;
    --foxy-toolbar__append---align-self: stretch;
    --foxy-toolbar__append---display: flex;
    --foxy-toolbar__append---height: 100%;

    --foxy-toolbar__prepend---margin-inline-start: 10px;
    --foxy-toolbar__prepend---margin-inline-end: auto;
    --foxy-toolbar__prepend---margin-inline: var(--foxy-toolbar__prepend---margin-inline-start) var(--foxy-toolbar__prepend---margin-inline-end);
    --foxy-toolbar__prepend---align-items: center;
    --foxy-toolbar__prepend---align-self: stretch;
    --foxy-toolbar__prepend---display: flex;
    --foxy-toolbar__prepend---height: 100%;
  }
</style>
