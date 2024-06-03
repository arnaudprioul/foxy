<template>
  <component
      :is="tag"
      :class="listClasses"
      :style="listStyles"
      :tabindex="tabIndex"
      role="listbox"
      @focus="handleFocus"
      @focusin="handleFocusIn"
      @focusout="handleFocusOut"
      @keydown="handleKeydown"
      @mousedown="handleMouseDown">
    <slot name="default">
      <foxy-list-children
          v-if="items"
          :items="items"
          :returnObject="returnObject">
        <template v-if="hasChildrenItem" #children="{item, index}">
          <slot name="children-item" v-bind="{item, index}"/>
        </template>

        <template v-if="hasDivider" #divider="{itemProps}">
          <slot name="divider" v-bind="itemProps"/>
        </template>

        <template v-if="hasSubheader" #subheader="{itemProps}">
          <slot name="subheader" v-bind="itemProps"/>
        </template>

        <template v-if="hasGroup" #group="{itemProps}">
          <slot name="group" v-bind="itemProps"/>
        </template>

        <template v-if="hasGroupActivator" #groupActivator="{props, isOpen, events, toggleIcon}">
          <slot name="groupActivator" v-bind="{props, isOpen, events, toggleIcon}"/>
        </template>

        <template v-if="hasItem" #item="{itemProps}">
          <slot name="item" v-bind="itemProps"/>
        </template>
      </foxy-list-children>
    </slot>
  </component>
</template>

<script lang="ts" setup>
  import { FoxyListChildren } from '@foxy/components'

  import {
    useBorder,
    useBothColor,
    useCreateList,
    useDensity,
    useDimension,
    useElevation,
    useListItems,
    useMargin,
    useNested,
    usePadding,
    useRounded,
    useSlots
  } from '@foxy/composables'

  import { DENSITY, KEYBOARD_VALUES, LINES, OPEN_STRATEGY, SELECT_STRATEGY } from '@foxy/enums'

  import { IListProps } from '@foxy/interfaces'

  import { TFocusLocation } from '@foxy/types'

  import { deepEqual, focusChild } from '@foxy/utils'

  import { computed, ref, shallowRef, StyleValue, toRef } from 'vue'

  const props = withDefaults(defineProps<IListProps>(), {
    tag: 'div',
    lines: LINES.ONE,
    selectStrategy: SELECT_STRATEGY.SINGLE_LEAF,
    openStrategy: OPEN_STRATEGY.LIST,
    itemType: 'type',
    items: [],
    itemTitle: 'title',
    itemValue: 'value',
    itemChildren: 'children',
    itemProps: 'props',
    valueComparator: deepEqual,
    density: DENSITY.DEFAULT
  })

  const emit = defineEmits(['update:selected', 'update:opened', 'click:open', 'click:select'])

  const { items } = useListItems(props)
  const { colorStyles } = useBothColor(toRef(props, 'bgColor'), toRef(props, 'color'))
  const { densityClasses } = useDensity(props)
  const { dimensionStyles } = useDimension(props)
  const { elevationClasses } = useElevation(props)
  const { roundedClasses, roundedStyles } = useRounded(props)
  const { borderClasses, borderStyles } = useBorder(props)
  const { paddingClasses, paddingStyles } = usePadding(props)
  const { marginClasses, marginStyles } = useMargin(props)
  const { children, open, parents, select } = useNested(props)
  const { hasSlot } = useSlots()

  useCreateList()

  const isFocused = shallowRef(false)
  const contentRef = ref<HTMLElement>()

  const lineClasses = computed(() => props.lines ? `foxy-list--${props.lines}-line` : undefined)
  const tabIndex = computed(() => {
    return (props.disabled || isFocused.value) ? -1 : 0
  })

  const handleFocus = (e: FocusEvent) => {
    if (!isFocused.value && !(e.relatedTarget && contentRef.value?.contains(e.relatedTarget as Node))) {
      focus()
    }
  }
  const handleFocusIn = (_e: FocusEvent) => {
    isFocused.value = true
  }
  const handleFocusOut = (_e: FocusEvent) => {
    isFocused.value = false
  }
  const handleKeydown = (e: KeyboardEvent) => {
    if (!contentRef.value) return

    if (e.key === KEYBOARD_VALUES.DOWN) {
      focus('next')
    } else if (e.key === KEYBOARD_VALUES.UP) {
      focus('prev')
    } else if (e.key === KEYBOARD_VALUES.HOME) {
      focus('first')
    } else if (e.key === KEYBOARD_VALUES.END) {
      focus('last')
    } else {
      return
    }

    e.preventDefault()
  }
  const handleMouseDown = (_e: MouseEvent) => {
    isFocused.value = true
  }
  const focus = (location?: TFocusLocation) => {
    if (contentRef.value) {
      return focusChild(contentRef.value, location)
    }
  }

  // SLOTS

  const hasChildrenItem = computed(() => {
    return hasSlot('children-item')
  })
  const hasDivider = computed(() => {
    return hasSlot('divider')
  })
  const hasSubheader = computed(() => {
    return hasSlot('subheader')
  })
  const hasGroup = computed(() => {
    return hasSlot('group')
  })
  const hasGroupActivator = computed(() => {
    return hasSlot('group-activator')
  })
  const hasItem = computed(() => {
    return hasSlot('item')
  })

  // CLASS & STYLES

  const listStyles = computed(() => {
    return [
      colorStyles.value,
      dimensionStyles.value,
      borderStyles.value,
      roundedStyles.value,
      paddingStyles.value,
      marginStyles.value,
      props.style
    ] as StyleValue
  })
  const listClasses = computed(() => {
    return [
      'foxy-list',
      {
        'foxy-list--disabled': props.disabled,
        'foxy-list--nav': props.nav,
        'foxy-list--slim': props.slim,
      },
      borderClasses.value,
      paddingClasses.value,
      marginClasses.value,
      densityClasses.value,
      elevationClasses.value,
      lineClasses.value,
      roundedClasses.value,
      props.class
    ]
  })

  defineExpose({ open, select, focus, children, parents })
