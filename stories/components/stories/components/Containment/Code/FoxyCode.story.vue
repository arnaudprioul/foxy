<template>
	<Story
			auto-props-disabled
			group="components"
			title="Containment/Code"
	>
		<Variant title="Default">
			<template #default>
				<foxy-container fullscreen>
					<foxy-row
							:align="ALIGN.CENTER"
							:justify="JUSTIFY.CENTER"
					>
						<foxy-col>
							<foxy-code v-bind="state"/>
						</foxy-col>
					</foxy-row>
				</foxy-container>
			</template>

			<template #controls>
				<hst-checkbox
						v-model="state.border"
						title="Border"
				/>

				<hst-rounded v-model:rounded="state.rounded"/>

				<hst-elevation
						v-model="state.elevation"
						title="Elevated"
				/>
			</template>
		</Variant>

	</Story>
</template>

<script
		lang="ts"
		setup
>

	import { FoxyCode, FoxyCol, FoxyContainer, FoxyRow } from '@foxy/components'

	import { ALIGN, JUSTIFY } from '@foxy/enums'

	import { ICodeProps } from '@foxy/interfaces'

	import { HstElevation, HstRounded } from '@stories/components/controls'
	import { reactive } from 'vue'

	const state: Partial<ICodeProps> = reactive({
		code: '{"code": "test", "lang": "json"}',
		lang: "json"
	})
</script>
<docs lang="md">
Code Documentation
</docs>
