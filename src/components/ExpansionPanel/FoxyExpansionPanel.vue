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
		        ref="expansionPanelHeaderRef"
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
		        ref="expansionPanelContentRef"
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
	  usePadding, useProps,
	  useRounded,
	  useSlots
  } from '@foxy/composables'

  import { FOXY_EXPANSION_PANEL_KEY } from '@foxy/consts'

  import { IExpansionPanelProps } from '@foxy/interfaces'
  import { TFoxyExpansionPanelContent, TFoxyExpansionPanelHeader } from "@foxy/types"

  import { keys, omit, pick } from '@foxy/utils'

  import { computed, provide, ref, StyleValue, toRef } from 'vue'

  const props = withDefaults(defineProps<IExpansionPanelProps>(), {
    expandIcon: '$expand',
    collapseIcon: '$collapse',
    tag: 'div'
  })

  const emits = defineEmits(['group:selected'])

  const {filterProps} = useProps<IExpansionPanelProps>(props)

  const expansionPanelHeaderRef = ref<TFoxyExpansionPanelHeader>()
  const expansionPanelContentRef = ref<TFoxyExpansionPanelContent>()

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
    return hasSlot('content') || !!props.content
  })
  const hasHeader = computed(() => {
    return hasSlot('header') || hasSlot('title') || hasSlot('prepend') || hasSlot('append') || !!props.title
  })

  const expansionPanelHeaderProps = computed(() => {
    return expansionPanelHeaderRef.value?.filterProps(props, ['class', 'id', 'style', 'tag'])
  })
  const expansionPanelContentProps = computed(() => {
    return expansionPanelContentRef.value?.filterProps(props, ['class', 'id', 'style', 'tag'])
  })

  // CLASSES & STYLES

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

  // EXPOSE

  defineExpose({
	  filterProps
  })
</script>

<style lang="scss" scoped>
  // TODO - Rework with css variables
  .foxy-expansion-panel {
    flex: 1 0 100%;
    max-width: 100%;
    position: relative;
    transition: 0.3s all cubic-bezier(0.4, 0, 0.2, 1);
    transition-property: margin-top, border-radius, border, max-width;
    border-radius: 4px;

    &:not(:first-child) {
      &:after {
        border-top-style: solid;
        border-top-width: thin;
        border-top-color: rgba(33, 33, 33, 0.12);
        content: "";
        left: 0;
        position: absolute;
        right: 0;
        top: 0;
        transition: 0.3s opacity cubic-bezier(0.4, 0, 0.2, 1);
      }
    }

    &--disabled {
      :deep(.foxy-expansion-panel-header) {
        color: rgba(0, 0, 0, 0.26);
        pointer-events: none;

        .foxy-expansion-panel-header__overlay {
          opacity: 0.4615384615;
        }
      }
    }

    &--active {
      &:not(:first-child),
      + .foxy-expansion-panel {
        margin-top: 16px;

        &:after {
          opacity: 0;
        }
      }

      :deep(.foxy-expansion-panel-header) {
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;

        &:not(.v-expansion-panel-title--static) {
          min-height: 64px;
        }
      }
    }

    &__shadow {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      box-shadow: 0px 3px 1px -2px var(--v-shadow-key-umbra-opacity, rgba(0, 0, 0, 0.2)), 0px 2px 2px 0px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.14)), 0px 1px 5px 0px var(--v-shadow-key-ambient-opacity, rgba(0, 0, 0, 0.12));
      border-radius: inherit;
      z-index: -1;
    }
  }
</style>

<style>
  :root {

  }
</style>
