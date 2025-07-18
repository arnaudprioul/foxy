<template>
	<component
			:is="link.tag"
			v-ripple="isClickable && ripple"
			:class="listItemClasses"
			:href="link.href.value"
			:style="listItemStyles"
			:tabindex="listItemTabIndex"
			@click="handleClick"
			@keydown="isClickable && !isLink && handleKeyDown"
	>
    <span
		    v-if="isClickable || isActive"
		    key="overlay"
		    class="foxui-list-item__overlay"
    />
		<span
				key="underlay"
				class="foxui-list-item__underlay"
		/>

		<slot name="wrapper">
			<div
					v-if="hasPrepend"
					key="prepend"
					class="foxui-list-item__prepend"
					@click="handleClickPrepend"
			>
				<slot
						name="prepend"
						v-bind="slotProps"
				>
					<foxui-avatar
							v-if="prependAvatar"
							key="prepend-avatar"
							:density="density"
							:image="prependAvatar"
					/>
					<foxui-icon
							v-if="prependIcon"
							key="prepend-icon"
							:density="density"
							:icon="prependIcon"
					/>
				</slot>
			</div>

			<div
					class="foxui-list-item__content"
					data-no-activator=""
			>
				<div
						v-if="hasTitle"
						key="title"
						class="foxui-list-item__title"
				>
					<slot
							name="title"
							v-bind="{ title }"
					>{{ title }}
					</slot>
				</div>

				<div
						v-if="hasSubtitle"
						key="subtitle"
						class="foxui-list-item__subtitle"
				>
					<slot
							name="subtitle"
							v-bind="{ subtitle }"
					>{{ subtitle }}
					</slot>
				</div>

				<slot
						name="default"
						v-bind="slotProps"
				/>
			</div>

			<div
					v-if="hasAppend"
					key="append"
					class="foxui-list-item__append"
					@click="handleClickAppend"
			>
				<slot
						name="append"
						v-bind="slotProps"
				>
					<foxui-avatar
							v-if="appendAvatar"
							key="append-avatar"
							:density="density"
							:image="appendAvatar"
					/>
					<foxui-icon
							v-if="appendIcon"
							key="append-icon"
							:density="density"
							:icon="appendIcon"
					/>
				</slot>
			</div>
		</slot>
	</component>
</template>

<script
		lang="ts"
		setup
