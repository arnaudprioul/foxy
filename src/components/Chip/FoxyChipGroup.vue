<template>
  <foxy-slide-group
		  ref="foxySlideGroupRef"
      :class="chipGroupClasses"
      :style="chipGroupStyles"
      v-bind="{...slideGroupProps}">
    <slot name="default" v-bind="{isSelected, select, next, prev, selected}"/>
  </foxy-slide-group>
</template>

<script lang="ts" setup>
  import {FoxySlideGroup} from '@foxy/components'

  import {IChipGroupProps} from '@foxy/interfaces'

  import { DIRECTION, MDI_ICONS } from '@foxy/enums'

  import {FOXY_CHIP_GROUP_KEY} from "@foxy/consts"

  import { useGroup, useProps } from "@foxy/composables"

  import { TFoxySlideGroup } from "@foxy/types"

  import { computed, ref, StyleValue } from "vue";

  const props = withDefaults(defineProps<IChipGroupProps>(), {
    direction: DIRECTION.HORIZONTAL,
    nextIcon: MDI_ICONS.CHEVRON_RIGHT,
    prevIcon: MDI_ICONS.CHEVRON_LEFT,
    selectedClass: 'foxy-chip--selected'
  })

  defineEmits(['update:modelValue'])

  const {filterProps} = useProps<IChipGroupProps>(props)

  const foxySlideGroupRef = ref<TFoxySlideGroup>()

  const {isSelected, select, next, prev, selected} = useGroup(props, FOXY_CHIP_GROUP_KEY)

  const slideGroupProps = computed(() => {
    return foxySlideGroupRef.value?.filterProps(props)
  })

  // CLASS & STYLES

  const chipGroupStyles = computed(() => {
    return [
      props.style,
    ] as StyleValue
  })
  const chipGroupClasses = computed(() => {
    return [
      'foxy-chip-group',
      {
        'foxy-chip-group--column': props.column,
      },
      props.class,
    ]
  })

  // EXPOSE

  defineExpose({
	  filterProps
  })
</script>
