<template>
	<component
			:is="tag"
			:class="badgeClasses"
			:style="badgeStyles"
			v-bind="restAttrs"
			@mouseenter="handleMouseenter"
			@mouseleave="handleMouseleave"
	>
		<div class="origam-badge__wrapper">
			<slot name="default"/>

			<origam-transition :transition="transition">
        <span
		        v-show="modelValue"
		        :id="id"
		        :aria-label="t(label, content)"
		        aria-atomic="true"
		        aria-live="polite"
		        class="origam-badge__badge"
		        role="status"
		        v-bind="badgeAttrs"
        >
          <template v-if="!dot">
            <slot name="badge">
              <template v-if="hasIcon">
                <origam-icon :icon="icon"/>
              </template>
              <template v-else>
                {{ content }}
              </template>
            </slot>
          </template>
        </span>
			</origam-transition>
		</div>
	</component>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamIcon, OrigamScaleRotate, OrigamTransition } from '../../components'

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
	} from '../../composables'

	import type { IBadgeProps } from '../../interfaces'
	import type { TTransitionProps } from "../../types"

	import { omit, pick } from '../../utils'

	import { computed, ComputedRef, ref, StyleValue, useAttrs } from 'vue'

	const props = withDefaults(defineProps<IBadgeProps>(), {
		tag: 'div',
		location: 'top right',
		label: 'origam.badge',
		transition: () => ({component: OrigamScaleRotate}) as unknown as TTransitionProps
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
			'origam-badge',
			{
				'origam-badge--dot': props.dot,
				'origam-badge--floating': props.floating,
				'origam-badge--inline': props.inline
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
	.origam-badge {
		$this: &;

		display: inline-flex;
		line-height: 1;

		&__badge {
			align-items: center;
			justify-content: center;
			display: inline-flex;

			position: var(--origam-badge__badge---position);
			pointer-events: var(--origam-badge__badge---pointer-events);
			transition: var(--origam-badge__badge---transition);

			border-width: var(--origam-badge__badge---border-width);
			border-style: var(--origam-badge__badge---border-style);
			border-color: var(--origam-badge__badge---border-color);
			border-radius: var(--origam-badge__badge---border-radius);

			font-size: var(--origam-badge__badge---font-size);
			font-weight: var(--origam-badge__badge---font-weight);
			text-align: var(--origam-badge__badge---text-align);
			text-indent: var(--origam-badge__badge---text-indent);
			white-space: var(--origam-badge__badge---white-space);

			height: var(--origam-badge__badge---height);
			min-width: var(--origam-badge__badge---min-width);

			padding-block-start: var(--origam-badge__badge---padding-block-start);
			padding-block-end: var(--origam-badge__badge---padding-block-end);
			padding-inline-start: var(--origam-badge__badge---padding-inline-start);
			padding-inline-end: var(--origam-badge__badge---padding-inline-end);
			margin-block-start: var(--origam-badge__badge---margin-block-start);
			margin-block-end: var(--origam-badge__badge---margin-block-end);
			margin-inline-start: var(--origam-badge__badge---margin-inline-start);
			margin-inline-end: var(--origam-badge__badge---margin-inline-end);

			background-color: var(--origam-badge__badge---background-color);
			color: var(--origam-badge__badge---color);

			:deep(.origam-icon) {
				color: inherit;
				font-size: 0.75rem;
				margin: 0 -2px;
			}

			:deep(img),
			:deep(.origam-img) {
				height: 100%;
				width: 100%;
			}
		}

		&__wrapper {
			position: relative;

			display: var(--origam-badge__wrapper---display);
			align-items: var(--origam-badge__wrapper---align-items);
			justify-content: var(--origam-badge__wrapper---justify-content);

			padding-block-start: var(--origam-badge__wrapper---padding-block-start);
			padding-block-end: var(--origam-badge__wrapper---padding-block-end);
			padding-inline-start: var(--origam-badge__wrapper---padding-inline-start);
			padding-inline-end: var(--origam-badge__wrapper---padding-inline-end);
			margin-block-start: var(--origam-badge__wrapper---margin-block-start);
			margin-block-end: var(--origam-badge__wrapper---margin-block-end);
			margin-inline-start: var(--origam-badge__wrapper---margin-inline-start);
			margin-inline-end: var(--origam-badge__wrapper---margin-inline-end);
		}

		&--elevated {
			#{$this}__badge {
				--origam-badge__badge---box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
			}
		}

		&--border {
			#{$this}__badge {
				--origam-badge__badge---border-width: 2px;
			}
		}

		&--dot {
			#{$this}__badge {
				--origam-badge__badge---border-width: 1.5px;
				--origam-badge__badge---border-radius: 4.5px;
				--origam-badge__badge---height: 9px;
				--origam-badge__badge---width: 9px;
				--origam-badge__badge---min-width: 0;
				--origam-badge__badge---padding-block: 0;
				--origam-badge__badge---padding-inline: 0;
				--origam-badge__badge---text-indent: -9999px;
			}
		}

		&--inline {
			#{$this}__badge {
				--origam-badge__badge---position: relative;
				vertical-align: middle;
			}

			#{$this}__wrapper {
				--origam-badge__wrapper---display: inline-flex;
				--origam-badge__wrapper---align-items: center;
				--origam-badge__wrapper---justify-content: center;
				--origam-badge__wrapper---margin-inline: 4px;
			}
		}

		&--warning {
			--origam-badge__badge---background-color: var(--origam-status--warning---background-color, rgb(251, 140, 0));
			--origam-badge__badge---color: var(--origam-status--warning---color, #ffffff);
		}

		&--success {
			--origam-badge__badge---background-color: var(--origam-status--success---background-color, rgb(76, 175, 80));
			--origam-badge__badge---color: var(--origam-status--success---color, #ffffff);
		}

		&--info {
			--origam-badge__badge---background-color: var(--origam-status--info---background-color, rgb(33, 150, 243));
			--origam-badge__badge---color: var(--origam-status--info---color, #ffffff);
		}

		&--error {
			--origam-badge__badge---background-color: var(--origam-status--error---background-color, rgb(207, 102, 121));
			--origam-badge__badge---color: var(--origam-status--error---color, #ffffff);
		}
	}
</style>

<style>
	:root {
		--origam-badge__wrapper---display: flex;
		--origam-badge__wrapper---align-items: stretch;
		--origam-badge__wrapper---justify-content: start;
		--origam-badge__wrapper---margin-inline-start: 0;
		--origam-badge__wrapper---margin-inline-end: 0;
		--origam-badge__wrapper---margin-block-start: 0;
		--origam-badge__wrapper---margin-block-end: 0;
		--origam-badge__wrapper---padding-block-start: 0;
		--origam-badge__wrapper---padding-block-end: 0;
		--origam-badge__wrapper---padding-inline-start: 0;
		--origam-badge__wrapper---padding-inline-end: 0;

		--origam-badge__badge---align-items: center;
		--origam-badge__badge---justify-content: center;
		--origam-badge__badge---display: inline-flex;
		--origam-badge__badge---position: absolute;
		--origam-badge__badge---font-size: 0.75rem;
		--origam-badge__badge---font-weight: 500;
		--origam-badge__badge---text-align: center;
		--origam-badge__badge---text-indent: 0;
		--origam-badge__badge---white-space: nowrap;
		--origam-badge__badge---height: 1.25rem;
		--origam-badge__badge---min-width: 20px;
		--origam-badge__badge---pointer-events: auto;
		--origam-badge__badge---transition-duration: 0.225s;
		--origam-badge__badge---transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		--origam-badge__badge---transition-property: all;
		--origam-badge__badge---transition: var(--origam-badge__badge---transition-property) var(--origam-badge__badge---transition-duration) var(--origam-badge__badge---transition-timing-function);
		--origam-badge__badge---margin-inline-start: 0;
		--origam-badge__badge---margin-inline-end: 0;
		--origam-badge__badge---margin-block-start: 0;
		--origam-badge__badge---margin-block-end: 0;
		--origam-badge__badge---padding-block-start: 4px;
		--origam-badge__badge---padding-block-end: 4px;
		--origam-badge__badge---padding-inline-start: 6px;
		--origam-badge__badge---padding-inline-end: 6px;
		--origam-badge__badge---color: rgba(30, 30, 30, 0.87);
		--origam-badge__badge---background-color: rgb(230, 230, 230);
		--origam-badge__badge---border-top-width: 0;
		--origam-badge__badge---border-left-width: 0;
		--origam-badge__badge---border-bottom-width: 0;
		--origam-badge__badge---border-right-width: 0;
		--origam-badge__badge---border-width: var(--origam-badge__badge---border-top-width) var(--origam-badge__badge---border-left-width) var(--origam-badge__badge---border-bottom-width) var(--origam-badge__badge---border-right-width);
		--origam-badge__badge---border-color: currentColor;
		--origam-badge__badge---border-style: solid;
		--origam-badge__badge---border-radius: 10px;
	}
</style>
