<script
		lang="ts"
		setup
>
	import { FoxuiDrawer, FoxuiList, FoxuiListItem, FoxuiMain, FoxuiPageBuilder, FoxuiToolbar } from './components'
</script>

<template>
	<foxui-page-builder>
		<foxui-toolbar
				:order="1"
				title="Application bar"
		></foxui-toolbar>

		<foxui-drawer :order="2">
			<foxui-list>
				<foxui-list-item title="Navigation drawer"/>
			</foxui-list>
		</foxui-drawer>

		<foxui-main
				:order="3"
				style="min-height: 300px;"
		>

		</foxui-main>
	</foxui-page-builder>
</template>

<style scoped>

</style>
