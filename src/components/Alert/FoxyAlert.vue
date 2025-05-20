<template>
	<component
			:is="tag"
			:id="id"
			:class="alertClasses"
			:data-elevation="elevation"
			role="alert"
			@mouseenter="handleMouseenter"
			@mouseleave="handleMouseleave"
	>
    <span
		    key="underlay"
		    class="foxy-alert__underlay"
    />

		<slot name="wrapper">
			<div
					v-if="hasPrepend"
					key="prepend"
					class="foxy-alert__prepend"
			>
				<slot name="prepend">
					<foxy-icon
							v-if="hasIcon"
							key="prepend-icon"
							:icon="icon"
							:size="iconSize"
					/>
				</slot>
			</div>

			<div class="foxy-alert__content">
				<div
						v-if="hasTitle"
						class="foxy-alert__title"
				>
					<slot name="title">{{ title }}</slot>
				</div>

				<div class="foxy-alert__body">
					<slot name="text">{{ text }}</slot>
				</div>

				<slot name="default"/>
			</div>

			<div
					v-if="hasAppend"
					key="append"
					class="foxy-alert__append"
			>
				<slot name="append"/>
			</div>
		</slot>

		<div
				v-if="hasClose"
				key="close"
				class="foxy-alert__close"
		>
			<slot name="close">
				<foxy-btn
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
	import { FoxyBtn, FoxyIcon } from '@foxy/components'

	import {
		useActive,
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
	} from '@foxy/composables'
	import { useStyle } from "@foxy/composables/Commons/style.composable.ts"

	import { DENSITY, MDI_ICONS } from '@foxy/enums'

	import type { IAlertProps } from '@foxy/interfaces'

	import type { ComputedRef, StyleValue } from 'vue'
	import { computed, ref, useSlots } from 'vue'

	const props = withDefaults(defineProps<IAlertProps>(), {
		tag: 'div',
		density: DENSITY.DEFAULT,
		closeIcon: MDI_ICONS.CLOSE,
		closeLabel: 'foxy.close',
		modelValue: true,
		hover: true
	})

	const emits = defineEmits(['click:close', 'update:modelValue', 'update:hover'])

	const {filterProps} = useProps<IAlertProps>(props)
	const {t} = useLocale()

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
	const {icon, statusClasses} = useStatus(props)
	const slots = useSlots()

	const handleClose = (e: MouseEvent) => {
		onActive()

		emits('click:close', e)
	}
	const iconSize = computed(() => {
		return props.prominent ? 44 : 28
	})

	// SLOTS

	const hasPrepend = computed(() => {
		return !!(slots.prepend || icon.value)
	})
	const hasAppend = computed(() => {
		return slots.append
	})
	const hasTitle = computed(() => {
		return !!(slots.title || props.title)
	})
	const hasClose = computed(() => {
		return slots.close || props.closable
	})
	const hasIcon = computed(() => {
		return !!(props.icon || props.status)
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
			'foxy-alert',
			{
				'foxy-alert--prominent': props.prominent
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
	.foxy-alert {
		$this: &;

		display: grid;
		flex: 1 1;
		grid-template-areas: "prepend content append close" ". content . .";
		grid-template-columns: max-content auto max-content max-content;
		overflow: hidden;
		position: var(--foxy-alert---position);

		padding-block-start: calc(var(--foxy-alert---padding-block-start) - var(--foxy-alert---density));
		padding-block-end: calc(var(--foxy-alert---padding-block-end) - var(--foxy-alert---density));
		padding-inline-start: calc(var(--foxy-alert---padding-inline-start) - var(--foxy-alert---density));
		padding-inline-end: calc(var(--foxy-alert---padding-inline-end) - var(--foxy-alert---density));
		margin-block-start: var(--foxy-alert---margin-block-start);
		margin-block-end: var(--foxy-alert---margin-block-end);
		margin-inline-start: var(--foxy-alert---margin-inline-start);
		margin-inline-end: var(--foxy-alert---margin-inline-end);

		border-width: var(--foxy-alert---border-width);
		border-style: var(--foxy-alert---border-style);
		border-color: var(--foxy-alert---border-color);
		border-radius: var(--foxy-alert---border-radius);

		background-color: var(--foxy-alert---background-color);
		color: var(--foxy-alert---color);

		&--elevated {
			box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
		}

		&--border {
			&#{$this}--border-left {
				--foxy-alert---border-left-width: calc(24px - var(--foxy-alert---density));

				#{$this}__underlay {
					--foxy-alert__underlay---border-top-left-radius: 0;
					--foxy-alert__underlay---border-bottom-left-radius: 0;
				}
			}

			&#{$this}--border-right {
				--foxy-alert---border-right-width: calc(24px - var(--foxy-alert---density));

				#{$this}__underlay {
					--foxy-alert__underlay---border-top-right-radius: 0;
					--foxy-alert__underlay---border-bottom-right-radius: 0;
				}
			}

			&#{$this}--border-top {
				--foxy-alert---border-top-width: calc(24px - var(--foxy-alert---density));

				#{$this}__underlay {
					--foxy-alert__underlay---border-top-left-radius: 0;
					--foxy-alert__underlay---border-top-right-radius: 0;
				}
			}

			&#{$this}--border-bottom {
				--foxy-alert---border-bottom-width: calc(24px - var(--foxy-alert---density));

				#{$this}__underlay {
					--foxy-alert__underlay---border-bottom-left-radius: 0;
					--foxy-alert__underlay---border-bottom-right-radius: 0;
				}
			}
		}

		&--rounded {
			--foxy-alert---border-radius: 4px;
		}

		&--density-default {
			--foxy-alert---density: 0px;
		}

		&--density-compact {
			--foxy-alert---density: 8px;
		}

		&--warning {
			--foxy-alert---background-color: var(--foxy-status--warning---background-color, rgb(251, 140, 0));
			--foxy-alert---color: var(--foxy-status--warning---color, #ffffff);
		}

		&--success {
			--foxy-alert---background-color: var(--foxy-status--success---background-color, rgb(76, 175, 80));
			--foxy-alert---color: var(--foxy-status--success---color, #ffffff);
		}

		&--info {
			--foxy-alert---background-color: var(--foxy-status--info---background-color, rgb(33, 150, 243));
			--foxy-alert---color: var(--foxy-status--info---color, #ffffff);
		}

		&--error {
			--foxy-alert---background-color: var(--foxy-status--error---background-color, rgb(207, 102, 121));
			--foxy-alert---color: var(--foxy-status--error---color, #ffffff);
		}

		&--absolute {
			--foxy-alert---position: absolute;
		}

		&--fixed {
			--foxy-alert---position: fixed;
		}

		&--sticky {
			--foxy-alert---position: sticky;
		}

		&--relative {
			--foxy-alert---position: relative;
		}

		&--prominent {
			grid-template-areas: "prepend content append close" "prepend content . .";

			#{$this}__prepend {
				--foxy-alert__prepend---align-self: center;
			}
		}

		&__close {
			align-self: flex-start;
			flex: 0 1 auto;
			grid-area: close;
			padding-block-start: var(--foxy-alert__close---padding-block-start);
			padding-block-end: var(--foxy-alert__close---padding-block-end);
			padding-inline-start: var(--foxy-alert__close---padding-inline-start);
			padding-inline-end: var(--foxy-alert__close---padding-inline-end);
			margin-block-start: var(--foxy-alert__close---margin-block-start);
			margin-block-end: var(--foxy-alert__close---margin-block-end);
			margin-inline-start: calc(var(--foxy-alert__close---margin-inline-start) - var(--foxy-alert---density));
			margin-inline-end: var(--foxy-alert__close---margin-inline-end);
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
			align-items: var(--foxy-alert__append---align-items);
			padding-block-start: var(--foxy-alert__append---padding-block-start);
			padding-block-end: var(--foxy-alert__append---padding-block-end);
			padding-inline-start: var(--foxy-alert__append---padding-inline-start);
			padding-inline-end: var(--foxy-alert__append---padding-inline-end);
			margin-block-start: var(--foxy-alert__append---margin-block-start);
			margin-block-end: var(--foxy-alert__append---margin-block-end);
			margin-inline-start: calc(var(--foxy-alert__append---margin-inline-start) - var(--foxy-alert---density));
			margin-inline-end: var(--foxy-alert__append---margin-inline-end);
		}

		&__prepend {
			align-self: flex-start;
			display: flex;
			grid-area: prepend;
			align-items: var(--foxy-alert__prepend---align-items);
			padding-block-start: var(--foxy-alert__prepend---padding-block-start);
			padding-block-end: var(--foxy-alert__prepend---padding-block-end);
			padding-inline-start: var(--foxy-alert__prepend---padding-inline-start);
			padding-inline-end: var(--foxy-alert__prepend---padding-inline-end);
			margin-block-start: var(--foxy-alert__prepend---margin-block-start);
			margin-block-end: var(--foxy-alert__prepend---margin-block-end);
			margin-inline-start: var(--foxy-alert__prepend---margin-inline-start);
			margin-inline-end: calc(var(--foxy-alert__prepend---margin-inline-end) - var(--foxy-alert---density));
		}

		&__underlay {
			grid-area: none;
			position: absolute;
			border-radius: var(--foxy-alert__underlay---border-radius)
		}

		&__title {
			align-self: center;
			display: flex;
			align-items: var(--foxy-alert__title---align-items);
			font-size: var(--foxy-alert__title---font-size);
			font-weight: var(--foxy-alert__title---font-weight);
			hyphens: var(--foxy-alert__title---hyphens);
			letter-spacing: var(--foxy-alert__title---letter-spacing);
			line-height: var(--foxy-alert__title---line-height);
			overflow-wrap: var(--foxy-alert__title---overflow-wrap);
			text-transform: var(--foxy-alert__title---text-transform);
			word-break: var(--foxy-alert__title---word-break);
			word-wrap: var(--foxy-alert__title---word-wrap);
		}
	}

</style>

<style>
	:root {
		--foxy-alert---border-top-width: 0;
		--foxy-alert---border-left-width: 0;
		--foxy-alert---border-bottom-width: 0;
		--foxy-alert---border-right-width: 0;
		--foxy-alert---border-width: var(--foxy-alert---border-top-width) var(--foxy-alert---border-left-width) var(--foxy-alert---border-bottom-width) var(--foxy-alert---border-right-width);
		--foxy-alert---border-color: transparent;
		--foxy-alert---border-style: solid;
		--foxy-alert---border-radius: 0px;
		--foxy-alert---color: rgba(30, 30, 30, 0.87);
		--foxy-alert---background-color: rgb(230, 230, 230);
		--foxy-alert---position: static;
		--foxy-alert---margin-inline-start: 0;
		--foxy-alert---margin-inline-end: 0;
		--foxy-alert---margin-block-start: 0;
		--foxy-alert---margin-block-end: 0;
		--foxy-alert---padding-block-start: 16px;
		--foxy-alert---padding-block-end: 16px;
		--foxy-alert---padding-inline-start: 16px;
		--foxy-alert---padding-inline-end: 16px;

		--foxy-alert__prepend---align-items: center;
		--foxy-alert__prepend---margin-inline-start: 0;
		--foxy-alert__prepend---margin-inline-end: 16px;
		--foxy-alert__prepend---margin-block-start: 0;
		--foxy-alert__prepend---margin-block-end: 0;
		--foxy-alert__prepend---padding-block-start: 0;
		--foxy-alert__prepend---padding-block-end: 0;
		--foxy-alert__prepend---padding-inline-start: 0;
		--foxy-alert__prepend---padding-inline-end: 0;

		--foxy-alert__append---align-items: center;
		--foxy-alert__append---margin-inline-start: 16px;
		--foxy-alert__append---margin-inline-end: 0;
		--foxy-alert__append---margin-block-start: 0;
		--foxy-alert__append---margin-block-end: 0;
		--foxy-alert__append---padding-block-start: 0;
		--foxy-alert__append---padding-block-end: 0;
		--foxy-alert__append---padding-inline-start: 0;
		--foxy-alert__append---padding-inline-end: 0;

		--foxy-alert__close---margin-inline-start: 16px;
		--foxy-alert__close---margin-inline-end: 0;
		--foxy-alert__close---margin-block-start: 0;
		--foxy-alert__close---margin-block-end: 0;
		--foxy-alert__close---padding-block-start: 0;
		--foxy-alert__close---padding-block-end: 0;
		--foxy-alert__close---padding-inline-start: 0;
		--foxy-alert__close---padding-inline-end: 0;

		--foxy-alert__title---align-items: center;
		--foxy-alert__title---font-size: 1.25rem;
		--foxy-alert__title---font-weight: 500;
		--foxy-alert__title---hyphens: auto;
		--foxy-alert__title---letter-spacing: 0.0125em;
		--foxy-alert__title---line-height: 1.75rem;
		--foxy-alert__title---overflow-wrap: normal;
		--foxy-alert__title---text-transform: none;
		--foxy-alert__title---word-break: normal;
		--foxy-alert__title---word-wrap: break-word;

		--foxy-alert__underlay---border-radius: 4px;
	}
</style>
