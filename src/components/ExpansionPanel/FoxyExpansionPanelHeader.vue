<template>
  <component
      :is="tag"
      v-ripple="props.ripple"
      :aria-expanded="isSelected"
      :class="expansionPanelHeaderClasses"
      :disabled="isDisabled"
      :style="expansionPanelHeaderStyles"
      :tabindex="isDisabled ? -1 : undefined"
      type="button"
      @click="!props.readonly ? expansionPanel.toggle : undefined"
  >
    <span class="foxy-expansion-panel-header__overlay"/>

    <div class="foxy-expansion-panel-header__wrapper">
      <span v-if="hasPrepend" key="prepend" class="foxy-expansion-panel-header__prepend" @click="handleClickPrepend">
        <slot name="prepend" v-bind="slotProps"/>
      </span>

      <span v-if="hasTitle" class="foxy-expansion-panel-header__title">
        <slot name="default" v-bind="slotProps">
          {{ title }}
        </slot>
      </span>

      <span v-if="hasAppend && !props.hideActions" key="append" class="foxy-expansion-panel-header__append"
            @click="handleClickAppend">
        <slot name="append" v-bind="slotProps">
          <foxy-icon :icon="isSelected ? props.collapseIcon : props.expandIcon"/>
        </slot>
      </span>
    </div>
  </component>
</template>

<script lang="ts" setup>
  import { FoxyIcon } from '@foxy/components'

  import {
    useAdjacent,
    useBorder,
    useBothColor,
    useDensity,
    useMargin,
    usePadding,
    useRounded,
    useSlots
  } from '@foxy/composables'

  import { FOXY_EXPANSION_PANEL_KEY } from '@foxy/consts'

  import { IExpansionPanelHeaderProps } from '@foxy/interfaces'

  import { computed, inject, StyleValue, toRef } from 'vue'

  const props = withDefaults(defineProps<IExpansionPanelHeaderProps>(), {
    tag: 'button',
    expandIcon: '$expand',
    collapseIcon: '$collapse',
  })

  const emits = defineEmits(['click:append', 'click:prepend'])

  const expansionPanel = inject(FOXY_EXPANSION_PANEL_KEY)

  if (!expansionPanel) throw new Error('[Foxy] expansion-panel-content needs to be placed inside expansion-panel')

  const { hasSlot } = useSlots()

  const {
    hasAppend,
    hasPrepend,
    onClickPrepend: handleClickPrepend,
    onClickAppend: handleClickAppend
  } = useAdjacent(props, emits)
  const { borderClasses, borderStyles } = useBorder(props)
  const { paddingClasses, paddingStyles } = usePadding(props)
  const { marginClasses, marginStyles } = useMargin(props)
  const { densityClasses } = useDensity(props)
  const { colorStyles } = useBothColor(toRef(props, 'bgColor'), toRef(props, 'color'))
  const { roundedClasses, roundedStyles } = useRounded(props)

  const isSelected = computed(() => {
    return expansionPanel.isSelected.value
  })
  const isDisabled = computed(() => {
    return expansionPanel.disabled.value
  })

  const slotProps = computed(() => {
    return {
      collapseIcon: props.collapseIcon,
      disabled: expansionPanel.disabled.value,
      expanded: expansionPanel.isSelected.value,
      expandIcon: props.expandIcon,
      readonly: props.readonly
    }
  })

  const hasTitle = computed(() => {
    return hasSlot('default') || props.title
  })

  // CLASS & STYLES

  const expansionPanelHeaderStyles = computed(() => {
    return [
      colorStyles.value,
      roundedStyles.value,
      borderStyles.value,
      paddingStyles.value,
      marginStyles.value,
      props.style
    ] as StyleValue
  })
  const expansionPanelHeaderClasses = computed(() => {
    return [
      'foxy-expansion-panel-header',
      {
        'foxy-expansion-panel-header--active': expansionPanel.isSelected.value,
        'foxy-expansion-panel-header--focusable': props.focusable,
        'foxy-expansion-panel-header--static': props.static,
      },
      borderClasses.value,
      paddingClasses.value,
      marginClasses.value,
      densityClasses.value,
      roundedClasses.value,
      props.class
    ]
  })
</script>
