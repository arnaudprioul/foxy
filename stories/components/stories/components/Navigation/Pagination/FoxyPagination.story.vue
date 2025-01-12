<template>
	<Story
			auto-props-disabled
			group="components"
			title="Navigation/Pagination"
	>
		<Variant title="Default">
			<template #default>
				<foxy-container fullscreen>
					<foxy-row :align="ALIGN.CENTER" :justify="JUSTIFY.CENTER">
						<foxy-col>
							<foxy-pagination v-bind="state"/>
						</foxy-col>
					</foxy-row>
				</foxy-container>
			</template>
			<template #controls>
				<hst-text v-model="state.ellipsis" title="ellipsis"/>

				<hst-text v-model="state.ariaLabel" title="ariaLabel"/>
				<hst-text v-model="state.pageAriaLabel" title="pageAriaLabel"/>
				<hst-text v-model="state.currentPageAriaLabel" title="currentPageAriaLabel"/>
				<hst-text v-model="state.firstAriaLabel" title="firstAriaLabel"/>
				<hst-text v-model="state.previousAriaLabel" title="previousAriaLabel"/>
				<hst-text v-model="state.nextAriaLabel" title="nextAriaLabel"/>
				<hst-text v-model="state.lastAriaLabel" title="lastAriaLabel"/>

				<hst-icon v-model="state.prevIcon" title="prevIcon"/>
				<hst-icon v-model="state.nextIcon" title="nextIcon"/>
				<hst-icon v-model="state.firstIcon" title="firstIcon"/>
				<hst-icon v-model="state.lastIcon" title="lastIcon"/>

				<hst-checkbox v-model="state.showFirstLastPage" title="showFirstLastPage" />

				<hst-slider v-model="state.length" :min="1" :max="20" title="length"/>
				<hst-number v-model="state.start" title="start"/>
			</template>
		</Variant>
	</Story>
</template>

<script lang="ts" setup>
	import { FoxyCol, FoxyContainer, FoxyPagination, FoxyRow } from '@foxy/components'

	import { ALIGN, JUSTIFY } from '@foxy/enums'
	import { HstIcon } from "@stories/components/controls"

	import { reactive } from 'vue'

	const state: { [key: string]: any } = reactive({
		prevIcon: '$prev',
		nextIcon: '$next',
		firstIcon: '$first',
		lastIcon: '$last',
		ellipsis: '...',
		length: 5,
		start: 1,
		ariaLabel: 'Pagination Navigation',
		pageAriaLabel: 'Go to page',
		currentPageAriaLabel: 'Current page - Page',
		firstAriaLabel: 'First page',
		previousAriaLabel: 'Previous page',
		nextAriaLabel: 'Next page',
		lastAriaLabel: 'Last page',
		showFirstLastPage: true
	})
</script>
<docs lang="md">

</docs>
