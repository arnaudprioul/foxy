<template>
	<Story
			:init-state="initState"
			group="components"
			title="Containment/App Bar"
	>
		<Variant title="Default">
			<template #default>
				<foxy-app-bar
						order="0"
						v-bind="state"
				/>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { FoxyAppBar } from '@foxy/components'

	import { IAppBarProps } from "@foxy/interfaces"

	import { reactive } from "vue"

	const state: Partial<IAppBarProps> = reactive({
		title: 'My Application',
		image: {
			alt: 'Toolkit',
			width: 36,
			src: new URL('/public/logo.svg', import.meta.url).href
		}
	})
</script>
<docs lang="md">
App bar Documentation
</docs>
