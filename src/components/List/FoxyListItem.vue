<template>
  <component
      :is="link.tag"
      v-ripple="isClickable && ripple"
      :class="listItemClasses"
      :href="link.href.value"
      :style="listItemStyles"
      :tabindex="listItemTabIndex"
      @click="handleClick"
      @keydown="isClickable && !isLink && handleKeyDown">
    <span v-if="isClickable || isActive" key="overlay" class="foxy-list-item__overlay"/>
    <span key="underlay" class="foxy-list-item__underlay"/>

    <slot name="wrapper">
      <div v-if="hasPrepend" key="prepend" class="foxy-list-item__prepend" @click="handleClickPrepend">
        <slot name="prepend" v-bind="slotProps">
          <foxy-avatar
              v-if="prependAvatar"
              key="prepend-avatar"
              :density="density"
              :image="prependAvatar"
          />
          <foxy-icon
              v-if="prependIcon"
              key="prepend-icon"
              :density="density"
              :icon="prependIcon"
          />
        </slot>
      </div>

      <div class="foxy-list-item__content" data-no-activator="">
        <div v-if="hasTitle" key="title" class="foxy-list-item__title">
          <slot name="title" v-bind="{ title }">{{ title }}</slot>
        </div>

        <div v-if="hasSubtitle" key="subtitle" class="foxy-list-item__subtitle">
          <slot name="subtitle" v-bind="{ subtitle }">{{ subtitle }}</slot>
        </div>

        <slot name="default" v-bind="slotProps"></slot>
      </div>

      <div v-if="hasAppend" key="append" class="foxy-list-item__append" @click="handleClickAppend">
        <slot name="append" v-bind="slotProps">
          <foxy-avatar
              v-if="appendAvatar"
              key="append-avatar"
              :density="density"
              :image="appendAvatar"
          />
          <foxy-icon
              v-if="appendIcon"
              key="append-icon"
              :density="density"
              :icon="appendIcon"
          />
        </slot>
      </div>
    </slot>
  </component>
</template>

