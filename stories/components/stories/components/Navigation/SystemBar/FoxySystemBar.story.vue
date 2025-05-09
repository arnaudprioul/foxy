<template>
	<Story
			group="components"
			title="Navigation/System Bar"
	>
		<Variant title="Default">
			<template #default>
				<foxy-system-bar
						order="0"
						v-bind="state"
				>
					<foxy-icon :icon="MDI_ICONS.WIFI_STRENGTH_4"/>
					<foxy-icon :icon="MDI_ICONS.SIGNAL"/>
					<foxy-icon :icon="MDI_ICONS.BATTERY"/>

					<span>3:13PM</span>
				</foxy-system-bar>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { FoxyIcon, FoxySystemBar } from '@foxy/components'
	import { MDI_ICONS } from "@foxy/enums"
	import { reactive } from "vue"

	const state: Partial<ISystemBarProps> = reactive({})
</script>
<docs lang="md">

</docs>
