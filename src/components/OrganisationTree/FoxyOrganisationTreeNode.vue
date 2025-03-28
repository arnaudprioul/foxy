<template>
	<component
			:is="tag"
			:class="organisationTreeNodeClasses"
			:style="organisationTreeNodeStyles"
	>
		<div class="organisation-tree-node__content">
			<div>
				<foxy-sheet>
					<slot name="default" v-bind="{title, value}">
						<span>{{ title }}</span>
					</slot>
					<foxy-btn
							v-if="toggleable"
							@click="handleToggleNode"
							@keydown="handleKeydown"
					/>
				</foxy-sheet>
			</div>
		</div>
		<template v-if="items && items.length <= 1">
			<div class="organisation-tree-node__childrens">
				<div>
					<foxy-organisation-tree-node-connector
							:length="items.length"
							:direction="direction"
					/>
				</div>
				<div>
					<div
							v-for="item of items"
							:key="item.value"
					>
						<foxy-organisation-tree-node
								:title="item.title"
								:items="item.children"
								:value="item.value"
								v-bind="item.props"
						>
							<template v-if="$slots.default" #default="{title, value}">
								<slot name="default" v-bind="{title, value}"/>
							</template>
						</foxy-organisation-tree-node>
					</div>
				</div>
			</div>
		</template>
	</component>
</template>

<script
		lang="ts"
		setup
>

	import { FoxyBtn, FoxySheet } from "@foxy/components"
	import { useItems } from "@foxy/composables"

	import { IOrganisationTreeNodeProps } from "@foxy/interfaces"

	const props = withDefaults(defineProps<IOrganisationTreeNodeProps>(), {
		tag: 'div',
		itemType: 'type',
		items: [],
		itemTitle: 'title',
		itemValue: 'value',
		itemChildren: 'children',
		itemProps: 'props',
	})

	const { items } = useItems(props)

</script>

<style
		lang="scss"
		scoped
>

</style>
