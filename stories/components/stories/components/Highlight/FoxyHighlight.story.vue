<template>
	<Story
			auto-props-disabled
			group="components"
			title="Highlight"
	>
		<Variant title="Default">
			<template #default>
				<origam-container fullscreen>
					<origam-row
							:align-content="ALIGN.CENTER"
							:justify="JUSTIFY.CENTER"
					>
						<origam-col cols="auto">
							<origam-highlight v-bind="state"/>
						</origam-col>
					</origam-row>
				</origam-container>
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
	import { OrigamCol, OrigamContainer, OrigamHighlight, OrigamRow } from '@origam/components'
	import { ALIGN, JUSTIFY } from '@origam/enums'
	import type { IHighlightProps } from '@origam/interfaces'

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
