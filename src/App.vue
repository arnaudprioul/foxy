<script
		lang="ts"
		setup
>
	import { OrigamDrawer, OrigamList, OrigamListItem, OrigamMain, OrigamPageBuilder, OrigamToolbar } from './components'
</script>

<template>
	<origam-page-builder>
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
	</origam-page-builder>
</template>

<style scoped>

</style>
