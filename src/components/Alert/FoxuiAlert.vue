<template>
	<component
			:is="tag"
			:id="id"
			:class="alertClasses"
			role="alert"
			@mouseenter="handleMouseenter"
			@mouseleave="handleMouseleave"
	>
    <span
		    key="underlay"
		    class="foxui-alert__underlay"
    />

		<slot name="wrapper">
			<template v-if="hasPrepend">
				<div
						key="prepend"
						class="foxui-alert__prepend"
						@click="handleClickPrepend"
				>
					<slot name="prepend">
						<foxui-avatar
								v-if="prependAvatar"
								key="prepend-avatar"
								:density="density"
								:image="prependAvatar"
								:size="size"
						/>
						<foxui-icon
								v-if="prependIcon"
								key="prepend-icon"
								:density="density"
								:icon="prependIcon"
								:size="size"
						/>
					</slot>
				</div>
			</template>

			<div class="foxui-alert__content">
				<div
						v-if="hasHeader"
						class="foxui-alert__header"
				>
					<template v-if="hasIcon">
						<foxui-icon
								key="content-icon"
								:icon="icon as TIcon"
								:size="size"
						/>
					</template>
					<template v-if="hasTitle">
						<span class="foxui-alert__title">
							<slot name="title">{{ title }}</slot>
						</span>
					</template>
				</div>

				<div class="foxui-alert__body">
					<slot name="text">{{ text }}</slot>
				</div>

				<slot name="default"/>
			</div>

			<template v-if="hasAppend">
				<div
						key="append"
						class="foxui-alert__append"
						@click="handleClickAppend"
				>
					<slot name="append">
						<foxui-avatar
								v-if="appendAvatar"
								key="append-avatar"
								:density="density"
								:image="appendAvatar"
								:size="size"
						/>
						<foxui-icon
								v-if="appendIcon"
								key="append-icon"
								:density="density"
								:icon="appendIcon"
								:size="size"
						/>
					</slot>
				</div>
			</template>
		</slot>

		<div
				v-if="hasClose"
				key="close"
				class="foxui-alert__close"
		>
			<slot name="close">
				<foxui-btn
						key="close-btn"
						:aria-label="t(closeLabel)"
						:icon="closeIcon"
						data-cy="close"
						size="x-small"
						@click="handleClose"
				/>
			</slot>
		</div>
	</component>
</template>

<script
		lang="ts"
		setup
