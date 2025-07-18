<template>
	<component
			:is="tag"
			:class="listGroupClasses"
			:style="listGroupStyles"
	>
		<slot name="default">
			<foxui-list-group-activator class="foxui-list-group__activator">
				<slot
						name="activator"
						v-bind="{ events: activatorEvents, props: activatorProps, isOpen, toggleIcon }"
				>
					<foxui-list-item
							:active="isOpen"
							:append-icon="appendActivatorIcon"
							:prepend-icon="prependActivatorIcon"
							:title="title"
							:value="value"
							v-bind="activatorProps"
							v-on="activatorEvents"
					/>
				</slot>
			</foxui-list-group-activator>

			<foxui-transition
					:disabled="!isBooted"
					:transition="transition"
			>
				<div
						v-if="isOpen"
						:aria-labelledby="id"
						class="foxui-list-group__items"
						role="group"
				>
					<slot name="items"/>
				</div>
			</foxui-transition>
		</slot>
	</component>
</template>

<script
		lang="ts"
		setup
>
	import { FoxuiExpandY, FoxuiListGroupActivator, FoxuiListItem, FoxuiTransition } from '@foxui/components'

	import {
		useBorder,
		useBothColor,
		useList,
		useMargin,
		useNestedItem,
		usePadding,
		useProps,
		useRounded,
		useSsrBoot
	} from '@foxui/composables'

	import { MDI_ICONS } from "@foxui/enums"

	import type { IListActivatorProps, IListGroupProps } from '@foxui/interfaces'

	import { computed, ref, StyleValue, toRef } from 'vue'

	const props = withDefaults(defineProps<IListGroupProps>(), {
		tag: 'div',
		expandIcon: MDI_ICONS.CHEVRON_DOWN,
		collapseIcon: MDI_ICONS.CHEVRON_UP
	})

	const emits = defineEmits(['click:activator'])

	const {filterProps} = useProps<IListGroupProps>(props)

	const {colorStyles} = useBothColor(toRef(props, 'bgColor'), toRef(props, 'color'))
	const {roundedClasses, roundedStyles} = useRounded(props)
	const {borderClasses, borderStyles} = useBorder(props)
	const {paddingClasses, paddingStyles} = usePadding(props)
	const {marginClasses, marginStyles} = useMargin(props)

	const {isOpen, open, id: _id} = useNestedItem(toRef(props, 'value'), true)
	const id = computed(() => `foxui-list-group--id-${String(_id.value)}`)
	const list = useList()
	const {isBooted} = useSsrBoot()
	const transition = ref({component: FoxuiExpandY})

	const toggleIcon = computed(() => {
		if (isOpen.value) {
			return props.collapseIcon
		}

		return props.expandIcon
	})
	const activatorProps = computed(() => {
		return {
			class: 'foxui-list-group__header',
			id: id.value,
			'onClick': handleClick
		} as IListActivatorProps
	})
	const prependActivatorIcon = computed(() => {
		return props.prependIcon
	})
	const appendActivatorIcon = computed(() => {
		return props.appendIcon || toggleIcon.value
	})

	const handleClick = (e: Event) => {
		emits('click:activator', {open: !isOpen.value, event: e})

		open(!isOpen.value, e)
	}

	// CLASS & STYLES

	const listGroupStyles = computed(() => {
		return [
			colorStyles.value,
			roundedStyles.value,
			borderStyles.value,
			paddingStyles.value,
			marginStyles.value,
			props.style
		] as StyleValue
	})
	const listGroupClasses = computed(() => {
		return [
			'foxui-list-group',
			{
				'foxui-list-group--prepend': list && list.hasPrepend.value,
				'foxui-list-group--append': list && list.hasAppend.value,
				'foxui-list-group--fluid': props.fluid,
				'foxui-list-group--open': isOpen.value
			},
			roundedClasses.value,
			borderClasses.value,
			paddingClasses.value,
			marginClasses.value,
			props.class
		]
	})

	// EXPOSE

	defineExpose({
		isOpen,
		filterProps
	})
</script>

<style
		lang="scss"
		scoped
>
	.foxui-list-group {
		$this: &;

		&--fluid {
			--foxui-list-group---list-indent-size: var(--foxui-list-group--fluid---list-indent-size);

			&#{$this}--prepend {
				--foxui-list-group---parent-padding: var(--foxui-list---indent-padding);
			}
		}

		&--prepend {
			--foxui-list-group---parent-padding: calc(var(--foxui-list---indent-padding) + var(--foxui-list-group---prepend-width));
		}

		&__items {
			--foxui-list---indent-padding: calc(var(--foxui-list-group---parent-padding) + var(--foxui-list-group---list-indent-size));
		}

		&__header {
			.foxui-list-item {
				$item: &;

				&--active {
					&:not(:focus-visible) {
						#{$item}__overlay {
							opacity: var(--foxui-list-group__header--active---opacity);
						}
					}

					&:hover {
						#{$item}__overlay {
							opacity: var(--foxui-list-group__header--active--hover---opacity);
						}
					}
				}
			}
		}
	}
</style>

<style>
	:root {
		--foxui-list-group---list-indent-size: 16px;
		--foxui-list-group---parent-padding: var(--foxui-list---indent-padding);
		--foxui-list-group---prepend-width: 16px;

		--foxui-list-group--fluid---list-indent-size: 0px;

		--foxui-list-group__header--active---opacity: 0;
		--foxui-list-group__header--active--hover---opacity: calc(0.04 * 1);
	}
</style>
