<template>
    <hst-select
		    v-model="location"
		    :options="locationsList"
        :title="getTitle"
    />
</template>

<script
    lang="ts"
    setup
>
	import { useVModel } from "@origam/composables"
	import { BLOCK } from "@origam/enums"
	import type { ILocationProps } from "@origam/interfaces"
	import useTitle from '@stories/composables/title.composable'

	import { locationList, multipleLocationList } from '@stories/const/location.const'

	import type { TTitleProp } from '@stories/types/title.type'
	import { computed } from 'vue'

	const props = defineProps<{
    multiple?: boolean
	} & ILocationProps & TTitleProp>()

  const { getTitle } = useTitle(props.title, 'Direction')

	const locationsList = computed(() => {
    return props.multiple ? multipleLocationList : locationList
  })

	const location = useVModel(props, 'location', BLOCK.TOP)
</script>
