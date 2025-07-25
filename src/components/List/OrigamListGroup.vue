<template>
	<component
			:is="tag"
			:class="listGroupClasses"
			:style="listGroupStyles"
	>
		<slot name="default">
			<origam-list-group-activator class="origam-list-group__activator">
				<slot
						name="activator"
						v-bind="{ events: activatorEvents, props: activatorProps, isOpen, toggleIcon }"
				>
					<origam-list-item
							:active="isOpen"
							:append-icon="appendActivatorIcon"
							:prepend-icon="prependActivatorIcon"
							:title="title"
							:value="value"
							v-bind="activatorProps"
							v-on="activatorEvents"
					/>
				</slot>
			</origam-list-group-activator>

			<origam-transition
					:disabled="!isBooted"
					:transition="transition"
			>
				<div
						v-if="isOpen"
						:aria-labelledby="id"
						class="origam-list-group__items"
						role="group"
				>
					<slot name="items"/>
				</div>
			</origam-transition>
		</slot>
	</component>
</template>

<script
		lang="ts"
		setup
>
	import { computed, ref, StyleValue, toRef } from 'vue'
	import { OrigamExpandY, OrigamListGroupActivator, OrigamListItem, OrigamTransition } from '../../components'

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
	} from '../../composables'

	import { MDI_ICONS } from "../../enums"

	import type { IListActivatorProps, IListGroupProps } from '../../interfaces'

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
	const id = computed(() => `origam-list-group--id-${String(_id.value)}`)
	const list = useList()
	const {isBooted} = useSsrBoot()
	const transition = ref({component: OrigamExpandY})

	const toggleIcon = computed(() => {
		if (isOpen.value) {
			return props.collapseIcon
		}

		return props.expandIcon
	})
	const activatorProps = computed(() => {
		return {
			class: 'origam-list-group__header',
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
			'origam-list-group',
			{
				'origam-list-group--prepend': list && list.hasPrepend.value,
				'origam-list-group--append': list && list.hasAppend.value,
				'origam-list-group--fluid': props.fluid,
				'origam-list-group--open': isOpen.value
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
	.origam-list-group {
		$this: &;

		&--fluid {
			--origam-list-group---list-indent-size: var(--origam-list-group--fluid---list-indent-size);

			&#{$this}--prepend {
				--origam-list-group---parent-padding: var(--origam-list---indent-padding);
			}
		}

		&--prepend {
			--origam-list-group---parent-padding: calc(var(--origam-list---indent-padding) + var(--origam-list-group---prepend-width));
		}

		&__items {
			--origam-list---indent-padding: calc(var(--origam-list-group---parent-padding) + var(--origam-list-group---list-indent-size));
		}

		&__header {
			.origam-list-item {
				$item: &;

				&--active {
					&:not(:focus-visible) {
						#{$item}__overlay {
							opacity: var(--origam-list-group__header--active---opacity);
						}
					}

					&:hover {
						#{$item}__overlay {
							opacity: var(--origam-list-group__header--active--hover---opacity);
						}
					}
				}
			}
		}
	}
</style>

<style>
	:root {
		--origam-list-group---list-indent-size: 16px;
		--origam-list-group---parent-padding: var(--origam-list---indent-padding);
		--origam-list-group---prepend-width: 16px;

		--origam-list-group--fluid---list-indent-size: 0px;

		--origam-list-group__header--active---opacity: 0;
		--origam-list-group__header--active--hover---opacity: calc(0.04 * 1);
	}
</style>
