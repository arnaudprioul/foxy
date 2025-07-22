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
			<origam-list-children
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
			</origam-list-children>
		</slot>
	</component>
</template>

<script
		lang="ts"
		setup
>
	import { computed, ref, shallowRef, StyleValue, toRef, useSlots } from 'vue'
	import { OrigamListChildren } from '../../components'

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
	} from '../../composables'

	import { DENSITY, KEYBOARD_VALUES, LINES, OPEN_STRATEGY, SELECT_STRATEGY } from '../../enums'

	import type { IListProps } from '../../interfaces'

	import type { TFocusLocation } from '../../types'

	import { deepEqual, focusChild } from '../../utils'

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
			props.lines ? `origam-list--${props.lines}-line` : undefined
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
			'origam-list',
			{
				'origam-list--disabled': props.disabled,
				'origam-list--nav': props.nav,
				'origam-list--slim': props.slim
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
	.origam-list {
		padding-block-start: var(--origam-list---padding-block-start);
		padding-block-end: var(--origam-list---padding-block-end);
		padding-inline-start: var(--origam-list---padding-inline-start);
		padding-inline-end: var(--origam-list---padding-inline-end);

		position: var(--origam-list---position);
		overflow: var(--origam-list---overflow);
		outline: var(--origam-list---outline);

		border-color: var(--origam-list---border-color);
		border-style: var(--origam-list---border-style);
		border-width: var(--origam-list---border-width);
		border-radius: var(--origam-list---border-radius);

		background: var(--origam-list---background);
		box-shadow: var(--origam-list---box-shadow);
		color: var(--origam-list---color);

		pointer-events: var(--origam-list---pointer-events);
		user-select: var(--origam-list---user-select);

		&--border {
			--origam-list---border-width: thin;
			--origam-list---box-shadow: none;
		}

		&--disabled {
			--origam-list---pointer-events: none;
			--origam-list---user-select: none;
		}

		&--nav {
			--origam-list---padding-inline: 8px;
			--origam-list-subheader---font-size: 0.75rem;
			--origam-list---indent-padding: -8px;
		}

		&--rounded {
			--origam-list---border-radius: 4px;
		}

		&--subheader {
			--origam-list---padding-block-start: 0px;
		}

		&--slim {
			--origam-list-group---prepend-width: var(--origam-list--slim---prepend-width);
		}

		&--density-default {
			--origam-list---density: 0px;
		}

		&--density-compact {
			--origam-list---density: -8px;
		}

		&__overlay {
			background-color: var(--origam-list__overlay---background-color);
			border-radius: var(--origam-list__overlay---border-radius);
			opacity: var(--origam-list__overlay---opacity);
			pointer-events: var(--origam-list__overlay---pointer-events);
			position: var(--origam-list__overlay---position);
			bottom: var(--origam-list__overlay---position-bottom);
			left: var(--origam-list__overlay---position-left);
			right: var(--origam-list__overlay---position-right);
			top: var(--origam-list__overlay---position-top);
			transition-property: var(--origam-list__overlay---transition-property);
			transition-duration: var(--origam-list__overlay---transition-duration);
			transition-timing-function: var(--origam-list__overlay---transition-timing-function);
		}
	}
</style>

<style>
	:root {
		--origam-list---indent-padding: 0px;

		--origam-list---border-top-width: 0;
		--origam-list---border-left-width: 0;
		--origam-list---border-bottom-width: 0;
		--origam-list---border-right-width: 0;
		--origam-list---border-width: var(--origam-list---border-top-width) var(--origam-list---border-left-width) var(--origam-list---border-bottom-width) var(--origam-list---border-right-width);
		--origam-list---border-color: rgba(0, 0, 0, 0.87);
		--origam-list---border-style: solid;
		--origam-list---border-start-start-radius: 0;
		--origam-list---border-start-end-radius: 0;
		--origam-list---border-end-start-radius: 0;
		--origam-list---border-end-end-radius: 0;
		--origam-list---border-radius: var(--origam-list---border-start-start-radius) var(--origam-list---border-start-end-radius) var(--origam-list---border-end-start-radius) var(--origam-list---border-end-end-radius);

		--origam-list---padding-block-start: 8px;
		--origam-list---padding-block-end: 8px;
		--origam-list---padding-inline-start: 0;
		--origam-list---padding-inline-end: 0;

		--origam-list---overflow: auto;
		--origam-list---position: relative;
		--origam-list---outline: none;

		--origam-list---pointer-events: auto;
		--origam-list---user-select: auto;

		--origam-list---color: rgba(0, 0, 0, 0.87);
		--origam-list---box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.2), 0px 0px 0px 0px rgba(0, 0, 0, 0.14), 0px 0px 0px 0px rgba(0, 0, 0, 0.12);
		--origam-list---background: rgb(255, 255, 255);

		--origam-list__overlay---background-color: #000;
		--origam-list__overlay---border-radius: inherit;
		--origam-list__overlay---opacity: 0;
		--origam-list__overlay---pointer-events: none;
		--origam-list__overlay---position: absolute;
		--origam-list__overlay---position-bottom: 0;
		--origam-list__overlay---position-left: 0;
		--origam-list__overlay---position-right: 0;
		--origam-list__overlay---position-top: 0;
		--origam-list__overlay---transition-property: opacity;
		--origam-list__overlay---transition-duration: 0.2s;
		--origam-list__overlay---transition-timing-function: ease-in-out;

		--origam-list--slim---prepend-width: 28px;
	}
</style>
