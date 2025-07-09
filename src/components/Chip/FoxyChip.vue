<template>
	<component
			:is="link.tag"
			v-ripple="rippleProps"
			:class="chipClasses"
			:disabled="props.disabled"
			:draggable="props.draggable"
			:href="link.href"
			:style="chipStyles"
			:tabindex="isClickable ? 0 : undefined"
			@click="handleClick"
			@keydown="isClickable && !isLink && handleKeydown"
	>
    <span
		    v-if="isClickable"
		    key="overlay"
		    class="foxy-chip__overlay"
    />
		<span
				key="underlay"
				class="foxy-chip__underlay"
		/>

		<template v-if="hasFilter">
			<foxy-expand-x key="filter">
				<div
						v-show="isSelected"
						class="foxy-chip__filter"
				>
					<slot
							name="filter"
							v-bind="{filterIcon}"
					>
						<foxy-icon :icon="filterIcon"/>
					</slot>
				</div>
			</foxy-expand-x>
		</template>

		<div
				v-if="hasPrepend"
				key="prepend"
				class="foxy-chip__prepend"
				@click="handleClickPrepend"
		>
			<slot name="prepend">
				<foxy-avatar
						v-if="prependAvatar"
						key="prepend-avatar"
						:density="density"
						:image="prependAvatar"
				/>
				<foxy-icon
						v-if="prependIcon"
						key="prepend-icon"
						:density="density"
						:icon="prependIcon"
				/>
			</slot>
		</div>

		<div
				class="foxy-chip__content"
				data-no-activator=""
		>
			<slot
					name="default"
					v-bind="contentProps"
			>
				{{ text }}
			</slot>
		</div>

		<div
				v-if="hasAppend"
				key="append"
				class="foxy-chip__append"
				@click="handleClickAppend"
		>
			<slot name="append">
				<foxy-avatar
						v-if="appendAvatar"
						key="append-avatar"
						:density="density"
						:image="appendAvatar"
				/>
				<foxy-icon
						v-if="appendIcon"
						key="append-icon"
						:density="density"
						:icon="appendIcon"
				/>
			</slot>
		</div>

		<div
				v-if="hasClose"
				key="close"
				class="foxy-chip__close"
				@click="handleClickClose"
		>
			<slot
					name="close"
					v-bind="{closeIcon}"
			>
				<foxy-icon
						v-if="closeIcon"
						key="close-icon"
						:aria-label="t(closeLabel)"
						:density="density"
						:icon="closeIcon"
						size="x-small"
				/>
			</slot>
		</div>

	</component>
</template>

<script
		lang="ts"
		setup
>
	import { FoxyAvatar, FoxyExpandX, FoxyIcon } from '@foxy/components'

	import {
		useAdjacent,
		useBorder,
		useBothColor,
		useDensity,
		useElevation,
		useGroupItem,
		useLink,
		useLocale,
		useMargin,
		usePadding,
		useProps,
		useRounded,
		useSize,
		useVModel
	} from '@foxy/composables'

	import { FOXY_CHIP_GROUP_KEY } from '@foxy/consts'

	import { vRipple } from '@foxy/directives'

	import { KEYBOARD_VALUES, MDI_ICONS } from '@foxy/enums'

	import type { IChipProps } from '@foxy/interfaces'

	import { computed, StyleValue, toRef, useAttrs, useSlots } from 'vue'

	const props = withDefaults(defineProps<IChipProps>(), {
		tag: 'span',
		closeIcon: MDI_ICONS.CLOSE_CIRCLE_OUTLINE,
		filterIcon: MDI_ICONS.CHECK,
		closeLabel: 'foxy.close',
		modelValue: true
	})

	const emits = defineEmits(['click:close', 'update:modelValue', 'group:selected', 'click', 'click:prepend', 'click:append'])

	const {filterProps} = useProps<IChipProps>(props)

	const {t} = useLocale()

	const attrs = useAttrs()
	const slots = useSlots()

	const {densityClasses} = useDensity(props)
	const {elevationClasses} = useElevation(props)
	const {sizeClasses, sizeStyles} = useSize(props)
	const {roundedClasses, roundedStyles} = useRounded(props)
	const {borderClasses, borderStyles} = useBorder(props)
	const {paddingClasses, paddingStyles} = usePadding(props)
	const {marginStyles, marginClasses} = useMargin(props)
	const {colorStyles} = useBothColor(toRef(props, 'bgColor'), toRef(props, 'color'))

	const isActive = useVModel(props, 'modelValue')
	const group = useGroupItem(props, FOXY_CHIP_GROUP_KEY, false)
	const link = useLink(props, attrs)
	const {
		onClickPrepend: handleClickPrepend,
		onClickAppend: handleClickAppend,
		hasPrepend,
		hasAppend
	} = useAdjacent(props, toRef(props, 'prependIcon'), toRef(props, 'appendIcon'))

	const isLink = computed(() => {
		return props.link && link.isLink.value
	})
	const isClickable = computed(() => {
		return !props.disabled && props.link && (!!group || props.link || link.isClickable.value)
	})
	const rippleProps = computed(() => {
		return [isClickable.value && props.ripple, null]
	})
	const isSelected = computed(() => {
		return !group || group.isSelected.value
	})

	const contentProps = computed(() => {
		return {
			isSelected: group?.isSelected.value,
			selectedClass: group?.selectedClass.value,
			select: group?.select,
			toggle: group?.toggle,
			value: group?.value.value,
			disabled: props.disabled
		}
	})

	const onClick = (e: MouseEvent) => {
		emits('click', e)

		if (!isClickable.value) return

		link.navigate?.(e)
		group?.toggle()
	}

	const handleClickClose = (e: MouseEvent) => {
		e.preventDefault()
		e.stopPropagation()

		isActive.value = false

		emits('click:close', e)
	}
	const handleClick = (e: MouseEvent) => {
		onClick(e)
	}
	const handleKeydown = (e: KeyboardEvent) => {
		if (e.key === KEYBOARD_VALUES.ENTER || e.key === ' ') {
			e.preventDefault()
			onClick(e as any as MouseEvent)
		}
	}

	const hasClose = computed(() => {
		return slots.close || props.closable
	})
	const hasFilter = computed(() => {
		return (slots.filter || props.filter) && group
	})

	// CLASS & STYLES

	const chipStyles = computed(() => {
		return [
			sizeStyles.value,
			roundedStyles.value,
			borderStyles.value,
			paddingStyles.value,
			marginStyles.value,
			colorStyles.value,
			props.style
		] as StyleValue
	})
	const chipClasses = computed(() => {
		return [
			'foxy-chip',
			{
				'foxy-chip--disabled': props.disabled,
				'foxy-chip--label': props.label,
				'foxy-chip--link': isClickable.value,
				'foxy-chip--filter': hasFilter.value,
				'foxy-chip--pill': props.pill
			},
			borderClasses.value,
			roundedClasses.value,
			densityClasses.value,
			elevationClasses.value,
			sizeClasses.value,
			paddingClasses.value,
			marginClasses.value,
			props.class
		]
	})

	// EXPOSE

	defineExpose({
		filterProps
	})