<script lang="ts" setup>
  import { FoxyAvatar, FoxyIcon } from '@foxy/components'

  import {
    useAdjacent,
    useBackgroundColor,
    useBorder,
    useDensity,
    useDimension,
    useElevation,
    useLink,
    useList,
    useMargin,
    useNestedItem,
    usePadding,
    useRounded,
    useSlots
  } from '@foxy/composables'

  import { vRipple } from '@foxy/directives'
  import { KEYBOARD_VALUES } from '@foxy/enums'

  import { IListItemProps } from '@foxy/interfaces'

  import { TListItemSlot } from '@foxy/types'

  import { computed, StyleValue, toRef, useAttrs, watch } from 'vue'

  const attrs = useAttrs()

  const props = withDefaults(defineProps<IListItemProps>(), { tag: 'div' })

  const emits = defineEmits(['click', 'click:append', 'click:prepend'])

  const { hasSlot } = useSlots()
  const link = useLink(props, attrs)
  const id = computed(() => props.value === undefined ? link.href.value : props.value)
  const {
    select,
    isSelected,
    isIndeterminate,
    isGroupActivator,
    root,
    parent,
    openOnSelect
  } = useNestedItem(id, false)
  const list = useList()
  const { backgroundColorStyles } = useBackgroundColor(toRef(props, 'bgColor'))
  const { borderClasses, borderStyles } = useBorder(props)
  const { paddingClasses, paddingStyles } = usePadding(props)
  const { marginClasses, marginStyles } = useMargin(props)
  const { densityClasses } = useDensity(props)
  const { dimensionStyles } = useDimension(props)
  const { elevationClasses } = useElevation(props)
  const { roundedClasses, roundedStyles } = useRounded({ rounded: props.rounded || props.nav })

  const {
    onClickPrepend: handleClickPrepend,
    onClickAppend: handleClickAppend,
    hasAppend,
    hasPrepend
  } = useAdjacent(props, emits)

  const isActive = computed(() => {
    return props.active || link.isActive?.value || isSelected.value
  })
  const isLink = computed(() => {
    return props.link && link.isLink.value
  })
  const isClickable = computed(() => {
    return !props.disabled && props.link && (props.link || link.isClickable.value || (props.value != null && !!list))
  })
  const lineClasses = computed(() => props.lines ? `foxy-list-item--${props.lines}-line` : undefined)
  const listItemTabIndex = computed(() => {
    return isClickable.value ? (list ? -2 : 0) : undefined
  })

  watch(() => link.isActive?.value, (val) => {
    if (val && parent.value != null) {
      root.open(parent.value, true)
    }

    if (val) {
      openOnSelect(val)
    }
  }, { immediate: true })

  // EVENTS

  const click = (e: MouseEvent) => {
    emits('click', e)

    if (isGroupActivator || !isClickable.value) return

    link.navigate?.(e)
    props.value != null && select(!isSelected.value, e)
  }
  const handleClick = (e: MouseEvent) => {
    click(e)
  }
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === KEYBOARD_VALUES.ENTER || e.key === ' ') {
      e.preventDefault()
      click(e as any as MouseEvent)
    }
  }

  // SLOTS

  const slotProps = computed(() => {
    return ({
      isActive: isActive.value,
      select,
      isSelected: isSelected.value,
      isIndeterminate: isIndeterminate.value,
    } satisfies TListItemSlot)
  })
  const hasTitle = computed(() => {
    return hasSlot('title') || props.title != null
  })
  const hasSubtitle = computed(() => {
    return hasSlot('subtitle') || props.subtitle != null
  })

  list?.updateHasPrepend(hasPrepend)
  list?.updateHasAppend(hasAppend)

  // CLASS & STYLES

  const listItemStyles = computed(() => {
    return [
      dimensionStyles.value,
      borderStyles.value,
      backgroundColorStyles.value,
      paddingStyles.value,
      marginStyles.value,
      roundedStyles.value,
      props.style
    ] as StyleValue
  })
  const listItemClasses = computed(() => {
    return [
      'foxy-list-item',
      {
        'foxy-list-item--active': isActive.value,
        'foxy-list-item--disabled': props.disabled,
        'foxy-list-item--link': isClickable.value,
        'foxy-list-item--nav': props.nav,
        'foxy-list-item--prepend': !hasPrepend && list && list.hasPrepend.value,
        'foxy-list-item--append': !hasAppend && list && list.hasAppend.value,
        'foxy-list-item--slim': props.slim,
        [`${props.activeClass}`]: props.activeClass && isActive.value,
      },
      borderClasses.value,
      densityClasses.value,
      elevationClasses.value,
      lineClasses.value,
      roundedClasses.value,
      paddingClasses.value,
      marginClasses.value,
      props.class,
    ]
  })

  defineExpose({ isGroupActivator, isSelected, list, select })
</script>

