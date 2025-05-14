<template>
	<Story
			:init-state="initialState"
			auto-props-disabled
			group="components"
			title="Containment/AppBar"
	>
		<Variant title="Default">
			<template #default="{state}">
				<foxy-app-bar
						:order="0"
						v-bind="state"
				/>
			</template>

			<template #controls="{state}">
				<hst-checkbox
						v-model="state.modelValue"
						title="Show/hide"
				/>

				<hst-checkbox
						v-model="state.absolute"
						title="Absolute"
				/>

				<hst-checkbox
						v-model="state.collapse"
						title="Collapse"
				/>

				<hst-checkbox
						v-model="state.flat"
						title="Flat"
				/>

				<hst-checkbox
						v-model="state.floating"
						title="Floating"
				/>

				<hst-text
						v-model="state.title"
						title="Title"
				/>
			</template>
		</Variant>

		<Variant title="Color">
			<template #default="{state}">
				<foxy-app-bar
						:order="0"
						v-bind="state"
				/>
			</template>

			<template #controls="{state}">
				<hst-color
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
				<foxy-app-bar
						:order="0"
						v-bind="state"
				/>
			</template>

			<template #controls="{state}">
				<hst-border v-model="state.border"/>
			</template>
		</Variant>

		<Variant title="Padding">
			<template #default="{state}">
				<foxy-app-bar
						:order="0"
						v-bind="state"
				/>
			</template>

			<template #controls="{state}">
				<hst-padding v-model="state.padding"/>
			</template>
		</Variant>

		<Variant title="Margin">
			<template #default="{state}">
				<foxy-app-bar
						:order="0"
						v-bind="state"
				/>
			</template>

			<template #controls="{state}">
				<hst-margin v-model="state.margin"/>
			</template>
		</Variant>

		<Variant title="Dimension">
			<template #default="{state}">
				<foxy-app-bar
						:order="0"
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
				/>
			</template>
		</Variant>

		<Variant title="Density">
			<template #default="{state}">
				<foxy-app-bar
						:order="0"
						v-bind="state"
				/>
			</template>

			<template #controls="{state}">
				<hst-density v-model="state.density"/>
			</template>
		</Variant>

		<Variant title="Elevation">
			<template #default="{state}">
				<foxy-app-bar
						:order="0"
						v-bind="state"
				/>
			</template>

			<template #controls="{state}">
				<hst-elevation v-model="state.elevation"/>
			</template>
		</Variant>

		<Variant title="Rounded">
			<template #default="{state}">
				<foxy-app-bar
						:order="0"
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
	import { FoxyAppBar } from '@foxy/components'

	import type { IAppBarProps } from "@foxy/interfaces"
	import {
		HstBorder,
		HstColor,
		HstDensity,
		HstDimension,
		HstElevation,
		HstMargin,
		HstPadding,
		HstRounded
	} from "@stories/components/controls"

	import { reactive } from "vue"

	const state: Partial<IAppBarProps> = reactive({
		title: 'My Application',
		image: {
			alt: 'Foxy',
			width: 36,
			src: new URL('/public/logo.svg', import.meta.url).href
		},
		bgColor: '#E3E3E3'
	})

	const initialState = () => {
		return state
	}
</script>

<docs lang="md">
App bar Documentation
</docs>
