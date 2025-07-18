<template>
  <hst-select
      v-model="align"
      :options="alignList"
      :title="getTitle"
  />
</template>

<script
    lang="ts"
    setup
>
	import { useVModel } from "@foxui/composables"
	import { ALIGN } from "@foxui/enums"
	import type { IAlignProps } from "@foxui/interfaces"

	import useTitle from '@stories/composables/title.composable'
	import { alignList } from '@stories/const/align.const'
	import type { TTitleProp } from '@stories/types/title.type'

	const props = defineProps<IAlignProps & TTitleProp>()

	const {getTitle} = useTitle(props.title, 'Align')

	const align = useVModel(props, 'align', ALIGN.STRETCH)

	// TODO - Manage specific Align Breackpoint
</script>
