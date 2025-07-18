<template>
	<component
			:is="tag"
			:class="listClasses"
			:style="listStyles"
			:tabindex="tabIndex"
			role="listbox"
			@focus="handleFocus"
			@focusin="handleFocusIn"
			@focusout="handleFocusOut"
			@keydown="handleKeydown"
			@mousedown="handleMouseDown"
	>
		<slot name="default">
			<foxui-list-children
					v-if="items"
					:items="items"
					:return-object="returnObject"
			>
				<template
						v-if="hasChildrenItem"
						#children="{item, index}"
				>
					<slot
							name="childrenItem"
							v-bind="{item, index}"
					/>
				</template>

				<template
						v-if="hasDivider"
						#divider="{itemProps}"
				>
					<slot
							name="divider"
							v-bind="itemProps"
					/>
				</template>

				<template
						v-if="hasSubheader"
						#subheader="{itemProps}"
				>
					<slot
							name="subheader"
							v-bind="itemProps"
					/>
				</template>

				<template
						v-if="hasGroup"
						#group="{itemProps}"
				>
					<slot
							name="group"
							v-bind="itemProps"
					/>
				</template>

				<template
						v-if="hasGroupActivator"
						#groupActivator="{props, isOpen, events, toggleIcon}"
				>
					<slot
							name="groupActivator"
							v-bind="{props, isOpen, events, toggleIcon}"
					/>
				</template>

				<template
						v-if="hasItem"
						#item="{itemProps}"
				>
					<slot
							name="item"
							v-bind="itemProps"
					/>
				</template>
			</foxui-list-children>
		</slot>
	</component>
</template>

<script
		lang="ts"
		setup
>
	import { FoxuiListChildren } from '@foxui/components'

	import {
		useBorder,
		useBothColor,
		useCreateList,
		useDensity,
		useDimension,
		useElevation,
		useItems,
		useMargin,
		useNested,
		usePadding,
		useProps,
		useRounded
	} from '@foxui/composables'

	import { DENSITY, KEYBOARD_VALUES, LINES, OPEN_STRATEGY, SELECT_STRATEGY } from '@foxui/enums'

	import type { IListProps } from '@foxui/interfaces'

	import type { TFocusLocation } from '@foxui/types'

	import { deepEqual, focusChild } from '@foxui/utils'

	import { computed, ref, shallowRef, StyleValue, toRef, useSlots } from 'vue'

	const props = withDefaults(defineProps<IListProps>(), {
		tag: 'div',
		lines: LINES.ONE,
		selectStrategy: SELECT_STRATEGY.SINGLE_LEAF,
		openStrategy: OPEN_STRATEGY.LIST,
		itemType: 'type',
		items: () => [],
		itemTitle: 'title',
		itemValue: 'value',
		itemChildren: 'children',
		itemProps: 'props',
		valueComparator: deepEqual,
		density: DENSITY.DEFAULT
	})

	defineEmits(['update:selected', 'update:opened', 'click:open', 'click:select'])

	const {filterProps} = useProps<IListProps>(props)

	const {items} = useItems(props)
	const {colorStyles} = useBothColor(toRef(props, 'bgColor'), toRef(props, 'color'))
	const {densityClasses} = useDensity(props)
	const {dimensionStyles} = useDimension(props)
	const {elevationClasses} = useElevation(props)
	const {roundedClasses, roundedStyles} = useRounded(props)
	const {borderClasses, borderStyles} = useBorder(props)
	const {paddingClasses, paddingStyles} = usePadding(props)
	const {marginClasses, marginStyles} = useMargin(props)
	const {children, open, parents, select} = useNested(props)
	const slots = useSlots()

	useCreateList()

	const isFocused = shallowRef(false)
	const contentRef = ref<HTMLElement>()

	const lineClasses = computed(() => {
		return [
			props.lines ? `foxui-list--${props.lines}-line` : undefined
		]
	})
	const tabIndex = computed(() => {
		return (props.disabled || isFocused.value) ? -1 : 0
	})

	const handleFocus = (e: FocusEvent) => {
		if (!isFocused.value && !(e.relatedTarget && contentRef.value?.contains(e.relatedTarget as Node))) {
			focus()
		}
	}
	const handleFocusIn = () => {
		isFocused.value = true
	}
	const handleFocusOut = () => {
		isFocused.value = false
	}
	const handleKeydown = (e: KeyboardEvent) => {
		if (!contentRef.value) return

		if (e.key === KEYBOARD_VALUES.DOWN) {
			focus('next')
		} else if (e.key === KEYBOARD_VALUES.UP) {
			focus('prev')
		} else if (e.key === KEYBOARD_VALUES.HOME) {
			focus('first')
		} else if (e.key === KEYBOARD_VALUES.END) {
			focus('last')
		} else {
			return
		}

		e.preventDefault()
	}
	const handleMouseDown = () => {
		isFocused.value = true
	}
	const focus = (location?: TFocusLocation) => {
		if (contentRef.value) {
			return focusChild(contentRef.value, location)
		}
	}

	// SLOTS

	const hasChildrenItem = computed(() => {
		return slots.childrenItem
	})
	const hasDivider = computed(() => {
		return slots.divider
	})
	const hasSubheader = computed(() => {
		return slots.subheader
	})
	const hasGroup = computed(() => {
		return slots.group
	})
	const hasGroupActivator = computed(() => {
		return slots.groupActivator
	})
	const hasItem = computed(() => {
		return slots.item
	})

	// CLASS & STYLES

	const listStyles = computed(() => {
		return [
			colorStyles.value,
			dimensionStyles.value,
			borderStyles.value,
			roundedStyles.value,
			paddingStyles.value,
			marginStyles.value,
			props.style
		] as StyleValue
	})
	const listClasses = computed(() => {
		return [
			'foxui-list',
			{
				'foxui-list--disabled': props.disabled,
				'foxui-list--nav': props.nav,
				'foxui-list--slim': props.slim
			},
			borderClasses.value,
			paddingClasses.value,
			marginClasses.value,
			densityClasses.value,
			elevationClasses.value,
			lineClasses.value,
			roundedClasses.value,
			props.class
		]
	})

	// EXPOSE

	defineExpose({
		open,
		select,
		focus,
		children,
		parents,
		filterProps
	})