>
	import { FoxuiAvatar, FoxuiBtn, FoxuiIcon } from '@foxui/components'

	import {
		useActive,
		useAdjacent,
		useBorder,
		useColorEffect,
		useDensity,
		useDimension,
		useElevation,
		useHover,
		useLocale,
		useLocation,
		useMargin,
		usePadding,
		usePosition,
		useProps,
		useRounded,
		useStatus
	} from '@foxui/composables'
	import { useStyle } from "@foxui/composables/Commons/style.composable.ts"

	import { DENSITY, MDI_ICONS } from '@foxui/enums'

	import type { IAlertProps } from '@foxui/interfaces'
	import type { TIcon } from "@foxui/types"

	import type { ComputedRef, StyleValue } from 'vue'
	import { computed, ref, useSlots } from 'vue'

	const props = withDefaults(defineProps<IAlertProps>(), {
		tag: 'div',
		density: DENSITY.DEFAULT,
		closeIcon: MDI_ICONS.CLOSE,
		closeLabel: 'foxui.close',
		modelValue: true,
		hover: true
	})

	const emits = defineEmits(['click:close', 'update:modelValue', 'update:hover'])

	const {filterProps} = useProps<IAlertProps>(props)
	const {t} = useLocale()

	const slots = useSlots()

	const {activeClasses, isActive, onActive} = useActive(props, 'modelValue')
	const {isHover, onMouseenter: handleMouseenter, onMouseleave: handleMouseleave, hoverClasses} = useHover(props)
	const {colorStyles, bgColor} = useColorEffect(props, isHover, isActive as unknown as ComputedRef<boolean>)
	const {densityClasses} = useDensity(props)
	const {borderStyles, borderClasses} = useBorder(props)
	const {paddingClasses, paddingStyles} = usePadding(props)
	const {marginClasses, marginStyles} = useMargin(props)
	const {dimensionStyles} = useDimension(props)
	const {elevationClasses, elevationStyles} = useElevation(props, ref(false), bgColor)
	const {locationStyles} = useLocation(props)
	const {positionClasses, positionStyles} = usePosition(props)
	const {roundedClasses, roundedStyles} = useRounded(props)
	const {icon, prependIcon, appendIcon, statusClasses} = useStatus(props)

	const {
		onClickPrepend: handleClickPrepend,
		onClickAppend: handleClickAppend,
		hasAppend,
		hasPrepend
	} = useAdjacent(props, prependIcon, appendIcon)

	const handleClose = (e: MouseEvent) => {
		onActive()

		emits('click:close', e)
	}
	const size = computed(() => {
		return props.prominent ? 44 : 28
	})

	// SLOTS

	const hasIcon = computed(() => {
		return !!(props.icon || props.status)
	})
	const hasTitle = computed(() => {
		return !!(slots.title || props.title)
	})
	const hasHeader = computed(() => {
		return hasTitle.value || hasIcon.value
	})
	const hasClose = computed(() => {
		return slots.close || props.closable
	})

	// CLASS & STYLES

	const alertStyles = computed(() => {
		return [
			dimensionStyles.value,
			colorStyles.value,
			locationStyles.value,
			borderStyles.value,
			paddingStyles.value,
			marginStyles.value,
			roundedStyles.value,
			positionStyles.value,
			elevationStyles.value,
			props.style
		] as StyleValue
	})
	const alertClasses = computed(() => {
		return [
			'foxui-alert',
			{
				'foxui-alert--prominent': props.prominent
			},
			hoverClasses.value,
			activeClasses.value,
			statusClasses.value,
			densityClasses.value,
			borderClasses.value,
			paddingClasses.value,
			marginClasses.value,
			elevationClasses.value,
			positionClasses.value,
			roundedClasses.value,
			props.class
		]
	})

	const {id, css, load, isLoaded, unload} = useStyle(alertStyles)

	// EXPOSE

	defineExpose({
		filterProps,
		css,
		id,
		load,
		unload,
		isLoaded
	})
</script>

<style
		lang="scss"
		scoped
