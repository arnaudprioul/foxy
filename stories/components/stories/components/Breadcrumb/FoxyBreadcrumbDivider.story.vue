<template>
	<Story
			:init-state="initialState"
			auto-props-disabled
			group="components"
			title="Breadcrumbs/Breadcrumbs Divider"
	>
		<Variant title="Default">
			<template #default="{state}">
				<origam-container fluid>
					<origam-row :justify="JUSTIFY.CENTER">
						<origam-col cols="auto">
							<origam-breadcrumb-divider v-bind="state"/>
						</origam-col>
					</origam-row>
				</origam-container>
			</template>
			<template #controls="{state}">
				<hst-icon
						v-model="state.divider"
						:more-options="[{value: '/', label: 'Slash (/)'}, {value: '->', label: 'Arrow (->)'}, {value: '|', label: 'Pipe (|)'}]"
						title="divider"
				/>
			</template>
		</Variant>

		<Variant title="Color">
			<template #default="{state}">
				<origam-container fluid>
					<origam-row
							:justify="JUSTIFY.CENTER"
					>
						<origam-col cols="auto">
							<origam-breadcrumb-divider v-bind="state"/>
						</origam-col>
					</origam-row>
				</origam-container>
			</template>

			<template #controls="{state}">
				<hst-color
						v-model:bg-color="state.bgColor"
						v-model:color="state.color"
				/>
			</template>
		</Variant>

		<Variant title="Padding">
			<template #default="{state}">
				<origam-container fluid>
					<origam-row
							:justify="JUSTIFY.CENTER"
					>
						<origam-col cols="auto">
							<origam-breadcrumb-divider v-bind="state"/>
						</origam-col>
					</origam-row>
				</origam-container>
			</template>

			<template #controls="{state}">
				<hst-padding v-model="state.padding"/>
			</template>
		</Variant>

		<Variant title="Margin">
			<template #default="{state}">
				<origam-container fluid>
					<origam-row
							:justify="JUSTIFY.CENTER"
					>
						<origam-col cols="auto">
							<origam-breadcrumb-divider v-bind="state"/>
						</origam-col>
					</origam-row>
				</origam-container>
			</template>

			<template #controls="{state}">
				<hst-margin v-model="state.margin"/>
			</template>
		</Variant>

		<Variant title="Density">
			<template #default="{state}">
				<origam-container fluid>
					<origam-row
							:justify="JUSTIFY.CENTER"
					>
						<origam-col cols="auto">
							<origam-breadcrumb-divider v-bind="state"/>
						</origam-col>
					</origam-row>
				</origam-container>
			</template>

			<template #controls="{state}">
				<hst-density v-model="state.density"/>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamBreadcrumbDivider, OrigamCol, OrigamContainer, OrigamRow } from '@origam/components'
	import { JUSTIFY } from '@origam/enums'
	import type { IBreadcrumbDividerProps } from "@origam/interfaces"

	import { HstColor, HstDensity, HstIcon, HstMargin, HstPadding } from "@stories/components/controls"

	import { reactive } from 'vue'

	const state: Partial<IBreadcrumbDividerProps> = reactive({
		divider: '/'
	})

	const initialState = () => {
		return state
	}
</script>

<docs lang="md">

</docs>