<style lang="scss" scoped>
  .foxy-list-item {
    $this: &;

    align-items: var(--foxy-list-item---align-items);
    display: var(--foxy-list-item---display);
    flex: var(--foxy-list-item---flex);
    grid-template-areas: var(--foxy-list-item---grid-template-areas);
    grid-template-columns: var(--foxy-list-item---grid-template-columns);

    max-width: var(--foxy-list-item---max-width);
    min-height: calc(var(--foxy-list-item---min-height) + var(--foxy-list---density));

    text-decoration: var(--foxy-list-item---text-decoration);

    outline: var(--foxy-list-item---outline);
    position: var(--foxy-list-item---position);

    padding-block-start: calc(var(--foxy-list-item---padding-block-start) + var(--foxy-list---density));
    padding-block-end: calc(var(--foxy-list-item---padding-block-end) + var(--foxy-list---density));
    padding-inline-start: calc(var(--foxy-list-item---padding-inline-start) + var(--foxy-list---indent-padding) + var(--foxy-list---density));
    padding-inline-end: calc(var(--foxy-list-item---padding-inline-end) + var(--foxy-list---density));

    margin-block-start: var(--foxy-list-item---margin-block-start);
    margin-block-end: var(--foxy-list-item---margin-block-end);
    margin-inline-start: var(--foxy-list-item---margin-inline-start);
    margin-inline-end: var(--foxy-list-item---margin-inline-end);

    border-color: var(--foxy-list-item---border-color);
    border-style: var(--foxy-list-item---border-style);
    border-width: var(--foxy-list-item---border-width);
    border-radius: var(--foxy-list-item---border-radius);

    &--bordered {
      --foxy-list-item---border-width: thin;
      --foxy-list-item---box-shadow: none;
    }

    &--rounded {
      --foxy-list-item---border-radius: 4px;
    }

    &--active {
      #{$this}__prepend,
      #{$this}__append {
        &,
        > .foxy-badge {
          .foxy-icon {
            --foxy-list-item__icon---opacity: 1;
          }
        }
      }
    }

    &--disabled {
      pointer-events: var(--foxy-list-item---pointer-events);
      user-select: var(--foxy-list-item---user-select);
      opacity: var(--foxy-list-item---opacity);
    }

    &--link {
      cursor: var(--foxy-list-item---cursor);
    }

    &--one-line {
      #{$this}__subtitle {
        -webkit-line-clamp: 1;
      }
    }

    &--two-line {
      #{$this}__subtitle {
        -webkit-line-clamp: 2;
      }
    }

    &--three-line {
      #{$this}__prepend {
        --foxy-list-item__prepend---align-self: start;
      }

      #{$this}__append {
        --foxy-list-item__append---align-self: start;
      }

      #{$this}__subtitle {
        -webkit-line-clamp: 3;
      }
    }

    &--nav {
      --foxy-list-item---padding-inline: 8px;

      &:not(:only-child) {
        --foxy-list-item---margin-block-end: 4px;
      }

      #{$this}__title {
        --foxy-list-item__title---font-size: 0.8125rem;
        --foxy-list-item__title---font-weight: 500;
        --foxy-list-item__title---letter-spacing: normal;
        --foxy-list-item__title---line-height: 1rem;
      }

      #{$this}__subtitle {
        --foxy-list-item__subtitle---font-size: 0.75rem;
        --foxy-list-item__subtitle---font-weight: 400;
        --foxy-list-item__subtitle---letter-spacing: 0.0178571429em;
        --foxy-list-item__subtitle---line-height: 1rem;
      }
    }

    &,
    &--active,
    [aria-haspopup=menu][aria-expanded=true] {
      &,
      &:hover,
      &:focus-visible {
        > #{$this}__overlay {
          --foxy-list-item__overlay---opacity: calc(0.12 * 1);
        }
      }
    }

    &__overlay {
      background-color: var(--foxy-list-item__overlay---background-color);
      border-radius: var(--foxy-list-item__overlay---border-radius);
      opacity: var(--foxy-list-item__overlay---opacity);
      pointer-events: var(--foxy-list-item__overlay---pointer-events);
      position: var(--foxy-list-item__overlay---position);
      bottom: var(--foxy-list-item__overlay---position-bottom);
      left: var(--foxy-list-item__overlay---position-left);
      right: var(--foxy-list-item__overlay---position-right);
      top: var(--foxy-list-item__overlay---position-top);
      transition-property: var(--foxy-list-item__overlay---transition-property);
      transition-duration: var(--foxy-list-item__overlay---transition-duration);
      transition-timing-function: var(--foxy-list-item__overlay---transition-timing-function);
    }

    &__underlay {
      position: var(--foxy-list-item__underlay---position);
    }

    &__prepend,
    &__append {
      &,
      > .foxy-badge {
        .foxy-icon {
          opacity: var(--foxy-list-item__icon---opacity);
        }
      }
    }

    &__prepend {
      align-items: var(--foxy-list-item__prepend---align-items);
      align-self: var(--foxy-list-item__prepend---align-self);
      display: var(--foxy-list-item__prepend---display);
      grid-area: var(--foxy-list-item__prepend---grid-area);
      min-width: var(--foxy-list-item__prepend---min-width);
      min-height: var(--foxy-list-item__prepend---min-height);
    }

    &__append {
      align-items: var(--foxy-list-item__append---align-items);
      align-self: var(--foxy-list-item__append---align-self);
      display: var(--foxy-list-item__append---display);
      grid-area: var(--foxy-list-item__append---grid-area);
      min-width: var(--foxy-list-item__append---min-width);
      min-height: var(--foxy-list-item__append---min-height);
    }

    &__content {
      align-self: var(--foxy-list-item__content---align-self);
      grid-area: var(--foxy-list-item__content---grid-area);
      overflow: var(--foxy-list-item__content---overflow);
    }

    &__title {
      hyphens: var(--foxy-list-item__title---hyphens);
      overflow-wrap: var(--foxy-list-item__title---overflow-wrap);
      overflow: var(--foxy-list-item__title---overflow);
      padding-block-start: var(--foxy-list-item__title---padding-block-start);
      padding-block-end: var(--foxy-list-item__title---padding-block-end);
      padding-inline-start: var(--foxy-list-item__title---padding-inline-start);
      padding-inline-end: var(--foxy-list-item__title---padding-inline-end);
      white-space: var(--foxy-list-item__title---white-space);
      text-overflow: var(--foxy-list-item__title---text-overflow);
      word-break: var(--foxy-list-item__title---word-break);
      word-wrap: var(--foxy-list-item__title---word-wrap);
      font-size: var(--foxy-list-item__title---font-size);
      font-weight: var(--foxy-list-item__title---font-weight);
      letter-spacing: var(--foxy-list-item__title---letter-spacing);
      line-height: var(--foxy-list-item__title---line-height);
      text-transform: var(--foxy-list-item__title---text-transform);
    }

    &__subtitle {
      -webkit-box-orient: vertical;
      display: var(--foxy-list-item__subtitle---display);
      opacity: var(--foxy-list-item__subtitle---opacity);
      overflow: var(--foxy-list-item__subtitle---overflow);
      padding-block-start: var(--foxy-list-item__subtitle---padding-block-start);
      padding-block-end: var(--foxy-list-item__subtitle---padding-block-end);
      padding-inline-start: var(--foxy-list-item__subtitle---padding-inline-start);
      padding-inline-end: var(--foxy-list-item__subtitle---padding-inline-end);
      text-overflow: var(--foxy-list-item__subtitle---text-overflow);
      word-break: var(--foxy-list-item__subtitle---word-break);
      font-size: var(--foxy-list-item__subtitle---font-size);
      font-weight: var(--foxy-list-item__subtitle---font-weight);
      letter-spacing: var(--foxy-list-item__subtitle---letter-spacing);
      line-height: var(--foxy-list-item__subtitle---line-height);
      text-transform: var(--foxy-list-item__subtitle---text-transform);
    }
  }
