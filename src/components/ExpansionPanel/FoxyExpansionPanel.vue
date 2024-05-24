<template>
  <component
      :is="tag"
      :class="expansionPanelClasses"
      :style="expansionPanelStyles">
    <div
        :class="[...elevationClasses]"
        class="foxy-expansion-panel__shadow"/>

    <template v-if="hasHeader">
      <slot name="header" v-bind="expansionPanelHeaderProps">
        <foxy-expansion-panel-header
            key="header"
            class="foxy-expansion-panel__header"
            v-bind="expansionPanelHeaderProps">
          <template v-if="hasSlot('prepend')" #prepend="prependSlotProps">
            <slot name="prepend" v-bind="prependSlotProps"/>
          </template>

          <template v-if="hasSlot('title')" #title="titleSlotProps">
            <slot name="title" v-bind="titleSlotProps">
              {{ title }}
            </slot>
          </template>

          <template v-if="hasSlot('append')" #append="appendSlotProps">
            <slot name="append" v-bind="appendSlotProps"/>
          </template>
        </foxy-expansion-panel-header>
      </slot>
    </template>

    <template v-if="hasContent">
      <slot name="wrapper" v-bind="expansionPanelContentProps">
        <foxy-expansion-panel-content
            key="content"
            class="foxy-expansion-panel__content"
            v-bind="expansionPanelContentProps">
          <template v-if="hasSlot('default')" #default>
            <slot name="default"/>
          </template>
        </foxy-expansion-panel-content>
      </slot>
    </template>

    <slot name="default"/>
  </component>
</template>

<script lang="ts" setup>
  import { FoxyExpansionPanelContent, FoxyExpansionPanelHeader } from '@foxy/components'
  import {
    useBorder,
    useBothColor,
    useDensity,
    useElevation,
    useGroupItem,
    useMargin,
    usePadding,
    useRounded,
    useSlots
  } from '@foxy/composables'

  import { EXPANSION_PANEL_CONTENT_PROPS, EXPANSION_PANEL_HEADER_PROPS, FOXY_EXPANSION_PANEL_KEY } from '@foxy/consts'

  import { IExpansionPanelProps } from '@foxy/interfaces'
  import { keys, omit, pick } from '@foxy/utils'

  import { computed, provide, StyleValue, toRef } from 'vue'

  const props = withDefaults(defineProps<IExpansionPanelProps>(), {
    expandIcon: '$expand',
    collapseIcon: '$collapse',
    tag: 'div'
  })

  const emits = defineEmits(['group:selected'])

  const groupItem = useGroupItem(props, FOXY_EXPANSION_PANEL_KEY)
  const { hasSlot } = useSlots()

  const { borderClasses, borderStyles } = useBorder(props)
  const { paddingClasses, paddingStyles } = usePadding(props)
  const { marginClasses, marginStyles } = useMargin(props)
  const { densityClasses } = useDensity(props)
  const { colorStyles } = useBothColor(toRef(props, 'bgColor'), toRef(props, 'color'))
  const { elevationClasses } = useElevation(props)
  const { roundedClasses, roundedStyles } = useRounded(props)

  const isDisabled = computed(() => {
    return groupItem?.disabled.value || props.disabled
  })

  const selectedIndices = computed(() => {
    return groupItem.group.items.value.reduce<number[]>((arr, item, index) => {
      if (groupItem.group.selected.value.includes(item.id)) {
        arr.push(index)
      }

      return arr
    }, [])
  })

  const isBeforeSelected = computed(() => {
    const index = groupItem.group.items.value.findIndex((item) => {
      return item.id === groupItem.id
    })

    return !groupItem.isSelected.value && selectedIndices.value.some((selectedIndex) => {
      return selectedIndex - index === 1
    })
  })
  const isAfterSelected = computed(() => {
    const index = groupItem.group.items.value.findIndex((item) => {
      return item.id === groupItem.id
    })

    return !groupItem.isSelected.value && selectedIndices.value.some((selectedIndex) => {
      return selectedIndex - index === -1
    })
  })

  provide(FOXY_EXPANSION_PANEL_KEY, groupItem)

  const hasContent = computed(() => {
    return hasSlot('content') || props.content
  })
  const hasHeader = computed(() => {
    return hasSlot('header') || hasSlot('title') || hasSlot('prepend') || hasSlot('append') || props.title
  })

  const expansionPanelHeaderProps = computed(() => {
    return omit(pick(props, keys(EXPANSION_PANEL_HEADER_PROPS)), ['class', 'id', 'style', 'tag'])
  })
  const expansionPanelContentProps = computed(() => {
    return omit(pick(props, keys(EXPANSION_PANEL_CONTENT_PROPS)), ['class', 'id', 'style', 'tag'])
  })

  // CLASS & STYLES

  const expansionPanelStyles = computed(() => {
    return [
      colorStyles.value,
      roundedStyles.value,
      borderStyles.value,
      paddingStyles.value,
      marginStyles.value,
      props.style
    ] as StyleValue
  })
  const expansionPanelClasses = computed(() => {
    return [
      'foxy-expansion-panel',
      {
        'foxy-expansion-panel--active': groupItem.isSelected.value,
        'foxy-expansion-panel--before-active': isBeforeSelected.value,
        'foxy-expansion-panel--after-active': isAfterSelected.value,
        'foxy-expansion-panel--disabled': isDisabled.value,
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
</script>
