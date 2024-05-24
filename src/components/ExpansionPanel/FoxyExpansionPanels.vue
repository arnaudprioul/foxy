<template>
  <component
      :is="tag"
      :class="expansionPanelsClasses"
      :style="expansionPanelsStyles">
    <slot name="default">
      <template v-for="(item, index) in items" :key="index">
        <slot :name="`item-${index}`" v-bind="{item, index}">
          <slot name="item" v-bind="{item, index}">
            <foxy-expansion-panel v-bind="item">
              <template v-if="hasSlot(`header-${index}`) || hasSlot('header')" #header="headerSlotProps">
                <slot :name="`header-${index}`" v-bind="headerSlotProps">
                  <slot name="header" v-bind="headerSlotProps"/>
                </slot>
              </template>

              <template v-if="hasSlot(`prepend-${index}`) || hasSlot('prepend')" #prepend="prependSlotProps">
                <slot :name="`prepend-${index}`" v-bind="prependSlotProps">
                  <slot name="prepend" v-bind="prependSlotProps"/>
                </slot>
              </template>

              <template v-if="hasSlot(`title-${index}`) || hasSlot('title')" #title="titleSlotProps">
                <slot :name="`title-${index}`" v-bind="titleSlotProps">
                  <slot name="title" v-bind="titleSlotProps"/>
                </slot>
              </template>

              <template v-if="hasSlot(`append-${index}`) || hasSlot('append')" #append="appendSlotProps">
                <slot :name="`append-${index}`" v-bind="appendSlotProps">
                  <slot name="append" v-bind="appendSlotProps"/>
                </slot>
              </template>

              <template v-if="hasSlot(`wrapper-${index}`) || hasSlot('wrapper')" #wrapper="wrapperSlotProps">
                <slot :name="`wrapper-${index}`" v-bind="wrapperSlotProps">
                  <slot name="wrapper" v-bind="wrapperSlotProps"/>
                </slot>
              </template>

              <template v-if="hasSlot(`content-${index}`) || hasSlot('content')" #default>
                <slot :name="`content-${index}`">
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
    usePadding,
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

  useGroup(props, FOXY_EXPANSION_PANEL_KEY)

  const { hasSlot } = useSlots()

  const { borderClasses, borderStyles } = useBorder(props)
  const { paddingClasses, paddingStyles } = usePadding(props)
  const { marginClasses, marginStyles } = useMargin(props)
  const { densityClasses } = useDensity(props)
  const { colorStyles } = useBothColor(toRef(props, 'bgColor'), toRef(props, 'color'))
  const { roundedClasses, roundedStyles } = useRounded(props)

  // CLASS & STYLES

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
