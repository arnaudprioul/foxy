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
		    class="origam-list-item__overlay"
    />
		<span
				key="underlay"
				class="origam-list-item__underlay"
		/>

		<slot name="wrapper">
			<div
					v-if="hasPrepend"
					key="prepend"
					class="origam-list-item__prepend"
					@click="handleClickPrepend"
			>
				<slot
						name="prepend"
						v-bind="slotProps"
				>
					<origam-avatar
							v-if="prependAvatar"
							key="prepend-avatar"
							:density="density"
							:image="prependAvatar"
					/>
					<origam-icon
							v-if="prependIcon"
							key="prepend-icon"
							:density="density"
							:icon="prependIcon"
					/>
				</slot>
			</div>

			<div
					class="origam-list-item__content"
					data-no-activator=""
			>
				<div
						v-if="hasTitle"
						key="title"
						class="origam-list-item__title"
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
						class="origam-list-item__subtitle"
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
					class="origam-list-item__append"
					@click="handleClickAppend"
			>
				<slot
						name="append"
						v-bind="slotProps"
				>
					<origam-avatar
							v-if="appendAvatar"
							key="append-avatar"
							:density="density"
							:image="appendAvatar"
					/>
					<origam-icon
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
	import { OrigamAvatar, OrigamIcon } from '@/components'

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
	} from '@/composables'

	import { vRipple } from '@/directives'

	import { KEYBOARD_VALUES } from '@/enums'

	import type { IListItemProps } from '@/interfaces'

	import type { TListItemSlot } from '@/types'

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
			props.lines ? `origam-list-item--${props.lines}-line` : undefined
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
			'origam-list-item',
			{
				'origam-list-item--active': isActive.value,
				'origam-list-item--disabled': props.disabled,
				'origam-list-item--link': isClickable.value,
				'origam-list-item--nav': props.nav,
				'origam-list-item--prepend': !hasPrepend && list && list.hasPrepend.value,
				'origam-list-item--append': !hasAppend && list && list.hasAppend.value,
				'origam-list-item--slim': props.slim,
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
	.origam-list-item {
		$this: &;

		align-items: var(--origam-list-item---align-items);
		display: var(--origam-list-item---display);
		flex: var(--origam-list-item---flex);
		grid-template-areas: var(--origam-list-item---grid-template-areas);
		grid-template-columns: var(--origam-list-item---grid-template-columns);

		max-width: var(--origam-list-item---max-width);
		min-height: calc(var(--origam-list-item---min-height) + var(--origam-list---density));

		text-decoration: var(--origam-list-item---text-decoration);

		outline: var(--origam-list-item---outline);
		position: var(--origam-list-item---position);

		padding-block-start: calc(var(--origam-list-item---padding-block-start) + var(--origam-list---density));
		padding-block-end: calc(var(--origam-list-item---padding-block-end) + var(--origam-list---density));
		padding-inline-start: calc(var(--origam-list-item---padding-inline-start) + var(--origam-list---indent-padding) + var(--origam-list---density));
		padding-inline-end: calc(var(--origam-list-item---padding-inline-end) + var(--origam-list---density));

		margin-block-start: var(--origam-list-item---margin-block-start);
		margin-block-end: var(--origam-list-item---margin-block-end);
		margin-inline-start: var(--origam-list-item---margin-inline-start);
		margin-inline-end: var(--origam-list-item---margin-inline-end);

		border-color: var(--origam-list-item---border-color);
		border-style: var(--origam-list-item---border-style);
		border-width: var(--origam-list-item---border-width);
		border-radius: var(--origam-list-item---border-radius);

		&--border {
			--origam-list-item---border-width: thin;
			--origam-list-item---box-shadow: none;
		}

		&--rounded {
			--origam-list-item---border-radius: 4px;
		}

		&--active {
			#{$this}__prepend,
			#{$this}__append {
				&,
				> .origam-badge {
					.origam-icon {
						--origam-list-item__icon---opacity: 1;
					}
				}
			}
		}

		&--disabled {
			pointer-events: var(--origam-list-item---pointer-events);
			user-select: var(--origam-list-item---user-select);
			opacity: var(--origam-list-item---opacity);
		}

		&--link {
			cursor: var(--origam-list-item---cursor);
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
				--origam-list-item__prepend---align-self: start;
			}

			#{$this}__append {
				--origam-list-item__append---align-self: start;
			}

			#{$this}__subtitle {
				-webkit-line-clamp: 3;
			}
		}

		&--nav {
			--origam-list-item---padding-inline: 8px;

			&:not(:only-child) {
				--origam-list-item---margin-block-end: 4px;
			}

			#{$this}__title {
				--origam-list-item__title---font-size: 0.8125rem;
				--origam-list-item__title---font-weight: 500;
				--origam-list-item__title---letter-spacing: normal;
				--origam-list-item__title---line-height: 1rem;
			}

			#{$this}__subtitle {
				--origam-list-item__subtitle---font-size: 0.75rem;
				--origam-list-item__subtitle---font-weight: 400;
				--origam-list-item__subtitle---letter-spacing: 0.0178571429em;
				--origam-list-item__subtitle---line-height: 1rem;
			}
		}

		&,
		&--active,
		[aria-haspopup=menu][aria-expanded=true] {
			&,
			&:hover,
			&:focus-visible {
				> #{$this}__overlay {
					--origam-list-item__overlay---opacity: calc(0.12 * 1);
				}
			}
		}

		&__overlay {
			background-color: var(--origam-list-item__overlay---background-color);
			border-radius: var(--origam-list-item__overlay---border-radius);
			opacity: var(--origam-list-item__overlay---opacity);
			pointer-events: var(--origam-list-item__overlay---pointer-events);
			position: var(--origam-list-item__overlay---position);
			bottom: var(--origam-list-item__overlay---position-bottom);
			left: var(--origam-list-item__overlay---position-left);
			right: var(--origam-list-item__overlay---position-right);
			top: var(--origam-list-item__overlay---position-top);
			transition-property: var(--origam-list-item__overlay---transition-property);
			transition-duration: var(--origam-list-item__overlay---transition-duration);
			transition-timing-function: var(--origam-list-item__overlay---transition-timing-function);
		}

		&__underlay {
			position: var(--origam-list-item__underlay---position);
		}

		&__prepend,
		&__append {
			&,
			> .origam-badge {
				.origam-icon {
					opacity: var(--origam-list-item__icon---opacity);
				}
			}
		}

		&__prepend {
			align-items: var(--origam-list-item__prepend---align-items);
			align-self: var(--origam-list-item__prepend---align-self);
			display: var(--origam-list-item__prepend---display);
			grid-area: var(--origam-list-item__prepend---grid-area);
			min-width: var(--origam-list-item__prepend---min-width);
			min-height: var(--origam-list-item__prepend---min-height);
		}

		&__append {
			align-items: var(--origam-list-item__append---align-items);
			align-self: var(--origam-list-item__append---align-self);
			display: var(--origam-list-item__append---display);
			grid-area: var(--origam-list-item__append---grid-area);
			min-width: var(--origam-list-item__append---min-width);
			min-height: var(--origam-list-item__append---min-height);
		}

		&__content {
			align-self: var(--origam-list-item__content---align-self);
			grid-area: var(--origam-list-item__content---grid-area);
			overflow: var(--origam-list-item__content---overflow);
		}

		&__title {
			hyphens: var(--origam-list-item__title---hyphens);
			overflow-wrap: var(--origam-list-item__title---overflow-wrap);
			overflow: var(--origam-list-item__title---overflow);
			padding-block-start: var(--origam-list-item__title---padding-block-start);
			padding-block-end: var(--origam-list-item__title---padding-block-end);
			padding-inline-start: var(--origam-list-item__title---padding-inline-start);
			padding-inline-end: var(--origam-list-item__title---padding-inline-end);
			white-space: var(--origam-list-item__title---white-space);
			text-overflow: var(--origam-list-item__title---text-overflow);
			word-break: var(--origam-list-item__title---word-break);
			word-wrap: var(--origam-list-item__title---word-wrap);
			font-size: var(--origam-list-item__title---font-size);
			font-weight: var(--origam-list-item__title---font-weight);
			letter-spacing: var(--origam-list-item__title---letter-spacing);
			line-height: var(--origam-list-item__title---line-height);
			text-transform: var(--origam-list-item__title---text-transform);
		}

		&__subtitle {
			-webkit-box-orient: vertical;
			display: var(--origam-list-item__subtitle---display);
			opacity: var(--origam-list-item__subtitle---opacity);
			overflow: var(--origam-list-item__subtitle---overflow);
			padding-block-start: var(--origam-list-item__subtitle---padding-block-start);
			padding-block-end: var(--origam-list-item__subtitle---padding-block-end);
			padding-inline-start: var(--origam-list-item__subtitle---padding-inline-start);
			padding-inline-end: var(--origam-list-item__subtitle---padding-inline-end);
			text-overflow: var(--origam-list-item__subtitle---text-overflow);
			word-break: var(--origam-list-item__subtitle---word-break);
			font-size: var(--origam-list-item__subtitle---font-size);
			font-weight: var(--origam-list-item__subtitle---font-weight);
			letter-spacing: var(--origam-list-item__subtitle---letter-spacing);
			line-height: var(--origam-list-item__subtitle---line-height);
			text-transform: var(--origam-list-item__subtitle---text-transform);
		}
	}
