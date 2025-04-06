<template>
	<Story
			auto-props-disabled
			group="components"
			title="Images & Icons/Avatar"
	>
		<Variant title="Default">
			<template #default>
				<foxy-container fullscreen>
					<foxy-row
							:align="ALIGN.CENTER"
							:justify="JUSTIFY.CENTER"
					>
						<foxy-col cols="auto">
							<foxy-avatar
									:icon="icon"
									v-bind="state"
							/>
						</foxy-col>
					</foxy-row>
				</foxy-container>
			</template>
			<template #controls>

			</template>
		</Variant>
		<Variant title="image">
			<template #default>
				<foxy-container fullscreen>
					<foxy-row
							:align="ALIGN.CENTER"
							:justify="JUSTIFY.CENTER"
					>
						<foxy-col cols="auto">
							<foxy-avatar
									:image="image"
									v-bind="state"
							/>
						</foxy-col>
					</foxy-row>
				</foxy-container>
			</template>
			<template #controls>

			</template>
		</Variant>
		<Variant title="text">
			<template #default>
				<foxy-container fullscreen>
					<foxy-row
							:align="ALIGN.CENTER"
							:justify="JUSTIFY.CENTER"
					>
						<foxy-col cols="auto">
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
	</Story>
</template>

<script
		lang="ts"
		setup
>

	import { FoxyAvatar, FoxyCol, FoxyContainer, FoxyRow } from '@foxy/components'
	import { ALIGN, JUSTIFY, MDI_ICONS } from "@foxy/enums"
	import { IAvatarProps } from "@foxy/interfaces"

	import { reactive, ref } from 'vue'

	const state: Partial<IAvatarProps> = reactive({
		bgColor: 'rgba(66, 66, 69, 1)',
		color: 'rgba(255,255,255,1)',
		border: '2px solid #fff',
	})

	const icon = ref(MDI_ICONS.GOOGLE)
	const image = ref(new URL('/public/logo.svg', import.meta.url).href)
	const text = ref('AP')
</script>
<docs lang="md">
Avatar Documentation
</docs>
