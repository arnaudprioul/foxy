<script
		lang="ts"
		setup
>
	import { FoxyDrawer, FoxyList, FoxyListItem, FoxyMain, FoxyPageBuilder, FoxyToolbar } from './components'
</script>

<template>
	<foxy-page-builder>
		<foxy-toolbar
				:order="1"
				title="Application bar"
		></foxy-toolbar>

		<foxy-drawer :order="2">
			<foxy-list>
				<foxy-list-item title="Navigation drawer"/>
			</foxy-list>
		</foxy-drawer>

		<foxy-main
				:order="3"
				style="min-height: 300px;"
		>

		</foxy-main>
	</foxy-page-builder>
</template>

<style scoped>

</style>
