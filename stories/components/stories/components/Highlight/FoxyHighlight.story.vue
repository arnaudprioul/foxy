<template>
	<Story
			auto-props-disabled
			group="components"
			title="Highlight"
	>
		<Variant title="Default">
			<template #default>
				<foxy-container fullscreen>
					<foxy-row
							:align-content="ALIGN.CENTER"
							:justify="JUSTIFY.CENTER"
					>
						<foxy-col cols="auto">
							<foxy-highlight v-bind="state"/>
						</foxy-col>
					</foxy-row>
				</foxy-container>
			</template>
			<template #controls>
				<hst-text
						v-model="state.text"
						title="Text"
				/>

				<hst-checkbox title="border" v-model="state.border"/>

				<hst-rounded v-model:rounded="state.rounded"/>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { FoxyCol, FoxyContainer, FoxyHighlight, FoxyRow } from '@foxy/components'
	import { ALIGN, JUSTIFY } from '@foxy/enums'
	import type { IHighlightProps } from '@foxy/interfaces'

	import { HstRounded } from '@stories/components/controls'
	import { reactive } from 'vue'

	const state: Partial<IHighlightProps> = reactive({
		text: 'Highlight',
		color: "#ffc529",
		bgColor: "#7d6fa1"
	})
</script>

<docs lang="md">

</docs>
