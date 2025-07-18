<template>
	<div class="foxui-list-children">
		<slot name="default">
			<template v-for="(item, index) in listItems">
				<slot
						name="children"
						v-bind="{item, index}"
				>
					<div
							:key="index"
							class="foxui-list-children__item"
					>
						<slot
								v-if="hasDivider(item)"
								name="divider"
								v-bind="{ itemProps: item.props }"
						>
							<foxui-divider v-bind="item.props"/>
						</slot>

						<slot
								v-else-if="hasSubheader(item)"
								name="subheader"
								v-bind="{ itemProps: item.props }"
						>
							<foxui-list-subheader v-bind="item.props">
								<template
										v-if="hasSubheaderTitle"
										#default="{title}"
								>
									<slot
											name="subheaderTitle"
											v-bind="{title}"
									/>
								</template>
							</foxui-list-subheader>
						</slot>

						<slot
								v-else-if="hasChildren(item)"
								name="group"
								v-bind="{ itemProps: item.props }"
						>
							<foxui-list-group v-bind="item.props">
								<template
										v-if="hasGroupActivator"
										#activator="{props, isOpen, events, toggleIcon}"
								>
									<slot
											name="groupActivator"
											v-bind="{props, isOpen, events, toggleIcon}"
									/>
								</template>

								<template
										v-if="item.children"
										#items
								>
									<foxui-list-children :items="item.children"/>
								</template>
							</foxui-list-group>
						</slot>

						<slot
								v-else
								name="item"
								v-bind="{ itemProps: item.props }"
						>
							<foxui-list-item v-bind="item.props"/>
						</slot>
					</div>
				</slot>
			</template>
		</slot>
	</div>
</template>

<script
		lang="ts"
		setup
>
	import { FoxuiDivider, FoxuiListGroup, FoxuiListItem, FoxuiListSubheader } from '@foxui/components'

	import { useCreateList, useProps } from '@foxui/composables'

	import { LIST_ITEM_TYPE } from '@foxui/enums'

	import type { IInternalListItemChildren, IListItemChildren } from '@foxui/interfaces'

	import { computed, useSlots } from 'vue'

	const props = withDefaults(defineProps<IListItemChildren>(), {})

	const {filterProps} = useProps<IListItemChildren>(props)

	const slots = useSlots()

	useCreateList()

	const listItems = computed(() => {
		return props.items.map((item) => {
			return {children: item.children, props: item.props, type: item.type, raw: item}
		})
	})

	// SLOTS

	const hasSubheaderTitle = computed(() => {
		return slots.subheaderTitle
	})
	const hasGroupActivator = computed(() => {
		return slots.groupActivator
	})

	const hasDivider = (item: IInternalListItemChildren) => {
		return slots.divider || item.type === LIST_ITEM_TYPE.DIVIDER
	}
	const hasSubheader = (item: IInternalListItemChildren) => {
		return slots.subheader || item.type === LIST_ITEM_TYPE.SUBHEADER
	}
	const hasChildren = (item: IInternalListItemChildren) => {
		return item.children && item.children.length
	}

	// EXPOSE

	defineExpose({
		filterProps
	})
</script>
