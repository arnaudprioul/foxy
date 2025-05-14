<template>
  <hst-select
      v-model="icon"
      :options="iconList"
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
	import type { TTitleProp } from '@stories/types/title.type'

	const props = defineProps<IIconProps & TTitleProp>()

  const { getTitle } = useTitle(props.title, 'Icon')

	const icon = useVModel(props, 'icon', '')
</script>
