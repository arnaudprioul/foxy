<template>
	<Story
			group="components"
			title="System Bar"
	>
		<Variant title="Default">
			<template #default>
				<foxui-system-bar
						order="0"
						v-bind="state"
				>
					<foxui-icon :icon="MDI_ICONS.WIFI_STRENGTH_4"/>
					<foxui-icon :icon="MDI_ICONS.SIGNAL"/>
					<foxui-icon :icon="MDI_ICONS.BATTERY"/>

					<span>3:13PM</span>
				</foxui-system-bar>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { FoxuiIcon, FoxuiSystemBar } from '@foxui/components'
	import { MDI_ICONS } from "@foxui/enums"
	import { reactive } from "vue"

	const state: Partial<ISystemBarProps> = reactive({})
</script>
<docs lang="md">

</docs>