</script>

<style
		lang="scss"
		scoped
>
	.foxui-list {
		padding-block-start: var(--foxui-list---padding-block-start);
		padding-block-end: var(--foxui-list---padding-block-end);
		padding-inline-start: var(--foxui-list---padding-inline-start);
		padding-inline-end: var(--foxui-list---padding-inline-end);

		position: var(--foxui-list---position);
		overflow: var(--foxui-list---overflow);
		outline: var(--foxui-list---outline);

		border-color: var(--foxui-list---border-color);
		border-style: var(--foxui-list---border-style);
		border-width: var(--foxui-list---border-width);
		border-radius: var(--foxui-list---border-radius);

		background: var(--foxui-list---background);
		box-shadow: var(--foxui-list---box-shadow);
		color: var(--foxui-list---color);

		pointer-events: var(--foxui-list---pointer-events);
		user-select: var(--foxui-list---user-select);

		&--border {
			--foxui-list---border-width: thin;
			--foxui-list---box-shadow: none;
		}

		&--disabled {
			--foxui-list---pointer-events: none;
			--foxui-list---user-select: none;
		}

		&--nav {
			--foxui-list---padding-inline: 8px;
			--foxui-list-subheader---font-size: 0.75rem;
			--foxui-list---indent-padding: -8px;
		}

		&--rounded {
			--foxui-list---border-radius: 4px;
		}

		&--subheader {
			--foxui-list---padding-block-start: 0px;
		}

		&--slim {
			--foxui-list-group---prepend-width: var(--foxui-list--slim---prepend-width);
		}

		&--density-default {
			--foxui-list---density: 0px;
		}

		&--density-compact {
			--foxui-list---density: -8px;
		}

		&__overlay {
			background-color: var(--foxui-list__overlay---background-color);
			border-radius: var(--foxui-list__overlay---border-radius);
			opacity: var(--foxui-list__overlay---opacity);
			pointer-events: var(--foxui-list__overlay---pointer-events);
			position: var(--foxui-list__overlay---position);
			bottom: var(--foxui-list__overlay---position-bottom);
			left: var(--foxui-list__overlay---position-left);
			right: var(--foxui-list__overlay---position-right);
			top: var(--foxui-list__overlay---position-top);
			transition-property: var(--foxui-list__overlay---transition-property);
			transition-duration: var(--foxui-list__overlay---transition-duration);
			transition-timing-function: var(--foxui-list__overlay---transition-timing-function);
		}
	}
</style>

<style>
	:root {
		--foxui-list---indent-padding: 0px;

		--foxui-list---border-top-width: 0;
		--foxui-list---border-left-width: 0;
		--foxui-list---border-bottom-width: 0;
		--foxui-list---border-right-width: 0;
		--foxui-list---border-width: var(--foxui-list---border-top-width) var(--foxui-list---border-left-width) var(--foxui-list---border-bottom-width) var(--foxui-list---border-right-width);
		--foxui-list---border-color: rgba(0, 0, 0, 0.87);
		--foxui-list---border-style: solid;
		--foxui-list---border-start-start-radius: 0;
		--foxui-list---border-start-end-radius: 0;
		--foxui-list---border-end-start-radius: 0;
		--foxui-list---border-end-end-radius: 0;
		--foxui-list---border-radius: var(--foxui-list---border-start-start-radius) var(--foxui-list---border-start-end-radius) var(--foxui-list---border-end-start-radius) var(--foxui-list---border-end-end-radius);

		--foxui-list---padding-block-start: 8px;
		--foxui-list---padding-block-end: 8px;
		--foxui-list---padding-inline-start: 0;
		--foxui-list---padding-inline-end: 0;

		--foxui-list---overflow: auto;
		--foxui-list---position: relative;
		--foxui-list---outline: none;

		--foxui-list---pointer-events: auto;
		--foxui-list---user-select: auto;

		--foxui-list---color: rgba(0, 0, 0, 0.87);
		--foxui-list---box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.2), 0px 0px 0px 0px rgba(0, 0, 0, 0.14), 0px 0px 0px 0px rgba(0, 0, 0, 0.12);
		--foxui-list---background: rgb(255, 255, 255);

		--foxui-list__overlay---background-color: #000;
		--foxui-list__overlay---border-radius: inherit;
		--foxui-list__overlay---opacity: 0;
		--foxui-list__overlay---pointer-events: none;
		--foxui-list__overlay---position: absolute;
		--foxui-list__overlay---position-bottom: 0;
		--foxui-list__overlay---position-left: 0;
		--foxui-list__overlay---position-right: 0;
		--foxui-list__overlay---position-top: 0;
		--foxui-list__overlay---transition-property: opacity;
		--foxui-list__overlay---transition-duration: 0.2s;
		--foxui-list__overlay---transition-timing-function: ease-in-out;

		--foxui-list--slim---prepend-width: 28px;
	}
</style>
