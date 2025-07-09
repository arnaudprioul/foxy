<template>
	<Story
			:init-state="initialState"
			auto-props-disabled
			group="components"
			title="Breadcrumbs/Breadcrumbs Divider"
	>
		<Variant title="Default">
			<template #default="{state}">
				<foxy-container fluid>
					<foxy-row :justify="JUSTIFY.CENTER">
						<foxy-col cols="auto">
							<foxy-breadcrumb-divider v-bind="state"/>
						</foxy-col>
					</foxy-row>
				</foxy-container>
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
				<foxy-container fluid>
					<foxy-row
							:justify="JUSTIFY.CENTER"
					>
						<foxy-col cols="auto">
							<foxy-breadcrumb-divider v-bind="state"/>
						</foxy-col>
					</foxy-row>
				</foxy-container>
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
				<foxy-container fluid>
					<foxy-row
							:justify="JUSTIFY.CENTER"
					>
						<foxy-col cols="auto">
							<foxy-breadcrumb-divider v-bind="state"/>
						</foxy-col>
					</foxy-row>
				</foxy-container>
			</template>

			<template #controls="{state}">
				<hst-padding v-model="state.padding"/>
			</template>
		</Variant>

		<Variant title="Margin">
			<template #default="{state}">
				<foxy-container fluid>
					<foxy-row
							:justify="JUSTIFY.CENTER"
					>
						<foxy-col cols="auto">
							<foxy-breadcrumb-divider v-bind="state"/>
						</foxy-col>
					</foxy-row>
				</foxy-container>
			</template>

			<template #controls="{state}">
				<hst-margin v-model="state.margin"/>
			</template>
		</Variant>

		<Variant title="Density">
			<template #default="{state}">
				<foxy-container fluid>
					<foxy-row
							:justify="JUSTIFY.CENTER"
					>
						<foxy-col cols="auto">
							<foxy-breadcrumb-divider v-bind="state"/>
						</foxy-col>
					</foxy-row>
				</foxy-container>
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
	import { FoxyBreadcrumbDivider, FoxyCol, FoxyContainer, FoxyRow } from '@foxy/components'
	import { JUSTIFY } from '@foxy/enums'
	import type { IBreadcrumbDividerProps } from "@foxy/interfaces"

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
