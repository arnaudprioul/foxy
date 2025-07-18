<template>
	<Story
			:init-state="initialState"
			auto-props-disabled
			group="components"
			title="Breadcrumbs/Breadcrumbs"
	>
		<Variant title="Default">
			<template #default="{state}">
				<origam-container fluid>
					<origam-row :justify="JUSTIFY.CENTER">
						<origam-col>
							<origam-breadcrumb v-bind="state"/>
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
						<origam-col>
							<origam-breadcrumb v-bind="state"/>
						</origam-col>
					</origam-row>
				</origam-container>
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
				<origam-container fluid>
					<origam-row
							:justify="JUSTIFY.CENTER"
					>
						<origam-col>
							<origam-breadcrumb v-bind="state"/>
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
						<origam-col>
							<origam-breadcrumb v-bind="state"/>
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
						<origam-col>
							<origam-breadcrumb v-bind="state"/>
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
						<origam-col>
							<origam-breadcrumb v-bind="state"/>
						</origam-col>
					</origam-row>
				</origam-container>
			</template>

			<template #controls="{state}">
				<hst-density v-model="state.density"/>
			</template>
		</Variant>

		<Variant title="Elevation">
			<template #default="{state}">
				<origam-container fluid>
					<origam-row
							:justify="JUSTIFY.CENTER"
					>
						<origam-col>
							<origam-breadcrumb v-bind="state"/>
						</origam-col>
					</origam-row>
				</origam-container>
			</template>

			<template #controls="{state}">
				<hst-elevation v-model="state.elevation"/>
			</template>
		</Variant>

		<Variant title="Rounded">
			<template #default="{state}">
				<origam-container fluid>
					<origam-row
							:justify="JUSTIFY.CENTER"
					>
						<origam-col>
							<origam-breadcrumb v-bind="state"/>
						</origam-col>
					</origam-row>
				</origam-container>
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
	import { OrigamBreadcrumb, OrigamCol, OrigamContainer, OrigamRow } from '@origam/components'
	import { JUSTIFY } from '@origam/enums'
	import type { IBreadcrumbProps } from "@origam/interfaces"

	import {
		HstBorder,
		HstColor,
		HstDensity,
		HstElevation,
		HstIcon,
		HstMargin,
		HstPadding,
		HstRounded
	} from "@stories/components/controls"

	import { reactive } from 'vue'

	const state: Partial<IBreadcrumbProps> = reactive({
		items: ['Foo', 'Bar', 'Fizz']
	})

	const initialState = () => {
		return state
	}
</script>

<docs lang="md">

</docs>
