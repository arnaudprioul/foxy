<template>
  <component
      :is="link.tag"
      v-ripple="isRipple"
      :class="btnClasses"
      :disabled="isDisabled || undefined"
      :href="link.href.value"
      :style="btnStyles"
      :type="link.tag === 'a' ? undefined : 'button'"
      :value="valueAttr"
      @click="handleClick">
    <span key="overlay" class="foxy-btn__overlay"/>
    <span key="underlay" class="foxy-btn__underlay"/>

    <slot name="wrapper">
      <foxy-loader :loading="loading" class="foxy-btn__loader">
        <template v-if="hasLoader" #loader>
          <slot name="loader" v-bind="progressProps">
            <foxy-progress-circular v-bind="progressProps"/>
          </slot>
        </template>

        <template #default>
          <span v-if="hasPrepend" key="prepend" class="foxy-btn__prepend" @click="handleClickPrepend">
            <slot name="prepend">
              <foxy-avatar
                  v-if="prependAvatar"
                  key="prepend-avatar"
                  :density="density"
                  :image="prependAvatar"/>
              <foxy-icon
                  v-if="prependIcon"
                  key="prepend-icon"
                  :density="density"
                  :icon="prependIcon"/>
            </slot>
          </span>

          <span class="foxy-btn__content" data-no-activator="">
            <slot name="default">
              <template v-if="hasIcon">
                <foxy-icon
                    key="content-icon"
                    :icon="props.icon"
                />
              </template>
              <template v-else>
                {{ text }}
              </template>
            </slot>
          </span>

          <span v-if="hasAppend" key="append" class="foxy-btn__append" @click="handleClickAppend">
            <slot name="append">
             <foxy-avatar
                 v-if="appendAvatar"
                 key="append-avatar"
                 :density="density"
                 :image="appendAvatar"/>
             <foxy-icon
                 v-if="appendIcon"
                 key="append-icon"
                 :density="density"
                 :icon="appendIcon"/>
           </slot>
          </span>
        </template>
      </foxy-loader>
    </slot>
  </component>
</template>

<script lang="ts" setup>
  import { FoxyAvatar, FoxyIcon, FoxyLoader, FoxyProgressCircular } from '@foxy/components'

  import {
    useAdjacent,
    useBorder,
    useBothColor,
    useDensity,
    useDimension,
    useElevation,
    useGroupItem,
    useLink,
    useLoader,
    useLocation,
    useMargin,
    usePadding,
    usePosition,
    useRounded,
    useSelectLink,
    useSize,
    useSlots
  } from '@foxy/composables'

  import { COLOR_PROPS, FOXY_BTN_TOGGLE_KEY } from '@foxy/consts'

  import { vRipple } from '@foxy/directives'
  import { DENSITY, SIZES } from '@foxy/enums'

  import { IBtnProps } from '@foxy/interfaces'
  import { keys, pick } from '@foxy/utils'

  import { computed, StyleValue, toRef, useAttrs } from 'vue'

  const attrs = useAttrs()

  const props = withDefaults(defineProps<IBtnProps>(), {
    tag: 'button',
    ripple: true,
    active: undefined,
    size: SIZES.DEFAULT,
    density: DENSITY.DEFAULT
  })

  const emits = defineEmits(['group:selected', 'click:append', 'click:prepend'])

  const { colorStyles } = useBothColor(toRef(props, 'bgColor'), toRef(props, 'color'))
  const { densityClasses } = useDensity(props)
  const { dimensionStyles } = useDimension(props)
  const { elevationClasses } = useElevation(props)
  const { loaderClasses } = useLoader(props)
  const { locationStyles } = useLocation(props)
  const { positionClasses } = usePosition(props)
  const { roundedClasses, roundedStyles } = useRounded(props)
  const { borderClasses, borderStyles } = useBorder(props)
  const { paddingClasses, paddingStyles } = usePadding(props)
  const { marginClasses, marginStyles } = useMargin(props)
  const { sizeClasses, sizeStyles } = useSize(props)

  const {
    clickPrepend: handleClickPrepend,
    clickAppend: handleClickAppend,
    hasAppend,
    hasPrepend
  } = useAdjacent(props, emits)
  const group = useGroupItem(props, FOXY_BTN_TOGGLE_KEY, false)
  const link = useLink(props, attrs)
  const { hasSlot } = useSlots()

  useSelectLink(link, group?.select)

  const isActive = computed(() => {
    if (props.active !== undefined) {
      return props.active
    }

    if (link.isLink.value) {
      return link.isActive?.value
    }

    return group?.isSelected.value
  })
  const isDisabled = computed(() => group?.disabled.value || props.disabled)
  const isElevated = computed(() => {
    return !!props.elevation
  })
  const valueAttr = computed(() => {
    if (props.value === undefined || typeof props.value === 'symbol') return undefined

    return Object(props.value) === props.value
        ? JSON.stringify(props.value, null, 0)
        : props.value
  })
  const isRipple = computed(() => {
    return [
      !isDisabled.value && props.ripple,
      null,
      props.icon ? ['center'] : null,
    ]
  })

  const handleClick = (e: MouseEvent) => {
    if (
        isDisabled.value ||
        (link.isLink.value && (
            e.metaKey ||
            e.ctrlKey ||
            e.shiftKey ||
            (e.button !== 0) ||
            attrs.target === '_blank'
        ))
    ) return

    link.navigate?.(e)
    group?.toggle()
  }

  const hasIcon = computed(() => {
    return !!(props.icon && props.icon !== true)
  })
  const hasLoader = computed(() => {
    return hasSlot('loader') || props.loading
  })

  const progressProps = computed(() => {
    return Object.assign({
          size: '23',
          indeterminate: true
        },
        pick(props, keys(COLOR_PROPS)))
  })

  // CLASS & STYLES

  const btnStyles = computed(() => {
    return [
      borderStyles.value,
      paddingStyles.value,
      marginStyles.value,
      colorStyles.value,
      dimensionStyles.value,
      locationStyles.value,
      roundedStyles.value,
      sizeStyles.value,
      props.style
    ] as StyleValue
  })
  const btnClasses = computed(() => {
    return [
      'foxy-btn',
      group?.selectedClass.value,
      {
        'foxy-btn--active': isActive.value,
        'foxy-btn--block': props.block,
        'foxy-btn--disabled': isDisabled.value,
        'foxy-btn--elevated': isElevated.value,
        'foxy-btn--flat': props.flat,
        'foxy-btn--icon': !!props.icon,
        'foxy-btn--loading': props.loading,
        'foxy-btn--slim': props.slim,
        'foxy-btn--stacked': props.stacked,
      },
      borderClasses.value,
      paddingClasses.value,
      marginClasses.value,
      densityClasses.value,
      elevationClasses.value,
      loaderClasses.value,
      positionClasses.value,
      roundedClasses.value,
      sizeClasses.value,
      props.class,
    ]
  })

  defineExpose({ group })
