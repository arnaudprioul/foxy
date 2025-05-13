<template>
	<Story
			:init-state="initialState"
			auto-props-disabled
			group="components"
			title="Feedback/Alert"
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

				<hst-select
						v-model="state.status"
						:options="[
                {value: '', label: 'Default'},
                {value: 'success', label: 'Success'},
                {value: 'info', label: 'Info'},
                {value: 'warning', label: 'Warning'},
                {value: 'error', label: 'Error'},
            ]"
						title="Status"
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
				<hst-color-select
						v-model="state.color"
						title="Text Color"
				/>

				<hst-color-select
						v-model="state.bgColor"
						title="Background Color"
				/>

				<hst-color-select
						v-model="state.hoverColor"
						title="Text Color on Hover"
				/>

				<hst-color-select
						v-model="state.hoverBgColor"
						title="Background Color on Hover"
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
				<hst-select
						v-model="state.padding"
						:options="[0, 2, 4, 8, 16]"
						title="Padding"
				/>
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
				<hst-select
						v-model="state.margin"
						:options="[0, 2, 4, 8, 16]"
						title="Margin"
				/>
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
				<hst-text
						v-model="state.width"
						title="Width"
				/>
				<hst-text
						v-model="state.minWidth"
						title="Min Width"
				/>
				<hst-text
						v-model="state.maxWidth"
						title="Max Width"
				/>
				<hst-text
						v-model="state.height"
						title="Height"
				/>
				<hst-text
						v-model="state.minHeight"
						title="Min Height"
				/>
				<hst-text
						v-model="state.maxHeight"
						title="Max Height"
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
				<hst-select
						v-model="state.position"
						:options="['fixed', 'absolute', 'sticky', 'relative', 'default']"
						title="Position"
				/>

				<hst-text
						v-if="['fixed', 'absolute', 'relative'].includes(state.position)"
						v-model="state.top"
						title="Top"
				/>

				<hst-text
						v-if="['fixed', 'absolute', 'relative'].includes(state.position)"
						v-model="state.bottom"
						title="Bottom"
				/>

				<hst-text
						v-if="['fixed', 'absolute', 'relative'].includes(state.position)"
						v-model="state.left"
						title="Left"
				/>

				<hst-text
						v-if="['fixed', 'absolute', 'relative'].includes(state.position)"
						v-model="state.right"
						title="Right"
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

	import { STATUS } from "@foxy/enums"

	import type { IAlertProps } from "@foxy/interfaces"

	import { HstDensity, HstElevation, HstIcon, HstRounded } from '@stories/components/controls'

	import { reactive } from 'vue'

	const state: Partial<IAlertProps> = reactive({
		text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!',
		title: 'Alert Title',
		status: STATUS.INFO
	})

	const initialState = () => {
		return state
	}
</script>
<docs lang="md">

</docs>