>
	import { FoxuiAvatar, FoxuiIcon } from '@foxui/components'

	import {
		useAdjacent,
		useBackgroundColor,
		useBorder,
		useDensity,
		useDimension,
		useElevation,
		useLink,
		useList,
		useMargin,
		useNestedItem,
		usePadding,
		useProps,
		useRounded
	} from '@foxui/composables'

	import { vRipple } from '@foxui/directives'

	import { KEYBOARD_VALUES } from '@foxui/enums'

	import type { IListItemProps } from '@foxui/interfaces'

	import type { TListItemSlot } from '@foxui/types'

	import { computed, onBeforeMount, StyleValue, toRef, useAttrs, useSlots, watch } from 'vue'

	const attrs = useAttrs()

	const props = withDefaults(defineProps<IListItemProps>(), {tag: 'div'})

	const emits = defineEmits(['click', 'click:append', 'click:prepend'])

	const {filterProps} = useProps<IListItemProps>(props)

	const slots = useSlots()
	const link = useLink(props, attrs)
	const id = computed(() => props.value === undefined ? link.href.value : props.value)
	const {
		select,
		isSelected,
		isIndeterminate,
		isGroupActivator,
		root,
		parent,
		openOnSelect
	} = useNestedItem(id, false)
	const list = useList()
	const {backgroundColorStyles} = useBackgroundColor(toRef(props, 'bgColor'))
	const {borderClasses, borderStyles} = useBorder(props)
	const {paddingClasses, paddingStyles} = usePadding(props)
	const {marginClasses, marginStyles} = useMargin(props)
	const {densityClasses} = useDensity(props)
	const {dimensionStyles} = useDimension(props)
	const {elevationClasses} = useElevation(props)
	const {roundedClasses, roundedStyles} = useRounded({rounded: props.rounded || props.nav})

	const {
		onClickPrepend: handleClickPrepend,
		onClickAppend: handleClickAppend,
		hasAppend,
		hasPrepend
	} = useAdjacent(props, toRef(props, 'prependIcon'), toRef(props, 'appendIcon'))

	const isActive = computed(() => {
		return props.active || link.isActive?.value || isSelected.value
	})
	const isLink = computed(() => {
		return props.link && link.isLink.value
	})
	const isClickable = computed(() => {
		return !props.disabled && props.link && (props.link || link.isClickable.value || (props.value != null && !!list))
	})
	const lineClasses = computed(() => {
		return [
			props.lines ? `foxui-list-item--${props.lines}-line` : undefined
		]
	})
	const listItemTabIndex = computed(() => {
		return isClickable.value ? (list ? -2 : 0) : undefined
	})

	const setActiveLink = () => {
		if (parent.value != null) {
			root.open(parent.value, true)
		}
		openOnSelect(true)
	}

	watch(() => link.isActive?.value, val => {
		if (!val) {
			return
		}

		setActiveLink()
	})

	// EVENTS

	const click = (e: MouseEvent) => {
		emits('click', e)

		if (isGroupActivator || !isClickable.value) return

		link.navigate?.(e)

		if (props.value != null) {
			select(!isSelected.value, e)
		}
	}
	const handleClick = (e: MouseEvent) => {
		click(e)
	}
	const handleKeyDown = (e: KeyboardEvent) => {
		if (e.key === KEYBOARD_VALUES.ENTER || e.key === ' ') {
			e.preventDefault()
			click(e as any as MouseEvent)
		}
	}

	// SLOTS

	const slotProps = computed(() => {
		return ({
			isActive: isActive.value,
			select,
			isSelected: isSelected.value,
			isIndeterminate: isIndeterminate.value
		} satisfies TListItemSlot)
	})
	const hasTitle = computed(() => {
		return slots.title || props.title != null
	})
	const hasSubtitle = computed(() => {
		return slots.subtitle || props.subtitle != null
	})

	list?.updateHasPrepend(hasPrepend)
	list?.updateHasAppend(hasAppend)

	onBeforeMount(() => {
		if (link.isActive?.value) {
			setActiveLink()
		}
	})

	// CLASS & STYLES

	const listItemStyles = computed(() => {
		return [
			dimensionStyles.value,
			borderStyles.value,
			backgroundColorStyles.value,
			paddingStyles.value,
			marginStyles.value,
			roundedStyles.value,
			props.style
		] as StyleValue
	})
	const listItemClasses = computed(() => {
		return [
			'foxui-list-item',
			{
				'foxui-list-item--active': isActive.value,
				'foxui-list-item--disabled': props.disabled,
				'foxui-list-item--link': isClickable.value,
				'foxui-list-item--nav': props.nav,
				'foxui-list-item--prepend': !hasPrepend && list && list.hasPrepend.value,
				'foxui-list-item--append': !hasAppend && list && list.hasAppend.value,
				'foxui-list-item--slim': props.slim,
				[`${props.activeClass}`]: props.activeClass && isActive.value
			},
			borderClasses.value,
			densityClasses.value,
			elevationClasses.value,
			lineClasses.value,
			roundedClasses.value,
			paddingClasses.value,
			marginClasses.value,
			props.class
		]
	})

	// EXPOSE

	defineExpose({
		isGroupActivator,
		isSelected,
		list,
		select,
		filterProps
	})
</script>

<style
		lang="scss"
		scoped
