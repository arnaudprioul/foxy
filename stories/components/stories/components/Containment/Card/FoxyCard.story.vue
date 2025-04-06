<template>
	<Story
			auto-props-disabled
			group="components"
			title="Containment/Card"
	>
		<Variant title="Default">
			<template #default>
				<foxy-container fullscreen>
					<foxy-row
							:align="ALIGN.CENTER"
							:justify="JUSTIFY.CENTER"
					>
						<foxy-col>
							<foxy-card v-bind="state"/>
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

				<hst-icon
						v-model="state.prependIcon"
						title="Prepend Icon"
				/>
				<hst-icon
						v-model="state.appendIcon"
						title="Append Icon"
				/>

				<hst-checkbox
						v-model="state.disabled"
						title="Disabled"
				/>

				<hst-checkbox
						v-model="state.loading"
						title="Loading"
				/>

				<hst-text
						v-model="state.title"
						title="Tile"
				/>
				<hst-text
						v-model="state.subtitle"
						title="Subtitle"
				/>

				<hst-textarea
						v-model="state.text"
						title="Text"
				/>
			</template>
		</Variant>

	</Story>
</template>

<script
		lang="ts"
		setup
>

	import { FoxyCard, FoxyCol, FoxyContainer, FoxyRow } from '@foxy/components'

	import { ALIGN, JUSTIFY } from '@foxy/enums'

	import { ICardProps } from '@foxy/interfaces'

	import { HstElevation, HstIcon, HstRounded } from '@stories/components/controls'
	import { reactive } from 'vue'

	const state: Partial<ICardProps> = reactive({
		loading: true,
		title: 'Card title',
		subtitle: 'Subtitle',
		text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!'
	})
</script>
<docs lang="md">
Card Documentation
</docs>
