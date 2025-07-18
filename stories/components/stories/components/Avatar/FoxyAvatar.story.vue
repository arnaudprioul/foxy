<template>
	<Story
			:init-state="initialState"
			auto-props-disabled
			group="components"
			title="Avatar/Avatar"
	>
		<Variant title="Default">
			<template #default="{state}">
				<foxy-container>
					<foxy-row :justify="JUSTIFY.CENTER">
						<foxy-col>
							<foxy-avatar
									:icon="icon"
									v-bind="state"
							/>
						</foxy-col>
						<foxy-col>
							<foxy-avatar
									:image="image"
									v-bind="state"
							/>
						</foxy-col>
						<foxy-col>
							<foxy-avatar
									:text="text"
									v-bind="state"
							/>
						</foxy-col>
					</foxy-row>
				</foxy-container>
			</template>
			<template #controls>

			</template>
		</Variant>

		<Variant title="Status">
			<template #default="{state}">
				<foxy-container>
					<foxy-row :justify="JUSTIFY.CENTER">
						<foxy-col cols="auto">
							<foxy-avatar
									:icon="icon"
									v-bind="state"
							/>
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
							<foxy-avatar
									:icon="icon"
									v-bind="state"
							/>
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
							<foxy-avatar
									:icon="icon"
									v-bind="state"
							/>
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
							<foxy-avatar
									:icon="icon"
									v-bind="state"
							/>
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
							<foxy-avatar
									:icon="icon"
									v-bind="state"
							/>
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
							<foxy-avatar
									:icon="icon"
									v-bind="state"
							/>
						</foxy-col>
					</foxy-row>
				</foxy-container>
			</template>

			<template #controls="{state}">
				<hst-dimension
						v-model:height="state.height"
						v-model:max-height="state.maxHeight"
						v-model:max-width="state.maxWidth"
						v-model:min-height="state.minHeight"
						v-model:min-width="state.minWidth"
						v-model:size="state.size"
						v-model:width="state.width"
						:use-size="true"
				/>
			</template>
		</Variant>

		<Variant title="Density">
			<template #default="{state}">
				<foxy-container>
					<foxy-row :justify="JUSTIFY.CENTER">
						<foxy-col cols="auto">
							<foxy-avatar
									:icon="icon"
									v-bind="state"
							/>
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
							<foxy-avatar
									:icon="icon"
									v-bind="state"
							/>
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
							<foxy-avatar
									:icon="icon"
									v-bind="state"
							/>
						</foxy-col>
					</foxy-row>
				</foxy-container>
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
	import { FoxyAvatar, FoxyCol, FoxyContainer, FoxyRow } from '@foxy/components'
	import { JUSTIFY, MDI_ICONS } from "@foxy/enums"
	import type { IAvatarProps } from "@foxy/interfaces"
	import {
		HstBorder,
		HstColor,
		HstDensity,
		HstDimension,
		HstElevation,
		HstMargin,
		HstPadding,
		HstRounded,
		HstStatus
	} from "@stories/components/controls"

	import { reactive, ref } from 'vue'

	const state: Partial<IAvatarProps> = reactive({
		bgColor: 'rgba(66, 66, 69, 1)',
		color: 'rgba(255,255,255,1)'
	})

	const initialState = () => {
		return state
	}

	const icon = ref(MDI_ICONS.GOOGLE)
	const image = ref(new URL('/public/logo.svg', import.meta.url).href)
	const text = ref('AP')
</script>

<docs lang="md">
Avatar Documentation
</docs>
