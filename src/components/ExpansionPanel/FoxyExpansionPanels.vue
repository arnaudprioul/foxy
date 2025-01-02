<template>
  <component
    :is="tag"
    :class="expansionPanelsClasses"
    :style="expansionPanelsStyles">
    <slot name="default">
      <template v-for="(item, index) in items" :key="index">
        <slot :name="`item.${index}`" v-bind="{collapseIcon, expandIcon, hideActions, item, index}">
          <slot name="item" v-bind="{collapseIcon, expandIcon, hideActions, item, index}">
            <foxy-expansion-panel v-bind="{collapseIcon, expandIcon, hideActions, ...item}">
              <template v-if="hasSlot(`header.${index}`) || hasSlot('header')" #header="headerSlotProps">
                <slot :name="`header.${index}`" v-bind="headerSlotProps">
                  <slot name="header" v-bind="headerSlotProps"/>
                </slot>
              </template>

              <template v-if="hasSlot(`prepend.${index}`) || hasSlot('prepend')" #prepend="prependSlotProps">
                <slot :name="`prepend.${index}`" v-bind="prependSlotProps">
                  <slot name="prepend" v-bind="prependSlotProps"/>
                </slot>
              </template>

              <template v-if="hasSlot(`title.${index}`) || hasSlot('title')" #title="titleSlotProps">
                <slot :name="`title.${index}`" v-bind="titleSlotProps">
                  <slot name="title" v-bind="titleSlotProps"/>
                </slot>
              </template>

              <template v-if="hasSlot(`append.${index}`) || hasSlot('append')" #append="appendSlotProps">
                <slot :name="`append.${index}`" v-bind="appendSlotProps">
                  <slot name="append" v-bind="appendSlotProps"/>
                </slot>
              </template>

              <template v-if="hasSlot(`wrapper.${index}`) || hasSlot('wrapper')" #wrapper="wrapperSlotProps">
                <slot :name="`wrapper.${index}`" v-bind="wrapperSlotProps">
                  <slot name="wrapper" v-bind="wrapperSlotProps"/>
                </slot>
              </template>

              <template v-if="hasSlot(`content.${index}`) || hasSlot('content')" #default>
                <slot :name="`content.${index}`">
                  <slot name="content"/>
                </slot>
              </template>
            </foxy-expansion-panel>
          </slot>
        </slot>
      </template>
    </slot>
  </component>
</template>

<script lang="ts" setup>
  import { FoxyExpansionPanel } from '@foxy/components'

  import {
	  useBorder,
	  useBothColor,
	  useDensity,
	  useGroup,
	  useMargin,
	  usePadding, useProps,
	  useRounded,
	  useSlots
  } from '@foxy/composables'

  import { FOXY_EXPANSION_PANEL_KEY } from '@foxy/consts'

  import { IExpansionPanelsProps } from '@foxy/interfaces'

  import { computed, StyleValue, toRef } from 'vue'

  const props = withDefaults(defineProps<IExpansionPanelsProps>(), {
    tag: 'div'
  })

  const emits = defineEmits(['update:modelValue'])

  const {filterProps} = useProps<IExpansionPanelsProps>(props)

  useGroup(props, FOXY_EXPANSION_PANEL_KEY)

  const { hasSlot } = useSlots()

  const { borderClasses, borderStyles } = useBorder(props)
  const { paddingClasses, paddingStyles } = usePadding(props)
  const { marginClasses, marginStyles } = useMargin(props)
  const { densityClasses } = useDensity(props)
  const { colorStyles } = useBothColor(toRef(props, 'bgColor'), toRef(props, 'color'))
  const { roundedClasses, roundedStyles } = useRounded(props)

  // CLASSES & STYLES

  const expansionPanelsStyles = computed(() => {
    return [
      colorStyles.value,
      roundedStyles.value,
      borderStyles.value,
      paddingStyles.value,
      marginStyles.value,
      props.style
    ] as StyleValue
  })
  const expansionPanelsClasses = computed(() => {
    return [
      'foxy-expansion-panels',
      {
        'foxy-expansion-panels--flat': props.flat,
        'foxy-expansion-panels--accordion': props.accordion,
        'foxy-expansion-panels--popout': props.popout,
        'foxy-expansion-panels--inset': props.inset,
      },
      borderClasses.value,
      paddingClasses.value,
      marginClasses.value,
      densityClasses.value,
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
  .foxy-expansion-panels {
    $this: &;

    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    list-style-type: none;
    padding: 0;
    width: 100%;
    position: relative;
    z-index: 1;

    &:not(.foxy-expansion-panels--accordion) {
      > * {
        &:not(:first-child) {
          &:not(:last-child) {
            &:not(.foxy-expansion-panel--active) {
              &:not(.foxy-expansion-panel--before-active) {
                border-bottom-left-radius: 0;
                border-bottom-right-radius: 0;
              }

              &:not(.foxy-expansion-panel--after-active) {
                border-top-left-radius: 0;
                border-top-right-radius: 0;
              }
            }
          }
        }

        &:first-child {
          &:not(:last-child) {
            &:not(.foxy-expansion-panel--active) {
              &:not(.foxy-expansion-panel--before-active) {
                border-bottom-left-radius: 0;
                border-bottom-right-radius: 0;
              }
            }
          }
        }

        &:last-child {
          &:not(:first-child) {
            &:not(.foxy-expansion-panel--active) {
              &:not(.foxy-expansion-panel--after-active) {
                border-top-left-radius: 0;
                border-top-right-radius: 0;
              }
            }
          }
        }
      }
    }

    &#{$this}--accordion {
      > * {
        &:first-child {
          &:not(:last-child) {
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
          }
        }

        &:last-child {
          &:not(:first-child) {
            border-top-left-radius: 0;
            border-top-right-radius: 0;

            :deep(.foxy-expansion-panel-header--active) {
              border-bottom-left-radius: initial;
              border-bottom-right-radius: initial;
            }
          }
        }

        &:not(:first-child) {
          &:not(:last-child) {
            border-radius: 0;
          }
        }
      }

      :deep(.foxy-expansion-panel-header__overlay) {
        transition: 0.3s border-radius cubic-bezier(0.4, 0, 0.2, 1);
      }

      > .foxy-expansion-panel {
        margin-top: 0;

        &:after {
          opacity: 1;
        }
      }
    }

    &#{$this}--popout {
      > .foxy-expansion-panel {
        max-width: calc(100% - 32px);

        &--active {
          max-width: calc(100% + 16px);
        }
      }
    }

    &#{$this}--inset {
      > .foxy-expansion-panel {
        max-width: 100%;

        &--active {
          max-width: calc(100% - 32px);
        }
      }
    }

    &#{$this}--flat {
      > .foxy-expansion-panel {
        &:after {
          border-top: none;
        }

        :deep(.foxy-expansion-panel__shadow) {
          display: none;
        }
      }
    }
  }
</style>

<style>
  :root {

  }
</style>
