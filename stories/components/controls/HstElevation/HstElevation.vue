<template>
  <hst-slider
		  v-model="elevation"
		  :max="max"
		  :min="min"
      :title="getTitle"
  />
</template>

<script
    lang="ts"
    setup
>
	import { useVModel } from "@origam/composables"
	import type { IElevationProps } from "@origam/interfaces"

	import useTitle from '@stories/composables/title.composable'
	import type { TTitleProp } from "@stories/types/title.type"
	import { computed } from "vue"

	const props = defineProps<{
		max?: string | number,
		min?: string | number,
	} & IElevationProps & TTitleProp>()

  const { getTitle } = useTitle(props.title, 'Elevation')

	const elevation = useVModel(props, 'elevation', 0)

	const min = computed(() => {
		return props.min ?? 0
	})

	const max = computed(() => {
		return props.min ?? 24
	})
</script>
