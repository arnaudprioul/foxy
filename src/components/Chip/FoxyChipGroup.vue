<template>
  <foxy-slide-group
      :class="chipGroupClasses"
      :style="chipGroupStyles"
      v-bind="{...slideGroupProps}">
    <slot name="default" v-bind="{isSelected, select, next, prev, selected}"/>
  </foxy-slide-group>
</template>

<script lang="ts" setup>
  import {FoxySlideGroup} from '@foxy/components'

  import {IChipGroupProps} from '@foxy/interfaces'

  import {DIRECTION} from '@foxy/enums'

  import {FOXY_CHIP_GROUP_KEY, SLIDE_GROUP_PROPS} from "@foxy/consts";

  import {useGroup} from "@foxy/composables";

  import {keys, omit, pick} from "@foxy/utils";

  import {computed, StyleValue} from "vue";

  const props = withDefaults(defineProps<IChipGroupProps>(), {
    direction: DIRECTION.HORIZONTAL,
    nextIcon: '$next',
    prevIcon: '$prev',
    selectedClass: 'foxy-chip--selected'
  })

  const emits = defineEmits(['update:modelValue'])

  const {isSelected, select, next, prev, selected} = useGroup(props, FOXY_CHIP_GROUP_KEY)

  const slideGroupProps = computed(() => {
    return omit(pick(props, keys(SLIDE_GROUP_PROPS)), ['class', 'style'])
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
</script>
