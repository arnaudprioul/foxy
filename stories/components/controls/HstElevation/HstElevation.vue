<template>
  <hst-slider
		  v-model="state"
		  :max="max"
		  :min="min"
      :title="getTitle"
      @update:model-value="handleChange"
  />
</template>

<script
    lang="ts"
    setup
>
	import { useVModel } from "@foxy/composables"
	import useTitle from '@stories/composables/title.composable'

	import { titleProp } from '@stories/const/title.const'

	const props = defineProps({
    modelValue: {
	    type: [Number, String]
    },
		max: {
			type: Number,
			default: 24
		},
		min: {
			type: Number,
			default: 0
		},
    ...titleProp
  })

  const emit = defineEmits(['update:modelValue'])

  const { getTitle } = useTitle(props.title, 'Elevation')

	const state = useVModel(props, 'modelValue', 0)

  const handleChange = (value: string) => {
    emit('update:modelValue', value || undefined)
  }
</script>
