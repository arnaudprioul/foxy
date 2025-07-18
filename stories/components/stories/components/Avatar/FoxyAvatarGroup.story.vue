<template>
	<Story
			:init-state="initialState"
			auto-props-disabled
			group="components"
			title="Avatar/Avatar Group"
	>
		<Variant title="Default">
			<template #default="{state}">
				<foxy-container>
					<foxy-row :justify="JUSTIFY.CENTER">
						<foxy-col cols="auto">
							<foxy-avatar-group v-bind="state"/>
						</foxy-col>
					</foxy-row>
				</foxy-container>
			</template>
			<template #controls="{state}">
				<hst-checkbox
						v-model="state.expandOnHover"
						title="Expand on hover"
				/>

				<hst-checkbox
						v-model="state.expandOnClick"
						title="Expand on click"
				/>

				<hst-slider
						v-model="state.max"
						:max="7"
						:min="1"
						title="Max items shown"
				/>
			</template>
		</Variant>

		<Variant title="Status">
			<template #default="{state}">
				<foxy-container>
					<foxy-row :justify="JUSTIFY.CENTER">
						<foxy-col cols="auto">
							<foxy-avatar-group v-bind="state"/>
						</foxy-col>
					</foxy-row>
				</foxy-container>
			</template>

			<template #controls="{state}">
				<hst-status
						v-model:status="state.status"
						v-model:status-icon-position="state.statusIconPosition"
				/>
			</template>
		</Variant>

		<Variant title="Color">
			<template #default="{state}">
				<foxy-container>
					<foxy-row :justify="JUSTIFY.CENTER">
						<foxy-col cols="auto">
							<foxy-avatar-group v-bind="state"/>
						</foxy-col>
					</foxy-row>
				</foxy-container>
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
				<foxy-container>
					<foxy-row :justify="JUSTIFY.CENTER">
						<foxy-col cols="auto">
							<foxy-avatar-group v-bind="state"/>
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
				<foxy-container>
					<foxy-row :justify="JUSTIFY.CENTER">
						<foxy-col cols="auto">
							<foxy-avatar-group v-bind="state"/>
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
				<foxy-container>
					<foxy-row :justify="JUSTIFY.CENTER">
						<foxy-col cols="auto">
							<foxy-avatar-group v-bind="state"/>
						</foxy-col>
					</foxy-row>
				</foxy-container>
			</template>

			<template #controls="{state}">
				<hst-margin v-model="state.margin"/>
			</template>
		</Variant>

		<Variant title="Dimension">
			<template #default="{state}">
				<foxy-container>
					<foxy-row :justify="JUSTIFY.CENTER">
						<foxy-col cols="auto">
							<foxy-avatar-group v-bind="state"/>
						</foxy-col>
					</foxy-row>
				</foxy-container>
			</template>

			<template #controls="{state}">
				<hst-dimension
						v-model:size="state.size"
						use-size
				/>
			</template>
		</Variant>

		<Variant title="Density">
			<template #default="{state}">
				<foxy-container>
					<foxy-row :justify="JUSTIFY.CENTER">
						<foxy-col cols="auto">
							<foxy-avatar-group v-bind="state"/>
						</foxy-col>
					</foxy-row>
				</foxy-container>
			</template>

			<template #controls="{state}">
				<hst-density v-model="state.density"/>
			</template>
		</Variant>

		<Variant title="Elevation">
			<template #default="{state}">
				<foxy-container>
					<foxy-row :justify="JUSTIFY.CENTER">
						<foxy-col cols="auto">
							<foxy-avatar-group v-bind="state"/>
						</foxy-col>
					</foxy-row>
				</foxy-container>
			</template>

			<template #controls="{state}">
				<hst-elevation v-model="state.elevation"/>
			</template>
		</Variant>

		<Variant title="Rounded">
			<template #default="{state}">
				<foxy-container>
					<foxy-row :justify="JUSTIFY.CENTER">
						<foxy-col cols="auto">
							<foxy-avatar-group v-bind="state"/>
						</foxy-col>
					</foxy-row>
				</foxy-container>
			</template>

			<template #controls="{state}">
				<hst-rounded v-model="state.rounded"/>
			</template>
		</Variant>

		<Variant title="Direction">
			<template #default="{state}">
				<foxy-container>
					<foxy-row :justify="JUSTIFY.CENTER">
						<foxy-col cols="auto">
							<foxy-avatar-group v-bind="state"/>
						</foxy-col>
					</foxy-row>
				</foxy-container>
			</template>

			<template #controls="{state}">
				<hst-direction v-model="state.direction"/>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { FoxyAvatarGroup, FoxyCol, FoxyContainer, FoxyRow } from '@foxy/components'
	import { JUSTIFY, MDI_ICONS } from "@foxy/enums"
	import type { IAvatarGroupProps } from "@foxy/interfaces"
	import {
		HstBorder,
		HstColor,
		HstDensity,
		HstDimension,
		HstDirection,
		HstElevation,
		HstMargin,
		HstPadding,
		HstRounded,
		HstStatus
	} from "@stories/components/controls"

	import { reactive } from 'vue'

	const state: Partial<IAvatarGroupProps> = reactive({
		bgColor: 'rgba(66, 66, 69, 1)',
		color: 'rgba(255,255,255,1)',
		border: '2px solid #fff',
		items: [
			{icon: MDI_ICONS.GOOGLE},
			{icon: MDI_ICONS.GITLAB},
			{icon: MDI_ICONS.GITHUB},
			{icon: MDI_ICONS.VUEJS},
			{icon: MDI_ICONS.REACT},
			{icon: MDI_ICONS.ANGULAR},
			{icon: MDI_ICONS.MICROSOFT_EDGE}
		]
	})

	const initialState = () => {
		return state
	}
</script>

<docs lang="md">
Avatar Group Documentation
</docs>