</script>

<style lang="scss" scoped>
  .foxy-list {
    padding-block-start: var(--foxy-list---padding-block-start);
    padding-block-end: var(--foxy-list---padding-block-end);
    padding-inline-start: var(--foxy-list---padding-inline-start);
    padding-inline-end: var(--foxy-list---padding-inline-end);

    position: var(--foxy-list---position);
    overflow: var(--foxy-list---overflow);
    outline: var(--foxy-list---outline);

    border-color: var(--foxy-list---border-color);
    border-style: var(--foxy-list---border-style);
    border-width: var(--foxy-list---border-width);
    border-radius: var(--foxy-list---border-radius);

    background: var(--foxy-list---background);
    box-shadow: var(--foxy-list---box-shadow);
    color: var(--foxy-list---color);

    pointer-events: var(--foxy-list---pointer-events);
    user-select: var(--foxy-list---user-select);

    &--bordered {
      --foxy-list---border-width: thin;
      --foxy-list---box-shadow: none;
    }

    &--disabled {
      --foxy-list---pointer-events: none;
      --foxy-list---user-select: none;
    }

    &--nav {
      --foxy-list---padding-inline: 8px;
      --foxy-list-subheader---font-size: 0.75rem;
      --foxy-list---indent-padding: -8px;
    }

    &--rounded {
      --foxy-list---border-radius: 4px;
    }

    &--subheader {
      --foxy-list---padding-block-start: 0px;
    }

    &--slim {
      --foxy-list-group---prepend-width: var(--foxy-list--slim---prepend-width);
    }

    &--density-default {
      --foxy-list---density: 0px;
    }

    &--density-compact {
      --foxy-list---density: -8px;
    }

    &__overlay {
      background-color: var(--foxy-list__overlay---background-color);
      border-radius: var(--foxy-list__overlay---border-radius);
      opacity: var(--foxy-list__overlay---opacity);
      pointer-events: var(--foxy-list__overlay---pointer-events);
      position: var(--foxy-list__overlay---position);
      bottom: var(--foxy-list__overlay---position-bottom);
      left: var(--foxy-list__overlay---position-left);
      right: var(--foxy-list__overlay---position-right);
      top: var(--foxy-list__overlay---position-top);
      transition-property: var(--foxy-list__overlay---transition-property);
      transition-duration: var(--foxy-list__overlay---transition-duration);
      transition-timing-function: var(--foxy-list__overlay---transition-timing-function);
    }
  }
</style>

<style>
  :root {
    --foxy-list---indent-padding: 0px;

    --foxy-list---border-top-width: 0;
    --foxy-list---border-left-width: 0;
    --foxy-list---border-bottom-width: 0;
    --foxy-list---border-right-width: 0;
    --foxy-list---border-width: var(--foxy-list---border-top-width) var(--foxy-list---border-left-width) var(--foxy-list---border-bottom-width) var(--foxy-list---border-right-width);
    --foxy-list---border-color: rgba(0, 0, 0, 0.87);
    --foxy-list---border-style: solid;
    --foxy-list---border-start-start-radius: 0;
    --foxy-list---border-start-end-radius: 0;
    --foxy-list---border-end-start-radius: 0;
    --foxy-list---border-end-end-radius: 0;
    --foxy-list---border-radius: var(--foxy-list---border-start-start-radius) var(--foxy-list---border-start-end-radius) var(--foxy-list---border-end-start-radius) var(--foxy-list---border-end-end-radius);

    --foxy-list---padding-block-start: 8px;
    --foxy-list---padding-block-end: 8px;
    --foxy-list---padding-inline-start: 0;
    --foxy-list---padding-inline-end: 0;

    --foxy-list---overflow: auto;
    --foxy-list---position: relative;
    --foxy-list---outline: none;

    --foxy-list---pointer-events: auto;
    --foxy-list---user-select: auto;

    --foxy-list---color: rgba(0, 0, 0, 0.87);
    --foxy-list---box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.2), 0px 0px 0px 0px rgba(0, 0, 0, 0.14), 0px 0px 0px 0px rgba(0, 0, 0, 0.12);
    --foxy-list---background: rgb(255, 255, 255);

    --foxy-list__overlay---background-color: #000;
    --foxy-list__overlay---border-radius: inherit;
    --foxy-list__overlay---opacity: 0;
    --foxy-list__overlay---pointer-events: none;
    --foxy-list__overlay---position: absolute;
    --foxy-list__overlay---position-bottom: 0;
    --foxy-list__overlay---position-left: 0;
    --foxy-list__overlay---position-right: 0;
    --foxy-list__overlay---position-top: 0;
    --foxy-list__overlay---transition-property: opacity;
    --foxy-list__overlay---transition-duration: 0.2s;
    --foxy-list__overlay---transition-timing-function: ease-in-out;

    --foxy-list--slim---prepend-width: 28px;
  }
</style>