>
	.foxui-alert {
		$this: &;

		display: grid;
		flex: 1 1;
		grid-template-areas: "prepend content append close" ". content . .";
		grid-template-columns: max-content auto max-content max-content;
		overflow: hidden;
		position: var(--foxui-alert---position);

		padding-block-start: calc(var(--foxui-alert---padding-block-start) - var(--foxui-alert---density));
		padding-block-end: calc(var(--foxui-alert---padding-block-end) - var(--foxui-alert---density));
		padding-inline-start: calc(var(--foxui-alert---padding-inline-start) - var(--foxui-alert---density));
		padding-inline-end: calc(var(--foxui-alert---padding-inline-end) - var(--foxui-alert---density));
		margin-block-start: var(--foxui-alert---margin-block-start);
		margin-block-end: var(--foxui-alert---margin-block-end);
		margin-inline-start: var(--foxui-alert---margin-inline-start);
		margin-inline-end: var(--foxui-alert---margin-inline-end);

		border-width: var(--foxui-alert---border-width);
		border-style: var(--foxui-alert---border-style);
		border-color: var(--foxui-alert---border-color);
		border-radius: var(--foxui-alert---border-radius);

		background-color: var(--foxui-alert---background-color);
		color: var(--foxui-alert---color);

		&--elevated {
			box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
		}

		&--border {
			&#{$this}--border-left {
				--foxui-alert---border-left-width: calc(24px - var(--foxui-alert---density));

				#{$this}__underlay {
					--foxui-alert__underlay---border-top-left-radius: 0;
					--foxui-alert__underlay---border-bottom-left-radius: 0;
				}
			}

			&#{$this}--border-right {
				--foxui-alert---border-right-width: calc(24px - var(--foxui-alert---density));

				#{$this}__underlay {
					--foxui-alert__underlay---border-top-right-radius: 0;
					--foxui-alert__underlay---border-bottom-right-radius: 0;
				}
			}

			&#{$this}--border-top {
				--foxui-alert---border-top-width: calc(24px - var(--foxui-alert---density));

				#{$this}__underlay {
					--foxui-alert__underlay---border-top-left-radius: 0;
					--foxui-alert__underlay---border-top-right-radius: 0;
				}
			}

			&#{$this}--border-bottom {
				--foxui-alert---border-bottom-width: calc(24px - var(--foxui-alert---density));

				#{$this}__underlay {
					--foxui-alert__underlay---border-bottom-left-radius: 0;
					--foxui-alert__underlay---border-bottom-right-radius: 0;
				}
			}
		}

		&--rounded {
			--foxui-alert---border-radius: 4px;
		}

		&--density-comfortable {
			--foxui-alert---density: 8px;
		}

		&--density-default {
			--foxui-alert---density: 0px;
		}

		&--density-compact {
			--foxui-alert---density: 8px;
		}

		&--warning {
			--foxui-alert---background-color: var(--foxui-status--warning---background-color, rgb(251, 140, 0));
			--foxui-alert---color: var(--foxui-status--warning---color, #ffffff);
		}

		&--success {
			--foxui-alert---background-color: var(--foxui-status--success---background-color, rgb(76, 175, 80));
			--foxui-alert---color: var(--foxui-status--success---color, #ffffff);
		}

		&--info {
			--foxui-alert---background-color: var(--foxui-status--info---background-color, rgb(33, 150, 243));
			--foxui-alert---color: var(--foxui-status--info---color, #ffffff);
		}

		&--error {
			--foxui-alert---background-color: var(--foxui-status--error---background-color, rgb(207, 102, 121));
			--foxui-alert---color: var(--foxui-status--error---color, #ffffff);
		}

		&--absolute {
			--foxui-alert---position: absolute;
		}

		&--fixed {
			--foxui-alert---position: fixed;
		}

		&--sticky {
			--foxui-alert---position: sticky;
		}

		&--relative {
			--foxui-alert---position: relative;
		}

		&--prominent {
			grid-template-areas: "prepend content append close" "prepend content . .";

			#{$this}__prepend {
				--foxui-alert__prepend---align-self: center;
			}
		}

		&__close {
			align-self: flex-start;
			flex: 0 1 auto;
			grid-area: close;
			padding-block-start: var(--foxui-alert__close---padding-block-start);
			padding-block-end: var(--foxui-alert__close---padding-block-end);
			padding-inline-start: var(--foxui-alert__close---padding-inline-start);
			padding-inline-end: var(--foxui-alert__close---padding-inline-end);
			margin-block-start: var(--foxui-alert__close---margin-block-start);
			margin-block-end: var(--foxui-alert__close---margin-block-end);
			margin-inline-start: calc(var(--foxui-alert__close---margin-inline-start) - var(--foxui-alert---density));
			margin-inline-end: var(--foxui-alert__close---margin-inline-end);
		}

		&__content {
			align-self: center;
			grid-area: content;
			overflow: hidden;
		}

		&__append {
			align-self: flex-start;
			display: flex;
			grid-area: append;
			align-items: var(--foxui-alert__append---align-items);
			padding-block-start: var(--foxui-alert__append---padding-block-start);
			padding-block-end: var(--foxui-alert__append---padding-block-end);
			padding-inline-start: var(--foxui-alert__append---padding-inline-start);
			padding-inline-end: var(--foxui-alert__append---padding-inline-end);
			margin-block-start: var(--foxui-alert__append---margin-block-start);
			margin-block-end: var(--foxui-alert__append---margin-block-end);
			margin-inline-start: calc(var(--foxui-alert__append---margin-inline-start) - var(--foxui-alert---density));
			margin-inline-end: var(--foxui-alert__append---margin-inline-end);
		}

		&__prepend {
			align-self: flex-start;
			display: flex;
			grid-area: prepend;
			align-items: var(--foxui-alert__prepend---align-items);
			padding-block-start: var(--foxui-alert__prepend---padding-block-start);
			padding-block-end: var(--foxui-alert__prepend---padding-block-end);
			padding-inline-start: var(--foxui-alert__prepend---padding-inline-start);
			padding-inline-end: var(--foxui-alert__prepend---padding-inline-end);
			margin-block-start: var(--foxui-alert__prepend---margin-block-start);
			margin-block-end: var(--foxui-alert__prepend---margin-block-end);
			margin-inline-start: var(--foxui-alert__prepend---margin-inline-start);
			margin-inline-end: calc(var(--foxui-alert__prepend---margin-inline-end) - var(--foxui-alert---density));
		}

		&__underlay {
			grid-area: none;
			position: absolute;
			border-radius: var(--foxui-alert__underlay---border-radius)
		}

		&__title {
			align-self: center;
			display: flex;
			align-items: var(--foxui-alert__title---align-items);
			font-size: var(--foxui-alert__title---font-size);
			font-weight: var(--foxui-alert__title---font-weight);
			hyphens: var(--foxui-alert__title---hyphens);
			letter-spacing: var(--foxui-alert__title---letter-spacing);
			line-height: var(--foxui-alert__title---line-height);
			overflow-wrap: var(--foxui-alert__title---overflow-wrap);
			text-transform: var(--foxui-alert__title---text-transform);
			word-break: var(--foxui-alert__title---word-break);
			word-wrap: var(--foxui-alert__title---word-wrap);
		}
	}

</style>

<style>
	:root {
		--foxui-alert---border-top-width: 0;
		--foxui-alert---border-left-width: 0;
		--foxui-alert---border-bottom-width: 0;
		--foxui-alert---border-right-width: 0;
		--foxui-alert---border-width: var(--foxui-alert---border-top-width) var(--foxui-alert---border-left-width) var(--foxui-alert---border-bottom-width) var(--foxui-alert---border-right-width);
		--foxui-alert---border-color: transparent;
		--foxui-alert---border-style: solid;
		--foxui-alert---border-radius: 0px;
		--foxui-alert---color: rgba(30, 30, 30, 0.87);
		--foxui-alert---background-color: rgb(230, 230, 230);
		--foxui-alert---position: static;
		--foxui-alert---margin-inline-start: 0;
		--foxui-alert---margin-inline-end: 0;
		--foxui-alert---margin-block-start: 0;
		--foxui-alert---margin-block-end: 0;
		--foxui-alert---padding-block-start: 16px;
		--foxui-alert---padding-block-end: 16px;
		--foxui-alert---padding-inline-start: 16px;
		--foxui-alert---padding-inline-end: 16px;

		--foxui-alert__prepend---align-items: center;
		--foxui-alert__prepend---margin-inline-start: 0;
		--foxui-alert__prepend---margin-inline-end: 16px;
		--foxui-alert__prepend---margin-block-start: 0;
		--foxui-alert__prepend---margin-block-end: 0;
		--foxui-alert__prepend---padding-block-start: 0;
		--foxui-alert__prepend---padding-block-end: 0;
		--foxui-alert__prepend---padding-inline-start: 0;
		--foxui-alert__prepend---padding-inline-end: 0;

		--foxui-alert__append---align-items: center;
		--foxui-alert__append---margin-inline-start: 16px;
		--foxui-alert__append---margin-inline-end: 0;
		--foxui-alert__append---margin-block-start: 0;
		--foxui-alert__append---margin-block-end: 0;
		--foxui-alert__append---padding-block-start: 0;
		--foxui-alert__append---padding-block-end: 0;
		--foxui-alert__append---padding-inline-start: 0;
		--foxui-alert__append---padding-inline-end: 0;

		--foxui-alert__close---margin-inline-start: 16px;
		--foxui-alert__close---margin-inline-end: 0;
		--foxui-alert__close---margin-block-start: 0;
		--foxui-alert__close---margin-block-end: 0;
		--foxui-alert__close---padding-block-start: 0;
		--foxui-alert__close---padding-block-end: 0;
		--foxui-alert__close---padding-inline-start: 0;
		--foxui-alert__close---padding-inline-end: 0;

		--foxui-alert__title---align-items: center;
		--foxui-alert__title---font-size: 1.25rem;
		--foxui-alert__title---font-weight: 500;
		--foxui-alert__title---hyphens: auto;
		--foxui-alert__title---letter-spacing: 0.0125em;
		--foxui-alert__title---line-height: 1.75rem;
		--foxui-alert__title---overflow-wrap: normal;
		--foxui-alert__title---text-transform: none;
		--foxui-alert__title---word-break: normal;
		--foxui-alert__title---word-wrap: break-word;

		--foxui-alert__underlay---border-radius: 4px;
	}
</style>
