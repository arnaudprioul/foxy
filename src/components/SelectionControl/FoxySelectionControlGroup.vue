<template>
  <div
    :class="selectionControlGroupClasses"
    :style="selectionControlGroupStyles">
    <slot name="default" v-bind="{items}">
      <template v-for="(item, index) in items" :key="index">
        <slot :name="`item.${index}`" v-bind="{item}">
          <slot name="item" v-bind="{item}"/>
        </slot>
      </template>
    </slot>
  </div>
</template>

<script lang="ts" setup>
  import { useVModel } from '@foxy/composables'

  import { FOXY_SELECTION_CONTROL_GROUP_KEY } from '@foxy/consts'

  import { DENSITY } from '@foxy/enums'

  import { ISelectionControlGroupProps } from '@foxy/interfaces'

  import { getUid } from '@foxy/utils'

  import { computed, onScopeDispose, provide, StyleValue } from 'vue'

  const props = withDefaults(defineProps<ISelectionControlGroupProps>(), {
    tag: 'div',
    density: DENSITY.DEFAULT,
    items: []
  })

  const emits = defineEmits(['update:modelValue'])

  const modelValue = useVModel(props, 'modelValue')
  const uid = getUid()
  const id = computed(() => {
    return props.id || `foxy-selection-control-group-${uid}`
  })
  const name = computed(() => {
    return props.name || id.value
  })

  const updateHandlers = new Set<() => void>()

  provide(FOXY_SELECTION_CONTROL_GROUP_KEY, {
    modelValue,
    forceUpdate: () => {
      updateHandlers.forEach(fn => fn())
    },
    onForceUpdate: (cb) => {
      updateHandlers.add(cb)

      onScopeDispose(() => {
        updateHandlers.delete(cb)
      })
    },
  })

  // CLASS & STYLES

  const selectionControlGroupStyles = computed(() => {
    return [
      props.style,
    ] as StyleValue
  })
  const selectionControlGroupClasses = computed(() => {
    return [
      'foxy-selection-control-group',
      { 'foxy-selection-control-group--inline': props.inline },
      props.class,
    ]
  })
</script>
