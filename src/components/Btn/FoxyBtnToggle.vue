<template>
  <foxy-btn-group
      :class="btnToggleClasses"
      :styles="btnToggleStyles"
      v-bind="btnGroupProps">
    <template v-if="hasSlot('default')" #default>
      <slot name="default" v-bind="{items, isSelected, next, prev, select, selected }"/>
    </template>

    <template v-if="hasSlot('item')" #item="{item, index}">
      <slot name="item" v-bind="{item, index}"/>
    </template>
  </foxy-btn-group>
</template>

<script lang="ts" setup>
  import { FoxyBtnGroup } from '@foxy/components'

  import { useGroup, useSlots } from '@foxy/composables'

  import { BTN_GROUP_PROPS, FOXY_BTN_TOGGLE_KEY } from '@foxy/consts'

  import { DENSITY } from '@foxy/enums'

  import { IBtnGroupProps, IBtnToggleProps } from '@foxy/interfaces'

  import { keys, omit, pick } from '@foxy/utils'

  import { computed, StyleValue } from 'vue'

  const props = withDefaults(defineProps<IBtnToggleProps>(), { tag: 'div', items: [], density: DENSITY.DEFAULT })

  const emits = defineEmits(['update:modelValue'])

  const { isSelected, next, prev, select, selected } = useGroup(props, FOXY_BTN_TOGGLE_KEY)

  const { hasSlot } = useSlots()

  const btnGroupProps = computed(() => {
    const btnGroup = pick(props, keys(BTN_GROUP_PROPS))

    return omit(btnGroup, ['class', 'style'])
  })

  // CLASS & STYLES

  const btnToggleStyles = computed(() => {
    return [
      props.style
    ] as StyleValue
  })
  const btnToggleClasses = computed(() => {
    return [
      'foxy-btn-toggle',
      props.class,
    ]
  })
</script>

<style lang="scss" scoped>

</style>

<style>
  :root {

  }
</style>
