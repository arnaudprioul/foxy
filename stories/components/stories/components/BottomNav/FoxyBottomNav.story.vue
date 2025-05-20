<template>
	<Story
			:init-state="initialState"
			auto-props-disabled
			group="components"
			title="Bottom Navigation"
	>
		<Variant title="Default">
			<template #default="{state}">
				<foxy-bottom-nav
						order="0"
						v-bind="state"
				/>
			</template>
			<template #controls="{state}">
				<hst-checkbox
						v-model="state.modelValue"
						title="Show/Hide"
				/>
				<hst-checkbox
						v-model="state.grow"
						title="Grow"
				/>

				<hst-select
						v-model="state.mode"
						:options="['horizontal', 'vertical', 'shift']"
						title="Mode"
				/>
			</template>
		</Variant>

		<Variant title="Color">
			<template #default="{state}">
				<foxy-bottom-nav
						order="0"
						v-bind="state"
				/>
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
				<foxy-bottom-nav
						order="0"
						v-bind="state"
				/>
			</template>

			<template #controls="{state}">
				<hst-border v-model="state.border"/>
			</template>
		</Variant>

		<Variant title="Padding">
			<template #default="{state}">
				<foxy-bottom-nav
						order="0"
						v-bind="state"
				/>
			</template>

			<template #controls="{state}">
				<hst-padding v-model="state.padding"/>
			</template>
		</Variant>

		<Variant title="Margin">
			<template #default="{state}">
				<foxy-bottom-nav
						order="0"
						v-bind="state"
				/>
			</template>

			<template #controls="{state}">
				<hst-margin v-model="state.margin"/>
			</template>
		</Variant>

		<Variant title="Dimension">
			<template #default="{state}">
				<foxy-bottom-nav
						order="0"
						v-bind="state"
				/>
			</template>

			<template #controls="{state}">
				<hst-dimension
						v-model:height="state.height"
						v-model:max-height="state.maxHeight"
						v-model:max-width="state.maxWidth"
						v-model:min-height="state.minHeight"
						v-model:min-width="state.minWidth"
						v-model:width="state.width"
						use-dimension
				/>
			</template>
		</Variant>

		<Variant title="Density">
			<template #default="{state}">
				<foxy-bottom-nav
						order="0"
						v-bind="state"
				/>
			</template>

			<template #controls="{state}">
				<hst-density v-model="state.density"/>
			</template>
		</Variant>

		<Variant title="Elevation">
			<template #default="{state}">
				<foxy-bottom-nav
						order="0"
						v-bind="state"
				/>
			</template>

			<template #controls="{state}">
				<hst-elevation v-model="state.elevation"/>
			</template>
		</Variant>

		<Variant title="Rounded">
			<template #default="{state}">
				<foxy-bottom-nav
						order="0"
						v-bind="state"
				/>
			</template>

			<template #controls="{state}">
				<hst-rounded v-model="state.rounded"/>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { FoxyBottomNav } from '@foxy/components'
	import { MDI_ICONS } from '@foxy/enums'
	import type { IBottomNavProps } from "@foxy/interfaces"

	import {
		HstBorder,
		HstColor,
		HstDensity,
		HstDimension,
		HstElevation,
		HstMargin,
		HstPadding,
		HstRounded
	} from '@stories/components/controls'

	import { reactive } from 'vue'

	const state: Partial<IBottomNavProps> = reactive({
		modelValue: true,
		items: [
			{prependIcon: MDI_ICONS.HISTORY, text: "Recents"},
			{prependIcon: MDI_ICONS.HEART, text: "Favorites"},
			{prependIcon: MDI_ICONS.MAP_MARKER, text: "Nearby"}
		]
	})

	const initialState = () => {
		return state
	}
</script>

<docs lang="md">
Bottom Navigation Documentation
</docs>