</script>

<style
		lang="scss"
		scoped
>
	.foxy-chip {
		$this: &;

		align-items: center;
		display: inline-flex;
		font-weight: 400;
		max-width: 100%;
		min-width: 0;
		overflow: hidden;
		position: relative;
		text-decoration: none;
		white-space: nowrap;
		vertical-align: middle;
		border-color: currentColor;
		border-style: solid;
		border-width: 0;
		border-radius: 9999px;

		&__content {
			align-items: center;
			display: inline-flex;
			overflow: hidden;
		}

		&__filter,
		&__prepend,
		&__append,
		&__close {
			align-items: center;
			display: inline-flex;
		}

		&__close {
			cursor: pointer;
			flex: 0 1 auto;
			font-size: 18px;
			max-height: 18px;
			max-width: 18px;
			user-select: none;

			.foxy-icon {
				font-size: inherit;
			}
		}

		&__filter {
			transition: 0.15s cubic-bezier(0.4, 0, 0.2, 1);
		}

		&__overlay {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background-color: currentColor;
			border-radius: inherit;
			pointer-events: none;
			opacity: 0;
			transition: opacity 0.2s ease-in-out;
		}

		&--disabled {
			opacity: 0.3;
			pointer-events: none;
			user-select: none;
		}

		&--label {
			border-radius: 4px;
		}

		&--size-x-small {
			font-size: 0.625rem;
			padding: 0 8px;
		}

		&--size-small {
			font-size: 0.75rem;
			padding: 0 10px;
		}

		&--size-default {
			font-size: 0.875rem;
			padding: 0 12px;
		}

		&--size-large {
			font-size: 1rem;
			padding: 0 14px;
		}

		&--size-x-large {
			font-size: 1.125rem;
			padding: 0 17px;
		}

		&--density-default {
			--foxy-chip---density: 0px;
		}

		&--density-compact {
			--foxy-chip---density: -8px;
		}

		&:hover {
			> #{$this}__overlay {
				opacity: 0.24;
			}
		}

		&:focus-visible,
		&:focus {
			> #{$this}__overlay {
				opacity: calc(0.12 * 1);
			}
		}

		&--active,
		&[aria-haspopup=menu][aria-expanded=true] {
			> #{$this}__overlay {
				opacity: calc(0.12 * 1);
			}

			&:hover {
				> #{$this}__overlay {
					opacity: calc(0.04 * 1);
				}
			}

			&:focus-visible,
			&:focus {
				> #{$this}__overlay {
					opacity: calc(0.12 * 1);
				}
			}
		}

		&__underlay {
			position: absolute;
		}

		&--border {
			border-width: thin;
		}

		&--link {
			cursor: pointer;
		}

		&--link,
		&--filter {
			user-select: none;
		}
	}
</style>

<style>
	:root {

	}
</style>
