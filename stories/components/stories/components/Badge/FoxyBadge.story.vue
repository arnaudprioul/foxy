<template>
	<Story
			:init-state="initialState"
			auto-props-disabled
			group="components"
			title="Badge"
	>
		<Variant title="Default">
			<template #default="{state}">
				<foxy-container>
					<foxy-row
							:align-content="ALIGN.CENTER"
							:justify="JUSTIFY.CENTER"
					>
						<foxy-col>
							<foxy-badge
									:content="20"
									v-bind="state"
							>
								<foxy-icon
										:icon="MDI_ICONS.ACCOUNT"
										size="x-large"
								/>
							</foxy-badge>
						</foxy-col>
						<foxy-col>
							<foxy-badge
									:content="20"
									:max="10"
									v-bind="state"
							>
								<foxy-icon
										:icon="MDI_ICONS.ACCOUNT"
										size="x-large"
								/>
							</foxy-badge>
						</foxy-col>
						<foxy-col>
							<foxy-badge
									content="A+"
									v-bind="state"
							>
								<foxy-icon
										:icon="MDI_ICONS.ACCOUNT"
										size="x-large"
								/>
							</foxy-badge>
						</foxy-col>
					</foxy-row>
				</foxy-container>
			</template>
			<template #controls="{state}">
				<hst-checkbox
						v-model="state.dot"
						title="Dot"
				/>

				<hst-checkbox
						v-model="state.floating"
						title="Floating"
				/>

				<hst-checkbox
						v-model="state.inline"
						title="Inline"
				/>
			</template>
		</Variant>

		<Variant title="Location">
			<template #default="{state}">
				<foxy-container>
					<foxy-row :justify="JUSTIFY.CENTER">
						<foxy-col cols="auto">
							<foxy-badge
									content="A+"
									v-bind="state"
							>
								<foxy-icon
										:icon="MDI_ICONS.ACCOUNT"
										size="x-large"
								/>
							</foxy-badge>
						</foxy-col>
					</foxy-row>
				</foxy-container>
			</template>

			<template #controls="{state}">
				<hst-location
						v-model="state.location"
						multiple
				/>
			</template>
		</Variant>

		<Variant title="Status">
			<template #default="{state}">
				<foxy-container>
					<foxy-row :justify="JUSTIFY.CENTER">
						<foxy-col cols="auto">
							<foxy-badge
									content="A+"
									v-bind="state"
							>
								<foxy-icon
										:icon="MDI_ICONS.ACCOUNT"
										size="x-large"
								/>
							</foxy-badge>
						</foxy-col>
					</foxy-row>
				</foxy-container>
			</template>

			<template #controls="{state}">
				<hst-status v-model="state.status"/>
			</template>
		</Variant>

		<Variant title="Color">
			<template #default="{state}">
				<foxy-container>
					<foxy-row :justify="JUSTIFY.CENTER">
						<foxy-col cols="auto">
							<foxy-badge
									content="A+"
									v-bind="state"
							>
								<foxy-icon
										:icon="MDI_ICONS.ACCOUNT"
										size="x-large"
								/>
							</foxy-badge>
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
							<foxy-badge
									content="A+"
									v-bind="state"
							>
								<foxy-icon
										:icon="MDI_ICONS.ACCOUNT"
										size="x-large"
								/>
							</foxy-badge>
						</foxy-col>
					</foxy-row>
				</foxy-container>
			</template>

			<template #controls="{state}">
				<hst-border v-model="state.border"/>
			</template>
		</Variant>

		<Variant title="Rounded">
			<template #default="{state}">
				<foxy-container>
					<foxy-row :justify="JUSTIFY.CENTER">
						<foxy-col cols="auto">
							<foxy-badge
									content="A+"
									v-bind="state"
							>
								<foxy-icon
										:icon="MDI_ICONS.ACCOUNT"
										size="x-large"
								/>
							</foxy-badge>
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
	import { FoxyBadge, FoxyCol, FoxyContainer, FoxyIcon, FoxyRow } from '@foxy/components'

	import { ALIGN, BLOCK, INLINE, JUSTIFY, MDI_ICONS } from '@foxy/enums'
	import type { IBadgeProps } from "@foxy/interfaces"

	import { HstBorder, HstColor, HstLocation, HstRounded, HstStatus } from '@stories/components/controls'

	import { reactive } from 'vue'

	const state: Partial<IBadgeProps> = reactive({
		location: `${BLOCK.TOP} ${INLINE.RIGHT}`,
		modelValue: true
	})

	const initialState = () => {
		return state
	}
</script>

<docs lang="md">
Badge Documentation
</docs>
