<template>
	<component
			:is="tag"
			:class="badgeClasses"
			:style="badgeStyles"
			v-bind="restAttrs"
			@mouseenter="handleMouseenter"
			@mouseleave="handleMouseleave"
	>
		<div class="foxy-badge__wrapper">
			<slot name="default"/>

			<foxy-transition :transition="transition">
        <span
		        v-show="modelValue"
		        :id="id"
		        :aria-label="t(label, content)"
		        aria-atomic="true"
		        aria-live="polite"
		        class="foxy-badge__badge"
		        role="status"
		        v-bind="badgeAttrs"
        >
          <template v-if="!dot">
            <slot name="badge">
              <template v-if="hasIcon">
                <foxy-icon :icon="icon"/>
              </template>
              <template v-else>
                {{ content }}
              </template>
            </slot>
          </template>
        </span>
			</foxy-transition>
		</div>
	</component>
</template>

<script
		lang="ts"
		setup
>
	import { FoxyIcon, FoxyScaleRotate, FoxyTransition } from '@foxy/components'

	import {
		useActive,
		useBorder,
		useColorEffect,
		useElevation,
		useHover,
		useLocale,
		useLocation,
		useProps,
		useRounded,
		useStatus,
		useStyle
	} from '@foxy/composables'

	import type { IBadgeProps } from '@foxy/interfaces'
	import type { TTransitionProps } from "@foxy/types"

	import { omit, pick } from '@foxy/utils'

	import { computed, ComputedRef, ref, StyleValue, useAttrs } from 'vue'

	const props = withDefaults(defineProps<IBadgeProps>(), {
		tag: 'div',
		location: 'top right',
		label: 'foxy.badge',
		transition: () => ({component: FoxyScaleRotate}) as unknown as TTransitionProps
	})

	const {filterProps} = useProps<IBadgeProps>(props)
	const {t} = useLocale()

	const attrs = useAttrs()

	const {hoverClasses, isHover, onMouseleave: handleMouseleave, onMouseenter: handleMouseenter} = useHover(props)
	const {activeClasses, isActive} = useActive(props, 'modelValue')
	const {colorStyles, bgColor} = useColorEffect(props, isHover, isActive as unknown as ComputedRef<boolean>)
	const {roundedClasses, roundedStyles} = useRounded(props)
	const {borderClasses, borderStyles} = useBorder(props)
	const {elevationClasses, elevationStyles} = useElevation(props, ref(false), bgColor)
	const {icon, statusClasses} = useStatus(props)
	const {locationStyles} = useLocation(props, true, side => {
		const base = props.floating
				? (props.dot ? 2 : 4)
				: (props.dot ? 8 : 12)

		return base + (
				['top', 'bottom'].includes(side) ? +(props.offsetY ?? 0)
						: ['left', 'right'].includes(side) ? +(props.offsetX ?? 0)
								: 0
		)
	})

	const hasIcon = computed(() => {
		return !!icon.value
	})

	const content = computed(() => {
		const value = Number(props.content)

		if (!props.max || isNaN(value)) {
			return props.content
		} else if (value <= +props.max) {
			return value
		}

		return `${props.max}+`
	})

	const badgeAttrs = computed(() => {
		return pick(attrs as Record<string, any>, [
			'aria-atomic',
			'aria-label',
			'aria-live',
			'role',
			'title'
		])
	})
	const restAttrs = computed(() => {
		return omit(attrs as Record<string, any>, [
			'aria-atomic',
			'aria-label',
			'aria-live',
			'role',
			'title'
		])
	})

	// CLASS & STYLES

	const badgeStyles = computed(() => {
		return [
			props.style
		] as StyleValue
	})
	const badgeClasses = computed(() => {
		return [
			'foxy-badge',
			{
				'foxy-badge--dot': props.dot,
				'foxy-badge--floating': props.floating,
				'foxy-badge--inline': props.inline
			},
			elevationClasses.value,
			activeClasses.value,
			hoverClasses.value,
			roundedClasses.value,
			borderClasses.value,
			statusClasses.value,
			props.class
		]
	})

	const badgeContentStyles = computed(() => {
		return [
			elevationStyles.value,
			colorStyles.value,
			roundedStyles.value,
			borderStyles.value,
			props.inline ? {} : locationStyles.value
		] as StyleValue
	})

	const {id, css, load, isLoaded, unload} = useStyle(badgeContentStyles)

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
	.foxy-badge {
		$this: &;

		display: inline-flex;
		line-height: 1;

		&__badge {
			align-items: center;
			justify-content: center;
			display: inline-flex;

			position: var(--foxy-badge__badge---position);
			pointer-events: var(--foxy-badge__badge---pointer-events);
			transition: var(--foxy-badge__badge---transition);

			border-width: var(--foxy-badge__badge---border-width);
			border-style: var(--foxy-badge__badge---border-style);
			border-color: var(--foxy-badge__badge---border-color);
			border-radius: var(--foxy-badge__badge---border-radius);

			font-size: var(--foxy-badge__badge---font-size);
			font-weight: var(--foxy-badge__badge---font-weight);
			text-align: var(--foxy-badge__badge---text-align);
			text-indent: var(--foxy-badge__badge---text-indent);
			white-space: var(--foxy-badge__badge---white-space);

			height: var(--foxy-badge__badge---height);
			min-width: var(--foxy-badge__badge---min-width);

			padding-block-start: var(--foxy-badge__badge---padding-block-start);
			padding-block-end: var(--foxy-badge__badge---padding-block-end);
			padding-inline-start: var(--foxy-badge__badge---padding-inline-start);
			padding-inline-end: var(--foxy-badge__badge---padding-inline-end);
			margin-block-start: var(--foxy-badge__badge---margin-block-start);
			margin-block-end: var(--foxy-badge__badge---margin-block-end);
			margin-inline-start: var(--foxy-badge__badge---margin-inline-start);
			margin-inline-end: var(--foxy-badge__badge---margin-inline-end);

			background-color: var(--foxy-badge__badge---background-color);
			color: var(--foxy-badge__badge---color);

			:deep(.foxy-icon) {
				color: inherit;
				font-size: 0.75rem;
				margin: 0 -2px;
			}

			:deep(img),
			:deep(.foxy-img) {
				height: 100%;
				width: 100%;
			}
		}

		&__wrapper {
			position: relative;

			display: var(--foxy-badge__wrapper---display);
			align-items: var(--foxy-badge__wrapper---align-items);
			justify-content: var(--foxy-badge__wrapper---justify-content);

			padding-block-start: var(--foxy-badge__wrapper---padding-block-start);
			padding-block-end: var(--foxy-badge__wrapper---padding-block-end);
			padding-inline-start: var(--foxy-badge__wrapper---padding-inline-start);
			padding-inline-end: var(--foxy-badge__wrapper---padding-inline-end);
			margin-block-start: var(--foxy-badge__wrapper---margin-block-start);
			margin-block-end: var(--foxy-badge__wrapper---margin-block-end);
			margin-inline-start: var(--foxy-badge__wrapper---margin-inline-start);
			margin-inline-end: var(--foxy-badge__wrapper---margin-inline-end);
		}

		&--elevated {
			#{$this}__badge {
				--foxy-badge__badge---box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
			}
		}

		&--border {
			#{$this}__badge {
				--foxy-badge__badge---border-width: 2px;
			}
		}

		&--dot {
			#{$this}__badge {
				--foxy-badge__badge---border-width: 1.5px;
				--foxy-badge__badge---border-radius: 4.5px;
				--foxy-badge__badge---height: 9px;
				--foxy-badge__badge---width: 9px;
				--foxy-badge__badge---min-width: 0;
				--foxy-badge__badge---padding-block: 0;
				--foxy-badge__badge---padding-inline: 0;
				--foxy-badge__badge---text-indent: -9999px;
			}
		}

		&--inline {
			#{$this}__badge {
				--foxy-badge__badge---position: relative;
				vertical-align: middle;
			}

			#{$this}__wrapper {
				--foxy-badge__wrapper---display: inline-flex;
				--foxy-badge__wrapper---align-items: center;
				--foxy-badge__wrapper---justify-content: center;
				--foxy-badge__wrapper---margin-inline: 4px;
			}
		}

		&--warning {
			--foxy-badge__badge---background-color: var(--foxy-status--warning---background-color, rgb(251, 140, 0));
			--foxy-badge__badge---color: var(--foxy-status--warning---color, #ffffff);
		}

		&--success {
			--foxy-badge__badge---background-color: var(--foxy-status--success---background-color, rgb(76, 175, 80));
			--foxy-badge__badge---color: var(--foxy-status--success---color, #ffffff);
		}

		&--info {
			--foxy-badge__badge---background-color: var(--foxy-status--info---background-color, rgb(33, 150, 243));
			--foxy-badge__badge---color: var(--foxy-status--info---color, #ffffff);
		}

		&--error {
			--foxy-badge__badge---background-color: var(--foxy-status--error---background-color, rgb(207, 102, 121));
			--foxy-badge__badge---color: var(--foxy-status--error---color, #ffffff);
		}
	}
</style>

<style>
	:root {
		--foxy-badge__wrapper---display: flex;
		--foxy-badge__wrapper---align-items: stretch;
		--foxy-badge__wrapper---justify-content: start;
		--foxy-badge__wrapper---margin-inline-start: 0;
		--foxy-badge__wrapper---margin-inline-end: 0;
		--foxy-badge__wrapper---margin-block-start: 0;
		--foxy-badge__wrapper---margin-block-end: 0;
		--foxy-badge__wrapper---padding-block-start: 0;
		--foxy-badge__wrapper---padding-block-end: 0;
		--foxy-badge__wrapper---padding-inline-start: 0;
		--foxy-badge__wrapper---padding-inline-end: 0;

		--foxy-badge__badge---align-items: center;
		--foxy-badge__badge---justify-content: center;
		--foxy-badge__badge---display: inline-flex;
		--foxy-badge__badge---position: absolute;
		--foxy-badge__badge---font-size: 0.75rem;
		--foxy-badge__badge---font-weight: 500;
		--foxy-badge__badge---text-align: center;
		--foxy-badge__badge---text-indent: 0;
		--foxy-badge__badge---white-space: nowrap;
		--foxy-badge__badge---height: 1.25rem;
		--foxy-badge__badge---min-width: 20px;
		--foxy-badge__badge---pointer-events: auto;
		--foxy-badge__badge---transition-duration: 0.225s;
		--foxy-badge__badge---transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		--foxy-badge__badge---transition-property: all;
		--foxy-badge__badge---transition: var(--foxy-badge__badge---transition-property) var(--foxy-badge__badge---transition-duration) var(--foxy-badge__badge---transition-timing-function);
		--foxy-badge__badge---margin-inline-start: 0;
		--foxy-badge__badge---margin-inline-end: 0;
		--foxy-badge__badge---margin-block-start: 0;
		--foxy-badge__badge---margin-block-end: 0;
		--foxy-badge__badge---padding-block-start: 4px;
		--foxy-badge__badge---padding-block-end: 4px;
		--foxy-badge__badge---padding-inline-start: 6px;
		--foxy-badge__badge---padding-inline-end: 6px;
		--foxy-badge__badge---color: rgba(30, 30, 30, 0.87);
		--foxy-badge__badge---background-color: rgb(230, 230, 230);
		--foxy-badge__badge---border-top-width: 0;
		--foxy-badge__badge---border-left-width: 0;
		--foxy-badge__badge---border-bottom-width: 0;
		--foxy-badge__badge---border-right-width: 0;
		--foxy-badge__badge---border-width: var(--foxy-badge__badge---border-top-width) var(--foxy-badge__badge---border-left-width) var(--foxy-badge__badge---border-bottom-width) var(--foxy-badge__badge---border-right-width);
		--foxy-badge__badge---border-color: currentColor;
		--foxy-badge__badge---border-style: solid;
		--foxy-badge__badge---border-radius: 10px;
	}
</style>