>
	.foxui-list-item {
		$this: &;

		align-items: var(--foxui-list-item---align-items);
		display: var(--foxui-list-item---display);
		flex: var(--foxui-list-item---flex);
		grid-template-areas: var(--foxui-list-item---grid-template-areas);
		grid-template-columns: var(--foxui-list-item---grid-template-columns);

		max-width: var(--foxui-list-item---max-width);
		min-height: calc(var(--foxui-list-item---min-height) + var(--foxui-list---density));

		text-decoration: var(--foxui-list-item---text-decoration);

		outline: var(--foxui-list-item---outline);
		position: var(--foxui-list-item---position);

		padding-block-start: calc(var(--foxui-list-item---padding-block-start) + var(--foxui-list---density));
		padding-block-end: calc(var(--foxui-list-item---padding-block-end) + var(--foxui-list---density));
		padding-inline-start: calc(var(--foxui-list-item---padding-inline-start) + var(--foxui-list---indent-padding) + var(--foxui-list---density));
		padding-inline-end: calc(var(--foxui-list-item---padding-inline-end) + var(--foxui-list---density));

		margin-block-start: var(--foxui-list-item---margin-block-start);
		margin-block-end: var(--foxui-list-item---margin-block-end);
		margin-inline-start: var(--foxui-list-item---margin-inline-start);
		margin-inline-end: var(--foxui-list-item---margin-inline-end);

		border-color: var(--foxui-list-item---border-color);
		border-style: var(--foxui-list-item---border-style);
		border-width: var(--foxui-list-item---border-width);
		border-radius: var(--foxui-list-item---border-radius);

		&--border {
			--foxui-list-item---border-width: thin;
			--foxui-list-item---box-shadow: none;
		}

		&--rounded {
			--foxui-list-item---border-radius: 4px;
		}

		&--active {
			#{$this}__prepend,
			#{$this}__append {
				&,
				> .foxui-badge {
					.foxui-icon {
						--foxui-list-item__icon---opacity: 1;
					}
				}
			}
		}

		&--disabled {
			pointer-events: var(--foxui-list-item---pointer-events);
			user-select: var(--foxui-list-item---user-select);
			opacity: var(--foxui-list-item---opacity);
		}

		&--link {
			cursor: var(--foxui-list-item---cursor);
		}

		&--one-line {
			#{$this}__subtitle {
				-webkit-line-clamp: 1;
			}
		}

		&--two-line {
			#{$this}__subtitle {
				-webkit-line-clamp: 2;
			}
		}

		&--three-line {
			#{$this}__prepend {
				--foxui-list-item__prepend---align-self: start;
			}

			#{$this}__append {
				--foxui-list-item__append---align-self: start;
			}

			#{$this}__subtitle {
				-webkit-line-clamp: 3;
			}
		}

		&--nav {
			--foxui-list-item---padding-inline: 8px;

			&:not(:only-child) {
				--foxui-list-item---margin-block-end: 4px;
			}

			#{$this}__title {
				--foxui-list-item__title---font-size: 0.8125rem;
				--foxui-list-item__title---font-weight: 500;
				--foxui-list-item__title---letter-spacing: normal;
				--foxui-list-item__title---line-height: 1rem;
			}

			#{$this}__subtitle {
				--foxui-list-item__subtitle---font-size: 0.75rem;
				--foxui-list-item__subtitle---font-weight: 400;
				--foxui-list-item__subtitle---letter-spacing: 0.0178571429em;
				--foxui-list-item__subtitle---line-height: 1rem;
			}
		}

		&,
		&--active,
		[aria-haspopup=menu][aria-expanded=true] {
			&,
			&:hover,
			&:focus-visible {
				> #{$this}__overlay {
					--foxui-list-item__overlay---opacity: calc(0.12 * 1);
				}
			}
		}

		&__overlay {
			background-color: var(--foxui-list-item__overlay---background-color);
			border-radius: var(--foxui-list-item__overlay---border-radius);
			opacity: var(--foxui-list-item__overlay---opacity);
			pointer-events: var(--foxui-list-item__overlay---pointer-events);
			position: var(--foxui-list-item__overlay---position);
			bottom: var(--foxui-list-item__overlay---position-bottom);
			left: var(--foxui-list-item__overlay---position-left);
			right: var(--foxui-list-item__overlay---position-right);
			top: var(--foxui-list-item__overlay---position-top);
			transition-property: var(--foxui-list-item__overlay---transition-property);
			transition-duration: var(--foxui-list-item__overlay---transition-duration);
			transition-timing-function: var(--foxui-list-item__overlay---transition-timing-function);
		}

		&__underlay {
			position: var(--foxui-list-item__underlay---position);
		}

		&__prepend,
		&__append {
			&,
			> .foxui-badge {
				.foxui-icon {
					opacity: var(--foxui-list-item__icon---opacity);
				}
			}
		}

		&__prepend {
			align-items: var(--foxui-list-item__prepend---align-items);
			align-self: var(--foxui-list-item__prepend---align-self);
			display: var(--foxui-list-item__prepend---display);
			grid-area: var(--foxui-list-item__prepend---grid-area);
			min-width: var(--foxui-list-item__prepend---min-width);
			min-height: var(--foxui-list-item__prepend---min-height);
		}

		&__append {
			align-items: var(--foxui-list-item__append---align-items);
			align-self: var(--foxui-list-item__append---align-self);
			display: var(--foxui-list-item__append---display);
			grid-area: var(--foxui-list-item__append---grid-area);
			min-width: var(--foxui-list-item__append---min-width);
			min-height: var(--foxui-list-item__append---min-height);
		}

		&__content {
			align-self: var(--foxui-list-item__content---align-self);
			grid-area: var(--foxui-list-item__content---grid-area);
			overflow: var(--foxui-list-item__content---overflow);
		}

		&__title {
			hyphens: var(--foxui-list-item__title---hyphens);
			overflow-wrap: var(--foxui-list-item__title---overflow-wrap);
			overflow: var(--foxui-list-item__title---overflow);
			padding-block-start: var(--foxui-list-item__title---padding-block-start);
			padding-block-end: var(--foxui-list-item__title---padding-block-end);
			padding-inline-start: var(--foxui-list-item__title---padding-inline-start);
			padding-inline-end: var(--foxui-list-item__title---padding-inline-end);
			white-space: var(--foxui-list-item__title---white-space);
			text-overflow: var(--foxui-list-item__title---text-overflow);
			word-break: var(--foxui-list-item__title---word-break);
			word-wrap: var(--foxui-list-item__title---word-wrap);
			font-size: var(--foxui-list-item__title---font-size);
			font-weight: var(--foxui-list-item__title---font-weight);
			letter-spacing: var(--foxui-list-item__title---letter-spacing);
			line-height: var(--foxui-list-item__title---line-height);
			text-transform: var(--foxui-list-item__title---text-transform);
		}

		&__subtitle {
			-webkit-box-orient: vertical;
			display: var(--foxui-list-item__subtitle---display);
			opacity: var(--foxui-list-item__subtitle---opacity);
			overflow: var(--foxui-list-item__subtitle---overflow);
			padding-block-start: var(--foxui-list-item__subtitle---padding-block-start);
			padding-block-end: var(--foxui-list-item__subtitle---padding-block-end);
			padding-inline-start: var(--foxui-list-item__subtitle---padding-inline-start);
			padding-inline-end: var(--foxui-list-item__subtitle---padding-inline-end);
			text-overflow: var(--foxui-list-item__subtitle---text-overflow);
			word-break: var(--foxui-list-item__subtitle---word-break);
			font-size: var(--foxui-list-item__subtitle---font-size);
			font-weight: var(--foxui-list-item__subtitle---font-weight);
			letter-spacing: var(--foxui-list-item__subtitle---letter-spacing);
			line-height: var(--foxui-list-item__subtitle---line-height);
			text-transform: var(--foxui-list-item__subtitle---text-transform);
		}
	}