</script>

<style lang="scss" scoped>
  .foxy-btn {
    $this: &;

    align-items: center;
    border-radius: 4px;
    display: inline-grid;
    grid-template-areas: "prepend content append";
    grid-template-columns: max-content auto max-content;
    font-weight: 500;
    justify-content: center;
    letter-spacing: 0.0892857143em;
    line-height: normal;
    max-width: 100%;
    outline: none;
    position: relative;
    text-decoration: none;
    text-indent: 0.0892857143em;
    text-transform: uppercase;
    transition-property: box-shadow, transform, opacity, background;
    transition-duration: 0.28s;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    user-select: none;
    vertical-align: middle;
    flex-shrink: 0;
    border-color: currentColor;
    border-style: solid;
    border-width: 0;
    height: var(--foxy-btn---height, 36px);
    cursor: pointer;

    &--size-x-small {
      --foxy-btn---height: 20px;
      font-size: 0.625rem;
      min-width: 36px;
      padding: 0 8px;
    }

    &--size-small {
      --foxy-btn---height: 28px;
      font-size: 0.75rem;
      min-width: 50px;
      padding: 0 12px;
    }

    &--size-default {
      --foxy-btn---height: 36px;
      font-size: 0.875rem;
      min-width: 64px;
      padding: 0 16px;
    }

    &--size-large {
      --foxy-btn---height: 44px;
      font-size: 1rem;
      min-width: 78px;
      padding: 0 20px;
    }

    &--size-x-large {
      --foxy-btn---height: 52px;
      font-size: 1.125rem;
      min-width: 92px;
      padding: 0 24px;
    }

    &--density-default {
      --foxy-btn---density: 0px;
    }

    &--density-compact {
      --foxy-btn---density: -8px;
    }

    &--bordered {
      border-width: thin;
      box-shadow: none;
    }

    &--absolute {
      position: absolute;
    }

    &--fixed {
      position: fixed;
    }

    &:hover,
    &:focus-visible,
    &:focus {
      > #{$this}__overlay {
        opacity: 0.5;
      }
    }

    &--active,
    [aria-haspopup=menu][aria-expanded=true] {
      > #{$this}__overlay {
        opacity: 0.5;
      }

      &:hover,
      &:focus-visible,
      &:focus {
        > #{$this}__overlay {
          opacity: 0.7;
        }
      }
    }

    &--icon {
      border-radius: 50%;
      min-width: 0;
      padding: 0;

      &#{$this}--density-default {
        width: calc(var(--foxy-btn---height) + 12px);
        height: calc(var(--foxy-btn---height) + 12px);
      }

      &#{$this}--density-compact {
        width: calc(var(--foxy-btn---height) + -8px);
        height: calc(var(--foxy-btn---height) + -8px);
      }
    }

    &--flat {
      box-shadow: none;
    }

    &--block {
      display: flex;
      flex: 1 0 auto;
      min-width: 100%;
    }

    &--disabled {
      pointer-events: none;
      opacity: 0.26;

      &:hover {
        opacity: 0.26;
      }
    }

    &--loading {
      pointer-events: none;

      #{$this}__content,
      #{$this}__prepend,
      #{$this}__append {
        opacity: 0;
      }
    }

    &--stacked {
      grid-template-areas: "prepend" "content" "append";
      grid-template-columns: auto;
      grid-template-rows: max-content max-content max-content;
      justify-items: center;
      align-content: center;

      #{$this}__content {
        flex-direction: column;
        line-height: 1.25;
      }

      #{$this}__prepend,
      #{$this}__append,
      #{$this}__content > :deep(.foxy-icon--start),
      #{$this}__content > :deep(.foxy-icon--end) {
        margin-inline: 0;
      }

      #{$this}__prepend,
      #{$this}__content > :deep(.foxy-icon--start) {
        margin-bottom: 4px;
      }

      #{$this}__append,
      #{$this}__content > :deep(.foxy-icon--end) {
        margin-top: 4px;
      }

      #{$this}__content {
        white-space: normal;
      }

      &#{$this}--size-x-small {
        --foxy-btn---height: 56px;
        font-size: 0.625rem;
        min-width: 56px;
        padding: 0 12px;
      }

      &#{$this}--size-small {
        --foxy-btn---height: 64px;
        font-size: 0.75rem;
        min-width: 64px;
        padding: 0 14px;
      }

      &#{$this}--size-default {
        --foxy-btn---height: 72px;
        font-size: 0.875rem;
        min-width: 72px;
        padding: 0 16px;
      }

      &#{$this}--size-large {
        --foxy-btn---height: 80px;
        font-size: 1rem;
        min-width: 80px;
        padding: 0 18px;
      }

      &#{$this}--size-x-large {
        --foxy-btn---height: 88px;
        font-size: 1.125rem;
        min-width: 88px;
        padding: 0 20px;
      }

      &#{$this}--density-default {
        height: calc(var(--foxy-btn---height) + 0px);
      }

      &#{$this}--density-compact {
        height: calc(var(--foxy-btn---height) + -24px);
      }
    }

    &--slim {
      padding: 0 8px;
    }

    &--rounded {
      border-radius: 24px;

      &#{$this}--icon {
        border-radius: 4px;
      }
    }

    &__loader {
      align-items: center;
      display: flex;
      height: 100%;
      justify-content: center;
      width: 100%;

      :deep(.foxy-progress--circular) {
        width: 1.5em;
        height: 1.5em;
      }
    }

    &__content,
    &__prepend,
    &__append {
      align-items: center;
      display: flex;
      transition: transform, opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    }

    &__prepend {
      grid-area: prepend;
      margin-inline: calc(var(--foxy-btn---height) / -9) calc(var(--foxy-btn---height) / 4.5);
    }

    &__append {
      grid-area: append;
      margin-inline: calc(var(--foxy-btn---height) / 4.5) calc(var(--foxy-btn---height) / -9);
    }

    &__content {
      grid-area: content;
      justify-content: center;
      white-space: nowrap;

      > :deep(.foxy-icon--start) {
        margin-inline: calc(var(--foxy-btn---height) / -9) calc(var(--foxy-btn---height) / 4.5);
      }

      > :deep(.foxy-icon--end) {
        margin-inline: calc(var(--foxy-btn---height) / 4.5) calc(var(--foxy-btn---height) / -9);
      }
    }

    &__overlay {
      background-color: #000;
      border-radius: inherit;
      opacity: 0;
      transition: opacity 0.2s ease-in-out;
    }

    &__overlay,
    &__underlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
    }
  }
</style>

<style>
  :root {

  }
</style>