</style>

<style>
	:root {
		--origam-list-item---align-items: center;
		--origam-list-item---display: grid;
		--origam-list-item---flex: none;
		--origam-list-item---grid-template-areas: "prepend content append";
		--origam-list-item---grid-template-columns: max-content 1fr auto;

		--origam-list-item---max-width: 100%;
		--origam-list-item---min-height: 40px;

		--origam-list-item---text-decoration: none;

		--origam-list-item---border-top-width: 0;
		--origam-list-item---border-left-width: 0;
		--origam-list-item---border-bottom-width: 0;
		--origam-list-item---border-right-width: 0;
		--origam-list-item---border-width: var(--origam-list-item---border-top-width) var(--origam-list-item---border-left-width) var(--origam-list-item---border-bottom-width) var(--origam-list-item---border-right-width);
		--origam-list-item---border-color: rgba(0, 0, 0, 0.87);
		--origam-list-item---border-style: solid;
		--origam-list-item---border-start-start-radius: 0;
		--origam-list-item---border-start-end-radius: 0;
		--origam-list-item---border-end-start-radius: 0;
		--origam-list-item---border-end-end-radius: 0;
		--origam-list-item---border-radius: var(--origam-list-item---border-start-start-radius) var(--origam-list-item---border-start-end-radius) var(--origam-list-item---border-end-start-radius) var(--origam-list-item---border-end-end-radius);

		--origam-list-item---padding-block-start: 8px;
		--origam-list-item---padding-block-end: 8px;
		--origam-list-item---padding-inline-start: 16px;
		--origam-list-item---padding-inline-end: 16px;

		--origam-list-item---margin-block-start: 0;
		--origam-list-item---margin-block-end: 0;
		--origam-list-item---margin-inline-start: 0;
		--origam-list-item---margin-inline-end: 0;

		--origam-list-item---position: relative;
		--origam-list-item---outline: none;

		--origam-list-item---pointer-events: none;
		--origam-list-item---user-select: none;
		--origam-list-item---opacity: 0.6;

		--origam-list-item---cursor: pointer;

		--origam-list-item__overlay---opacity: 0.2;
		--origam-list-item__overlay---background-color: #000;
		--origam-list-item__overlay---border-radius: inherit;
		--origam-list-item__overlay---pointer-events: none;
		--origam-list-item__overlay---position: absolute;
		--origam-list-item__overlay---position-bottom: 0;
		--origam-list-item__overlay---position-left: 0;
		--origam-list-item__overlay---position-right: 0;
		--origam-list-item__overlay---position-top: 0;
		--origam-list-item__overlay---transition-property: opacity;
		--origam-list-item__overlay---transition-duration: 0.2s;
		--origam-list-item__overlay---transition-timing-function: ease-in-out;

		--origam-list-item__underlay---position: absolute;

		--origam-list-item__icon---opacity: 0.87;

		--origam-list-item__prepend---align-items: center;
		--origam-list-item__prepend---align-self: center;
		--origam-list-item__prepend---display: flex;
		--origam-list-item__prepend---grid-area: prepend;
		--origam-list-item__prepend---min-width: 24px;
		--origam-list-item__prepend---min-height: 24px;

		--origam-list-item__append---align-items: center;
		--origam-list-item__append---align-self: center;
		--origam-list-item__append---display: flex;
		--origam-list-item__append---grid-area: append;
		--origam-list-item__append---min-width: 24px;
		--origam-list-item__append---min-height: 24px;

		--origam-list-item__content---align-self: center;
		--origam-list-item__content---grid-area: content;
		--origam-list-item__content---overflow: hidden;

		--origam-list-item__title---hyphens: auto;
		--origam-list-item__title---overflow-wrap: normal;
		--origam-list-item__title---overflow: hidden;

		--origam-list-item__title---padding-block-start: 0;
		--origam-list-item__title---padding-block-end: 0;
		--origam-list-item__title---padding-inline-start: 0;
		--origam-list-item__title---padding-inline-end: 0;

		--origam-list-item__title---white-space: nowrap;
		--origam-list-item__title---text-overflow: ellipsis;
		--origam-list-item__title---word-break: normal;
		--origam-list-item__title---word-wrap: break-word;
		--origam-list-item__title---font-size: 1rem;
		--origam-list-item__title---font-weight: 400;
		--origam-list-item__title---letter-spacing: 0.009375em;
		--origam-list-item__title---line-height: 1.5rem;
		--origam-list-item__title---text-transform: none;

		--origam-list-item__subtitle---display: -webkit-box;
		--origam-list-item__subtitle---opacity: 0.6;
		--origam-list-item__subtitle---overflow: hidden;

		--origam-list-item__subtitle---padding-block-start: 0;
		--origam-list-item__subtitle---padding-block-end: 0;
		--origam-list-item__subtitle---padding-inline-start: 0;
		--origam-list-item__subtitle---padding-inline-end: 0;

		--origam-list-item__subtitle---text-overflow: ellipsis;
		--origam-list-item__subtitle---word-break: break-all;
		--origam-list-item__subtitle---font-size: 0.875rem;
		--origam-list-item__subtitle---font-weight: 400;
		--origam-list-item__subtitle---letter-spacing: 0.0178571429em;
		--origam-list-item__subtitle---line-height: 1rem;
		--origam-list-item__subtitle---text-transform: none;
	}
</style>