</style>

<style>
	:root {
		--foxui-list-item---align-items: center;
		--foxui-list-item---display: grid;
		--foxui-list-item---flex: none;
		--foxui-list-item---grid-template-areas: "prepend content append";
		--foxui-list-item---grid-template-columns: max-content 1fr auto;

		--foxui-list-item---max-width: 100%;
		--foxui-list-item---min-height: 40px;

		--foxui-list-item---text-decoration: none;

		--foxui-list-item---border-top-width: 0;
		--foxui-list-item---border-left-width: 0;
		--foxui-list-item---border-bottom-width: 0;
		--foxui-list-item---border-right-width: 0;
		--foxui-list-item---border-width: var(--foxui-list-item---border-top-width) var(--foxui-list-item---border-left-width) var(--foxui-list-item---border-bottom-width) var(--foxui-list-item---border-right-width);
		--foxui-list-item---border-color: rgba(0, 0, 0, 0.87);
		--foxui-list-item---border-style: solid;
		--foxui-list-item---border-start-start-radius: 0;
		--foxui-list-item---border-start-end-radius: 0;
		--foxui-list-item---border-end-start-radius: 0;
		--foxui-list-item---border-end-end-radius: 0;
		--foxui-list-item---border-radius: var(--foxui-list-item---border-start-start-radius) var(--foxui-list-item---border-start-end-radius) var(--foxui-list-item---border-end-start-radius) var(--foxui-list-item---border-end-end-radius);

		--foxui-list-item---padding-block-start: 8px;
		--foxui-list-item---padding-block-end: 8px;
		--foxui-list-item---padding-inline-start: 16px;
		--foxui-list-item---padding-inline-end: 16px;

		--foxui-list-item---margin-block-start: 0;
		--foxui-list-item---margin-block-end: 0;
		--foxui-list-item---margin-inline-start: 0;
		--foxui-list-item---margin-inline-end: 0;

		--foxui-list-item---position: relative;
		--foxui-list-item---outline: none;

		--foxui-list-item---pointer-events: none;
		--foxui-list-item---user-select: none;
		--foxui-list-item---opacity: 0.6;

		--foxui-list-item---cursor: pointer;

		--foxui-list-item__overlay---opacity: 0.2;
		--foxui-list-item__overlay---background-color: #000;
		--foxui-list-item__overlay---border-radius: inherit;
		--foxui-list-item__overlay---pointer-events: none;
		--foxui-list-item__overlay---position: absolute;
		--foxui-list-item__overlay---position-bottom: 0;
		--foxui-list-item__overlay---position-left: 0;
		--foxui-list-item__overlay---position-right: 0;
		--foxui-list-item__overlay---position-top: 0;
		--foxui-list-item__overlay---transition-property: opacity;
		--foxui-list-item__overlay---transition-duration: 0.2s;
		--foxui-list-item__overlay---transition-timing-function: ease-in-out;

		--foxui-list-item__underlay---position: absolute;

		--foxui-list-item__icon---opacity: 0.87;

		--foxui-list-item__prepend---align-items: center;
		--foxui-list-item__prepend---align-self: center;
		--foxui-list-item__prepend---display: flex;
		--foxui-list-item__prepend---grid-area: prepend;
		--foxui-list-item__prepend---min-width: 24px;
		--foxui-list-item__prepend---min-height: 24px;

		--foxui-list-item__append---align-items: center;
		--foxui-list-item__append---align-self: center;
		--foxui-list-item__append---display: flex;
		--foxui-list-item__append---grid-area: append;
		--foxui-list-item__append---min-width: 24px;
		--foxui-list-item__append---min-height: 24px;

		--foxui-list-item__content---align-self: center;
		--foxui-list-item__content---grid-area: content;
		--foxui-list-item__content---overflow: hidden;

		--foxui-list-item__title---hyphens: auto;
		--foxui-list-item__title---overflow-wrap: normal;
		--foxui-list-item__title---overflow: hidden;

		--foxui-list-item__title---padding-block-start: 0;
		--foxui-list-item__title---padding-block-end: 0;
		--foxui-list-item__title---padding-inline-start: 0;
		--foxui-list-item__title---padding-inline-end: 0;

		--foxui-list-item__title---white-space: nowrap;
		--foxui-list-item__title---text-overflow: ellipsis;
		--foxui-list-item__title---word-break: normal;
		--foxui-list-item__title---word-wrap: break-word;
		--foxui-list-item__title---font-size: 1rem;
		--foxui-list-item__title---font-weight: 400;
		--foxui-list-item__title---letter-spacing: 0.009375em;
		--foxui-list-item__title---line-height: 1.5rem;
		--foxui-list-item__title---text-transform: none;

		--foxui-list-item__subtitle---display: -webkit-box;
		--foxui-list-item__subtitle---opacity: 0.6;
		--foxui-list-item__subtitle---overflow: hidden;

		--foxui-list-item__subtitle---padding-block-start: 0;
		--foxui-list-item__subtitle---padding-block-end: 0;
		--foxui-list-item__subtitle---padding-inline-start: 0;
		--foxui-list-item__subtitle---padding-inline-end: 0;

		--foxui-list-item__subtitle---text-overflow: ellipsis;
		--foxui-list-item__subtitle---word-break: break-all;
		--foxui-list-item__subtitle---font-size: 0.875rem;
		--foxui-list-item__subtitle---font-weight: 400;
		--foxui-list-item__subtitle---letter-spacing: 0.0178571429em;
		--foxui-list-item__subtitle---line-height: 1rem;
		--foxui-list-item__subtitle---text-transform: none;
	}
</style>
