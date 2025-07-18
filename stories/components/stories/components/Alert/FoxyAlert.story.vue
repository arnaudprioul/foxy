<template>
	<Story
			:init-state="initialState"
			auto-props-disabled
			group="components"
			title="Alert"
	>
		<Variant title="Default">
			<template #default="{state}">
				<foxy-container fluid>
					<foxy-row>
						<foxy-col cols="12">
							<foxy-alert
									v-bind="state"
							/>
						</foxy-col>
					</foxy-row>
				</foxy-container>
			</template>

			<template #controls="{state}">
				<hst-checkbox
						v-model="state.closable"
						title="Closable"
				/>

				<hst-icon
						v-if="state.closable"
						v-model="state.closeIcon"
						title="Close Icon"
				/>

				<hst-icon
						v-model="state.icon"
						title="Icon"
				/>

				<hst-checkbox
						v-model="state.prominent"
						title="Prominent"
				/>

				<hst-text
						v-model="state.title"
						title="Title"
				/>

				<hst-text
						v-model="state.text"
						title="Text"
				/>

			</template>
		</Variant>

		<Variant title="Status">
			<template #default="{state}">
				<foxy-container fluid>
					<foxy-row>
						<foxy-col cols="12">
							<foxy-alert
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
				<foxy-container fluid>
					<foxy-row>
						<foxy-col cols="12">
							<foxy-alert
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
				<foxy-container fluid>
					<foxy-row>
						<foxy-col cols="12">
							<foxy-alert
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
				<foxy-container fluid>
					<foxy-row>
						<foxy-col cols="12">
							<foxy-alert
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
				<foxy-container fluid>
					<foxy-row>
						<foxy-col cols="12">
							<foxy-alert
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
				<foxy-container fluid>
					<foxy-row>
						<foxy-col cols="12">
							<foxy-alert
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
						v-model:width="state.width"
						use-dimension
				/>
			</template>
		</Variant>

		<Variant title="Density">
			<template #default="{state}">
				<foxy-container fluid>
					<foxy-row>
						<foxy-col cols="12">
							<foxy-alert
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
				<foxy-container fluid>
					<foxy-row>
						<foxy-col cols="12">
							<foxy-alert
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
				<foxy-container fluid>
					<foxy-row>
						<foxy-col cols="12">
							<foxy-alert
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

		<Variant title="Position">
			<template #default="{state}">
				<foxy-alert
						v-bind="state"
				/>
			</template>

			<template #controls="{state}">
				<hst-position
						v-model:bottom="state.bottom"
						v-model:left="state.left"
						v-model:position="state.position"
						v-model:right="state.right"
						v-model:top="state.top"
				/>
			</template>
		</Variant>

		<Variant title="Adjacent">
			<template #default="{state}">
				<foxy-alert
						v-bind="state"
				/>
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

	import { FoxyAlert, FoxyCol, FoxyContainer, FoxyRow } from '@foxy/components'

	import type { IAlertProps } from "@foxy/interfaces"

	import {
		HstBorder,
		HstColor,
		HstDensity,
		HstDimension,
		HstElevation,
		HstIcon,
		HstMargin,
		HstPadding,
		HstPosition,
		HstRounded,
		HstStatus
	} from '@stories/components/controls'
	import HstAdjacent from "@stories/components/controls/HstAdjacent/HstAdjacent.vue"

	import { reactive } from 'vue'

	const state: Partial<IAlertProps> = reactive({
		text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!',
		title: 'Alert Title'
	})

	const initialState = () => {
		return state
	}
</script>

<docs lang="md">

</docs>
