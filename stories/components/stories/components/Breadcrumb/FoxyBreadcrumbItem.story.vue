<template>
	<Story
			:init-state="initialState"
			auto-props-disabled
			group="components"
			title="Breadcrumbs/Breadcrumbs Item"
	>
		<Variant title="Default">
			<template #default="{state}">
				<origam-container fluid>
					<origam-row :justify="JUSTIFY.CENTER">
						<origam-col cols="auto">
							<origam-breadcrumb-item v-bind="state"/>
						</origam-col>
					</origam-row>
				</origam-container>
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
				<origam-container fluid>
					<origam-row
							:justify="JUSTIFY.CENTER"
					>
						<origam-col cols="auto">
							<origam-breadcrumb-item v-bind="state"/>
						</origam-col>
					</origam-row>
				</origam-container>
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
				<origam-container fluid>
					<origam-row
							:justify="JUSTIFY.CENTER"
					>
						<origam-col cols="auto">
							<origam-breadcrumb-item v-bind="state"/>
						</origam-col>
					</origam-row>
				</origam-container>
			</template>

			<template #controls="{state}">
				<hst-border v-model="state.border"/>
			</template>
		</Variant>

		<Variant title="Padding">
			<template #default="{state}">
				<origam-container fluid>
					<origam-row
							:justify="JUSTIFY.CENTER"
					>
						<origam-col cols="auto">
							<origam-breadcrumb-item v-bind="state"/>
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
							<origam-breadcrumb-item v-bind="state"/>
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
							<origam-breadcrumb-item v-bind="state"/>
						</origam-col>
					</origam-row>
				</origam-container>
			</template>

			<template #controls="{state}">
				<hst-density v-model="state.density"/>
			</template>
		</Variant>

		<Variant title="Rounded">
			<template #default="{state}">
				<origam-container fluid>
					<origam-row
							:justify="JUSTIFY.CENTER"
					>
						<origam-col cols="auto">
							<origam-breadcrumb-item v-bind="state"/>
						</origam-col>
					</origam-row>
				</origam-container>
			</template>

			<template #controls="{state}">
				<hst-rounded v-model="state.rounded"/>
			</template>
		</Variant>

		<Variant title="Adjacent">
			<template #default="{state}">
				<origam-container fluid>
					<origam-row
							:justify="JUSTIFY.CENTER"
					>
						<origam-col cols="auto">
							<origam-breadcrumb-item v-bind="state"/>
						</origam-col>
					</origam-row>
				</origam-container>
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
	import { OrigamBreadcrumbItem, OrigamCol, OrigamContainer, OrigamRow } from '@origam/components'
	import { JUSTIFY } from '@origam/enums'
	import type { IBreadcrumbItemProps } from "@origam/interfaces"

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
