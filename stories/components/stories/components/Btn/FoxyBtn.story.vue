<template>
	<Story
			:init-state="initialState"
			auto-props-disabled
			group="components"
			title="Btn/Btn"
	>
		<Variant title="Default">
			<template #default="{state}">
				<origam-container>
					<origam-row
							:align="ALIGN.CENTER"
							:justify="JUSTIFY.CENTER"
					>
						<origam-col cols="auto">
							<origam-btn
									:text="text"
									v-bind="state"
							/>
						</origam-col>

						<origam-col cols="auto">
							<origam-btn
									:icon="icon"
									v-bind="state"
							/>
						</origam-col>
					</origam-row>
				</origam-container>
			</template>

			<template #controls="{state}">
				<hst-checkbox
						v-model="state.block"
						title="Block"
				/>

				<hst-checkbox
						v-model="state.flat"
						title="Flat"
				/>

				<hst-checkbox
						v-model="state.slim"
						title="Slim"
				/>

				<hst-checkbox
						v-model="state.stacked"
						title="Stacked"
				/>
			</template>
		</Variant>

		<Variant title="Status">
			<template #default="{state}">
				<origam-container>
					<origam-row :justify="JUSTIFY.CENTER">
						<origam-col cols="auto">
							<origam-btn
									:text="text"
									v-bind="state"
							/>
						</origam-col>
					</origam-row>
				</origam-container>
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
				<origam-container>
					<origam-row :justify="JUSTIFY.CENTER">
						<origam-col cols="auto">
							<origam-btn
									:text="text"
									v-bind="state"
							/>
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
				<origam-container>
					<origam-row :justify="JUSTIFY.CENTER">
						<origam-col cols="auto">
							<origam-btn
									:text="text"
									v-bind="state"
							/>
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
				<origam-container>
					<origam-row :justify="JUSTIFY.CENTER">
						<origam-col cols="auto">
							<origam-btn
									:text="text"
									v-bind="state"
							/>
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
				<origam-container>
					<origam-row :justify="JUSTIFY.CENTER">
						<origam-col cols="auto">
							<origam-btn
									:text="text"
									v-bind="state"
							/>
						</origam-col>
					</origam-row>
				</origam-container>
			</template>

			<template #controls="{state}">
				<hst-margin v-model="state.margin"/>
			</template>
		</Variant>

		<Variant title="Dimension">
			<template #default="{state}">
				<origam-container>
					<origam-row :justify="JUSTIFY.CENTER">
						<origam-col cols="auto">
							<origam-btn
									:text="text"
									v-bind="state"
							/>
						</origam-col>
					</origam-row>
				</origam-container>
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
				<origam-container>
					<origam-row :justify="JUSTIFY.CENTER">
						<origam-col cols="auto">
							<origam-btn
									:text="text"
									v-bind="state"
							/>
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
				<origam-container>
					<origam-row :justify="JUSTIFY.CENTER">
						<origam-col cols="auto">
							<origam-btn
									:text="text"
									v-bind="state"
							/>
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
				<origam-container>
					<origam-row :justify="JUSTIFY.CENTER">
						<origam-col cols="auto">
							<origam-btn
									:text="text"
									v-bind="state"
							/>
						</origam-col>
					</origam-row>
				</origam-container>
			</template>

			<template #controls="{state}">
				<hst-rounded v-model="state.rounded"/>
			</template>
		</Variant>

		<Variant title="Loading">
			<template #default="{state}">
				<origam-container>
					<origam-row :justify="JUSTIFY.CENTER">
						<origam-col cols="auto">
							<origam-btn
									:text="text"
									v-bind="state"
							/>
						</origam-col>
					</origam-row>
				</origam-container>
			</template>

			<template #controls="{state}">
				<hst-loading v-model:loading="state.loading"/>
			</template>
		</Variant>

		<Variant title="Position">
			<template #default="{state}">
				<origam-container>
					<origam-row :justify="JUSTIFY.CENTER">
						<origam-col cols="auto">
							<origam-btn
									:text="text"
									v-bind="state"
							/>
						</origam-col>
					</origam-row>
				</origam-container>
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
	</Story>
</template>

<script
		lang="ts"
		setup
>

	import { OrigamBtn, OrigamCol, OrigamContainer, OrigamRow } from '@origam/components'

	import { ALIGN, JUSTIFY, MDI_ICONS } from '@origam/enums'
	import { IBtnProps } from "@origam/interfaces"
	import {
		HstBorder,
		HstColor,
		HstDensity,
		HstDimension,
		HstElevation,
		HstLoading,
		HstMargin,
		HstPadding,
		HstPosition,
		HstRounded,
		HstStatus
	} from "@stories/components/controls"

	import { reactive, ref } from 'vue'

	const state: Partial<IBtnProps> = reactive({})

	const initialState = () => {
		return state
	}

	const icon = ref(MDI_ICONS.GOOGLE)
	const text = ref('My Button')
</script>

<docs lang="md">
</docs>
