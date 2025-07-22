<script
		lang="ts"
		setup
>
	import { OrigamApp, OrigamDrawer, OrigamList, OrigamListItem, OrigamMain, OrigamToolbar } from './components'
</script>

<template>
	<origam-app>
		<origam-toolbar
				:order="1"
				title="Application bar"
		></origam-toolbar>

		<origam-drawer :order="2">
			<origam-list>
				<origam-list-item title="Navigation drawer"/>
			</origam-list>
		</origam-drawer>

		<origam-main
				:order="3"
				style="min-height: 300px;"
		>

		</origam-main>
	</origam-app>
</template>

<style scoped>

</style>
