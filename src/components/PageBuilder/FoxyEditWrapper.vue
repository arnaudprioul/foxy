<template>
  <div
      :class="editWrapperClasses"
      :style="editWrapperStyles"
  >
    <div class="foxy-edit-wrapper__wrapper">
      <slot name="default"/>
    </div>
  </div>
</template>

<script
    lang="ts"
    setup
>
  import { useProps } from '@foxy/composables'
  import { IAutoPropComponentDefinition, IEditWrapperProps } from '@foxy/interfaces'
  import { scanForAutoProps } from '@foxy/utils'

  import { computed, StyleValue, useSlots, ref, watch } from 'vue'

  // TODO - WIP

  const props = withDefaults(defineProps<IEditWrapperProps>(), { slotName: 'default', autoDetectProps: true })

  const { filterProps } = useProps<IEditWrapperProps>(props)

  const slots = useSlots()

  const vnodes = ref<Array<any>>([])

  watch(() => props, () => {
	  if (typeof slots[props.slotName] !== "undefined") {
		  // @ts-expect-error TODO
		  vnodes.value = slots[props.slotName]()
	  }

	  if (slots[props.slotName] && props.autoDetectProps && vnodes) {
		  const _propsTypes: Array<IAutoPropComponentDefinition> = scanForAutoProps(vnodes.value)

		  console.log(_propsTypes)
	  }
  }, {
		immediate: true
  })

  // CLASS & STYLES

  const editWrapperStyles = computed(() => {
    return [
      props.style
    ] as StyleValue
  })
  const editWrapperClasses = computed(() => {
    return [
      'foxy-edit-wrapper',
      props.class
    ]
  })

  // EXPOSE

  defineExpose({
    filterProps
  })

</script>

<style
    lang="scss"
    scoped
>

</style>

<style>
:root {

}
</style>