</style>

<style>
  :root {
    --foxy-list-item---align-items: center;
    --foxy-list-item---display: grid;
    --foxy-list-item---flex: none;
    --foxy-list-item---grid-template-areas: "prepend content append";
    --foxy-list-item---grid-template-columns: max-content 1fr auto;

    --foxy-list-item---max-width: 100%;
    --foxy-list-item---min-height: 40px;

    --foxy-list-item---text-decoration: none;

    --foxy-list-item---border-top-width: 0;
    --foxy-list-item---border-left-width: 0;
    --foxy-list-item---border-bottom-width: 0;
    --foxy-list-item---border-right-width: 0;
    --foxy-list-item---border-width: var(--foxy-list-item---border-top-width) var(--foxy-list-item---border-left-width) var(--foxy-list-item---border-bottom-width) var(--foxy-list-item---border-right-width);
    --foxy-list-item---border-color: rgba(0, 0, 0, 0.87);
    --foxy-list-item---border-style: solid;
    --foxy-list-item---border-start-start-radius: 0;
    --foxy-list-item---border-start-end-radius: 0;
    --foxy-list-item---border-end-start-radius: 0;
    --foxy-list-item---border-end-end-radius: 0;
    --foxy-list-item---border-radius: var(--foxy-list-item---border-start-start-radius) var(--foxy-list-item---border-start-end-radius) var(--foxy-list-item---border-end-start-radius) var(--foxy-list-item---border-end-end-radius);

    --foxy-list-item---padding-block-start: 8px;
    --foxy-list-item---padding-block-end: 8px;
    --foxy-list-item---padding-inline-start: 16px;
    --foxy-list-item---padding-inline-end: 16px;

    --foxy-list-item---margin-block-start: 0;
    --foxy-list-item---margin-block-end: 0;
    --foxy-list-item---margin-inline-start: 0;
    --foxy-list-item---margin-inline-end: 0;

    --foxy-list-item---position: relative;
    --foxy-list-item---outline: none;

    --foxy-list-item---pointer-events: none;
    --foxy-list-item---user-select: none;
    --foxy-list-item---opacity: 0.6;

    --foxy-list-item---cursor: pointer;

    --foxy-list-item__overlay---opacity: 0.2;
    --foxy-list-item__overlay---background-color: #000;
    --foxy-list-item__overlay---border-radius: inherit;
    --foxy-list-item__overlay---pointer-events: none;
    --foxy-list-item__overlay---position: absolute;
    --foxy-list-item__overlay---position-bottom: 0;
    --foxy-list-item__overlay---position-left: 0;
    --foxy-list-item__overlay---position-right: 0;
    --foxy-list-item__overlay---position-top: 0;
    --foxy-list-item__overlay---transition-property: opacity;
    --foxy-list-item__overlay---transition-duration: 0.2s;
    --foxy-list-item__overlay---transition-timing-function: ease-in-out;

    --foxy-list-item__underlay---position: absolute;

    --foxy-list-item__icon---opacity: 0.87;

    --foxy-list-item__prepend---align-items: center;
    --foxy-list-item__prepend---align-self: center;
    --foxy-list-item__prepend---display: flex;
    --foxy-list-item__prepend---grid-area: prepend;
    --foxy-list-item__prepend---min-width: 24px;
    --foxy-list-item__prepend---min-height: 24px;

    --foxy-list-item__append---align-items: center;
    --foxy-list-item__append---align-self: center;
    --foxy-list-item__append---display: flex;
    --foxy-list-item__append---grid-area: append;
    --foxy-list-item__append---min-width: 24px;
    --foxy-list-item__append---min-height: 24px;

    --foxy-list-item__content---align-self: center;
    --foxy-list-item__content---grid-area: content;
    --foxy-list-item__content---overflow: hidden;

    --foxy-list-item__title---hyphens: auto;
    --foxy-list-item__title---overflow-wrap: normal;
    --foxy-list-item__title---overflow: hidden;

    --foxy-list-item__title---padding-block-start: 0;
    --foxy-list-item__title---padding-block-end: 0;
    --foxy-list-item__title---padding-inline-start: 0;
    --foxy-list-item__title---padding-inline-end: 0;

    --foxy-list-item__title---white-space: nowrap;
    --foxy-list-item__title---text-overflow: ellipsis;
    --foxy-list-item__title---word-break: normal;
    --foxy-list-item__title---word-wrap: break-word;
    --foxy-list-item__title---font-size: 1rem;
    --foxy-list-item__title---font-weight: 400;
    --foxy-list-item__title---letter-spacing: 0.009375em;
    --foxy-list-item__title---line-height: 1.5rem;
    --foxy-list-item__title---text-transform: none;

    --foxy-list-item__subtitle---display: -webkit-box;
    --foxy-list-item__subtitle---opacity: 0.6;
    --foxy-list-item__subtitle---overflow: hidden;

    --foxy-list-item__subtitle---padding-block-start: 0;
    --foxy-list-item__subtitle---padding-block-end: 0;
    --foxy-list-item__subtitle---padding-inline-start: 0;
    --foxy-list-item__subtitle---padding-inline-end: 0;

    --foxy-list-item__subtitle---text-overflow: ellipsis;
    --foxy-list-item__subtitle---word-break: break-all;
    --foxy-list-item__subtitle---font-size: 0.875rem;
    --foxy-list-item__subtitle---font-weight: 400;
    --foxy-list-item__subtitle---letter-spacing: 0.0178571429em;
    --foxy-list-item__subtitle---line-height: 1rem;
    --foxy-list-item__subtitle---text-transform: none;
  }
</style>
