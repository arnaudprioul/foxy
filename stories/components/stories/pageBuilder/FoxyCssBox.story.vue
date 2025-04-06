<template>
	<Story
			auto-props-disabled
			group="pageBuilder"
			title="CssBox"
	>
		<Variant title="Default">
			<template #default>
				<foxy-css-box v-bind="state"/>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { FoxyCssBox } from '@foxy/components'
	import { ICssBoxProps } from "@foxy/interfaces"
	import { reactive } from "vue"

	const state: Partial<ICssBoxProps> = reactive({})
</script>
<docs lang="md">
Css Box Documentation
</docs>
