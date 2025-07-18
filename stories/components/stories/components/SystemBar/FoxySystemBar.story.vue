<template>
	<Story
			group="components"
			title="System Bar"
	>
		<Variant title="Default">
			<template #default>
				<origam-system-bar
						order="0"
						v-bind="state"
				>
					<origam-icon :icon="MDI_ICONS.WIFI_STRENGTH_4"/>
					<origam-icon :icon="MDI_ICONS.SIGNAL"/>
					<origam-icon :icon="MDI_ICONS.BATTERY"/>

					<span>3:13PM</span>
				</origam-system-bar>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamIcon, OrigamSystemBar } from '@origam/components'
	import { MDI_ICONS } from "@origam/enums"
	import { reactive } from "vue"

	const state: Partial<ISystemBarProps> = reactive({})
</script>
<docs lang="md">

</docs>
