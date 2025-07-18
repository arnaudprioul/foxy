<template>
	<Story
			:init-state="initialState"
			auto-props-disabled
			group="components"
			title="Breadcrumbs/Breadcrumbs Item"
	>
		<Variant title="Default">
			<template #default="{state}">
				<foxy-container fluid>
					<foxy-row :justify="JUSTIFY.CENTER">
						<foxy-col cols="auto">
							<foxy-breadcrumb-item v-bind="state"/>
						</foxy-col>
					</foxy-row>
				</foxy-container>
			</template>
			<template #controls="{state}">
				<hst-checkbox
						v-model="state.disabled"
						title="disabled"
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
							<foxy-breadcrumb-item v-bind="state"/>
						</foxy-col>
					</foxy-row>
				</foxy-container>
			</template>

			<template #controls="{state}">
				<hst-color
						v-model:active="state.active"
						v-model:active-bg-color="state.activeBgColor"
						v-model:active-color="state.activeColor"
						v-model:bg-color="state.bgColor"
						v-model:color="state.color"
						v-model:hover="state.hover"
						v-model:hover-bg-color="state.hoverBgColor"
						v-model:hover-color="state.hoverColor"
				/>
			</template>
		</Variant>

		<Variant title="Border">
			<template #default="{state}">
				<foxy-container fluid>
					<foxy-row
							:justify="JUSTIFY.CENTER"
					>
						<foxy-col cols="auto">
							<foxy-breadcrumb-item v-bind="state"/>
						</foxy-col>
					</foxy-row>
				</foxy-container>
			</template>

			<template #controls="{state}">
				<hst-border v-model="state.border"/>
			</template>
		</Variant>

		<Variant title="Padding">
			<template #default="{state}">
				<foxy-container fluid>
					<foxy-row
							:justify="JUSTIFY.CENTER"
					>
						<foxy-col cols="auto">
							<foxy-breadcrumb-item v-bind="state"/>
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
							<foxy-breadcrumb-item v-bind="state"/>
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
							<foxy-breadcrumb-item v-bind="state"/>
						</foxy-col>
					</foxy-row>
				</foxy-container>
			</template>

			<template #controls="{state}">
				<hst-density v-model="state.density"/>
			</template>
		</Variant>

		<Variant title="Rounded">
			<template #default="{state}">
				<foxy-container fluid>
					<foxy-row
							:justify="JUSTIFY.CENTER"
					>
						<foxy-col cols="auto">
							<foxy-breadcrumb-item v-bind="state"/>
						</foxy-col>
					</foxy-row>
				</foxy-container>
			</template>

			<template #controls="{state}">
				<hst-rounded v-model="state.rounded"/>
			</template>
		</Variant>

		<Variant title="Adjacent">
			<template #default="{state}">
				<foxy-container fluid>
					<foxy-row
							:justify="JUSTIFY.CENTER"
					>
						<foxy-col cols="auto">
							<foxy-breadcrumb-item v-bind="state"/>
						</foxy-col>
					</foxy-row>
				</foxy-container>
			</template>

			<template #controls="{state}">
				<hst-adjacent
						v-model:append-avatar="state.appendAvatar"
						v-model:append-icon="state.appendIcon"
						v-model:prepend-avatar="state.prependAvatar"
						v-model:prepend-icon="state.prependIcon"
				/>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { FoxyBreadcrumbItem, FoxyCol, FoxyContainer, FoxyRow } from '@foxy/components'
	import { JUSTIFY } from '@foxy/enums'
	import type { IBreadcrumbItemProps } from "@foxy/interfaces"

	import { HstBorder, HstColor, HstDensity, HstMargin, HstPadding, HstRounded } from "@stories/components/controls"
	import HstAdjacent from "@stories/components/controls/HstAdjacent/HstAdjacent.vue"

	import { reactive } from 'vue'

	const state: Partial<IBreadcrumbItemProps> = reactive({
		title: 'FooBar'
	})

	const initialState = () => {
		return state
	}
</script>

<docs lang="md">

</docs>
