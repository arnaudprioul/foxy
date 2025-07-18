<template>
	<hst-select
			v-model="icon"
			:options="optionsList"
			:title="getTitle"
	/>
</template>

<script
		lang="ts"
		setup
>
	import { useVModel } from "@foxy/composables"
	import type { IIconProps } from "@foxy/interfaces"

	import useTitle from '@stories/composables/title.composable'

	import { iconList } from '@stories/const/icon.const'
	import { TMoreOptionsProp } from "@stories/types/options.type"
	import type { TTitleProp } from '@stories/types/title.type'

	import { computed } from 'vue'

	const props = defineProps<IIconProps & TTitleProp & TMoreOptionsProp>()

	const {getTitle} = useTitle(props.title, 'Icon')

	const icon = useVModel(props, 'icon', '')

	const optionsList = computed(() => {
		if (props.moreOptions) return [].concat(iconList, props.moreOptions)

		return iconList
	})
</script>
