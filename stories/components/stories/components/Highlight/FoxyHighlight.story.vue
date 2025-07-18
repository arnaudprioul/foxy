<template>
	<Story
			auto-props-disabled
			group="components"
			title="Highlight"
	>
		<Variant title="Default">
			<template #default>
				<foxui-container fullscreen>
					<foxui-row
							:align-content="ALIGN.CENTER"
							:justify="JUSTIFY.CENTER"
					>
						<foxui-col cols="auto">
							<foxui-highlight v-bind="state"/>
						</foxui-col>
					</foxui-row>
				</foxui-container>
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
	import { FoxuiCol, FoxuiContainer, FoxuiHighlight, FoxuiRow } from '@foxui/components'
	import { ALIGN, JUSTIFY } from '@foxui/enums'
	import type { IHighlightProps } from '@foxui/interfaces'

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
