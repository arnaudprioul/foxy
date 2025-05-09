<template>
	<Story
			auto-props-disabled
			group="components"
			title="Images & Icons/Avatar Group"
	>
		<template #default>
			<foxy-container fullscreen>
				<foxy-row
						:align="ALIGN.CENTER"
						:justify="JUSTIFY.CENTER"
				>
					<foxy-col cols="auto">
						<foxy-avatar-group v-bind="state"/>
					</foxy-col>
				</foxy-row>
			</foxy-container>
		</template>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { FoxyAvatarGroup, FoxyCol, FoxyContainer, FoxyRow } from '@foxy/components'
	import { ALIGN, JUSTIFY, MDI_ICONS } from "@foxy/enums"
	import type { IAvatarGroupProps } from "@foxy/interfaces"

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
		],
		expandOnHover: true
	})
</script>
<docs lang="md">
Avatar Documentation
</docs>
