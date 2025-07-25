<template>
	<component
			:is="tag"
			ref="root"
			:class="progressLinearClasses"
			:style="progressLinearStyles"
			@click="clickable && handleClick"
	>
		<div
				v-if="stream"
				key="stream"
				:style="streamStyles"
				class="origam-progress__stream"
		/>
		<div
				:style="backgroundStyles"
				class="origam-progress__background"
		/>

		<origam-transition :transition="transition">
			<div class="origam-progress__loader">
				<template v-if="indeterminate">
					<div
							v-for="bar in ['long', 'short']"
							:key="bar"
							:class="`origam-progress__bar--${bar}`"
							:style="loaderStyles"
							class="origam-progress__bar"
					/>
				</template>
				<template v-else>
					<div
							:style="loaderStyles"
							class="origam-progress__bar"
					/>
				</template>
			</div>
		</origam-transition>

		<div
				v-if="hasContent"
				class="origam-progress__content"
		>
			<slot
					name="default"
					v-bind="{ value: normalizedValue, buffer: normalizedBuffer }"
			/>
		</div>
	</component>
</template>

<script
		lang="ts"
		setup
>
	import { computed, StyleValue, toRef } from 'vue'
	import { OrigamFade, OrigamSlideX, OrigamTransition } from '../../components'

	import {
		useBackgroundColor,
		useIntersectionObserver,
		useLocation,
		useProgress,
		useProps,
		useRounded,
		useRtl
	} from '../../composables'

	import type { IProgressLinearProps } from '../../interfaces'

	import { convertToUnit } from '../../utils'

	const props = withDefaults(defineProps<IProgressLinearProps>(), {
		tag: 'div',
		modelValue: 0,
		max: 100,
		thickness: 4
	})

	const {filterProps} = useProps<IProgressLinearProps>(props)

	const {locationStyles} = useLocation(props)
	const {progressClasses, progressStyles, normalizedValue, thickness, progress, max, hasContent} = useProgress(props)
	const {roundedClasses} = useRounded(props)
	const {intersectionRef} = useIntersectionObserver()
	const {backgroundColorStyles} = useBackgroundColor(toRef(props, 'bgColor'))
	const {backgroundColorStyles: loaderColorStyles} = useBackgroundColor(toRef(props, 'color'))
	const {isRtl, rtlClasses} = useRtl()

	const normalizedBuffer = computed(() => {
		return parseFloat(props.bufferValue as string) / max.value * 100
	})
	const transition = computed(() => {
		return props.indeterminate ? {component: OrigamFade} : {component: OrigamSlideX}
	})
	const isReversed = computed(() => {
		return isRtl.value !== props.reverse
	})

	const handleClick = (e: MouseEvent) => {
		if (!intersectionRef.value) return

		const {left, right, width} = intersectionRef.value.getBoundingClientRect()
		const value = props.reverse ? (width - e.clientX) + (right - width) : e.clientX - left

		progress.value = Math.round(value / width * max.value)
	}

	// CLASS & STYLES

	const progressLinearStyles = computed(() => {
		return [
			{
				'bottom': props.location === 'bottom' ? 0 : undefined,
				'top': props.location === 'top' ? 0 : undefined,
				'height': convertToUnit(thickness.value),
				'line-height': convertToUnit(thickness.value)
			},
			locationStyles.value,
			progressStyles.value,
			props.style
		] as StyleValue
	})
	const progressLinearClasses = computed(() => {
		return [
			'origam-progress--linear',
			{
				'origam-progress--reverse': isReversed.value,
				'origam-progress--rounded': props.rounded
			},
			rtlClasses.value,
			progressClasses.value,
			roundedClasses.value,
			props.class
		]
	})
	const streamStyles = computed(() => {
		return [
			{
				[props.reverse ? 'left' : 'right']: convertToUnit(-thickness.value),
				'border-top-width': convertToUnit(thickness.value / 2),
				top: `calc(50% - ${convertToUnit(thickness.value / 4)})`,
				width: convertToUnit(100 - normalizedBuffer.value, '%'),
				transform: `translateX(${convertToUnit(thickness.value * (props.reverse ? 1 : -1))})`
			}
		] as StyleValue
	})
	const backgroundStyles = computed(() => {
		return [
			backgroundColorStyles.value,
			{
				width: `${convertToUnit((!props.stream ? 100 : normalizedBuffer.value), '%')}`
			}
		]
	})
	const loaderStyles = computed(() => {
		return [
			{
				width: props.indeterminate ? undefined : convertToUnit(normalizedValue.value, '%')
			},
			loaderColorStyles.value
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
	.origam-progress {
		$this: &;

		&--linear {
			background: transparent;
			overflow: hidden;
			position: relative;
			transition: 0.2s cubic-bezier(0.4, 0, 0.2, 1);
			width: 100%;

			#{$this}__background {
				background: currentColor;
				bottom: 0;
				left: 0;
				opacity: 0.5;
				position: absolute;
				top: 0;
				transition-property: width, left, right;
				transition: inherit;
			}

			#{$this}__content {
				align-items: center;
				display: flex;
				height: 100%;
				justify-content: center;
				left: 0;
				pointer-events: none;
				position: absolute;
				top: 0;
				width: 100%;
			}

			#{$this}__loader {
				> * {
					background: currentColor;
				}
			}

			#{$this}__bar {
				height: 100%;
				left: 0;
				position: absolute;
				transition: inherit;
				transition-property: width, left, right;
			}

			&#{$this}--indeterminate {
				#{$this}__bar {
					animation-play-state: paused;
					animation-duration: 2.2s;
					animation-iteration-count: infinite;
					bottom: 0;
					right: auto;
					top: 0;
					width: auto;

					&--long {
						animation-name: indeterminate-ltr;
					}

					&--short {
						animation-name: indeterminate-short-ltr;
					}
				}
			}

			#{$this}__stream {
				animation: stream 0.25s infinite linear;
				animation-play-state: paused;
				bottom: 0;
				left: auto;
				opacity: 0.3;
				pointer-events: none;
				position: absolute;
				transition: inherit;
				transition-property: width, left, right;
			}

			&#{$this}--reverse {
				#{$this}__background,
				#{$this}__loader,
				#{$this}__content {
					left: auto;
					right: 0;
				}

				&#{$this}--indeterminate {
					#{$this}__long,
					#{$this}__short {
						left: auto;
						right: 0;
					}

					#{$this}__long {
						animation-name: indeterminate-rtl;
					}

					#{$this}__short {
						animation-name: indeterminate-short-rtl;
					}
				}

				#{$this}__stream {
					right: auto;
				}
			}

			&#{$this}--absolute,
			&#{$this}--fixed {
				left: 0;
				z-index: 1;
			}

			&#{$this}--absolute {
				position: absolute;
			}

			&#{$this}--fixed {
				position: fixed;
			}

			&#{$this}--rounded {
				border-radius: 9999px;

				#{$this}__loader {
					border-radius: inherit;
				}

				#{$this}__loader,
				#{$this}__stream + #{$this}__background {
					border-radius: 9999px;
				}

				&#{$this}__determinate {
					#{$this}__loader {
						border-start-start-radius: 0;
						border-end-start-radius: 0;
					}
				}
			}

			&#{$this}--active {
				&#{$this}--indeterminate {
					#{$this}__bar {
						animation-play-state: running;
					}
				}

				#{$this}__stream {
					animation-play-state: running;
				}
			}
		}
	}
</style>

<style>
	:root {

	}

	@keyframes indeterminate-ltr {
		0% {
			left: -90%;
			right: 100%;
		}
		60% {
			left: -90%;
			right: 100%;
		}
		100% {
			left: 100%;
			right: -35%;
		}
	}

	@keyframes indeterminate-rtl {
		0% {
			left: 100%;
			right: -90%;
		}
		60% {
			left: 100%;
			right: -90%;
		}
		100% {
			left: -35%;
			right: 100%;
		}
	}

	@keyframes indeterminate-short-ltr {
		0% {
			left: -200%;
			right: 100%;
		}
		60% {
			left: 107%;
			right: -8%;
		}
		100% {
			left: 107%;
			right: -8%;
		}
	}

	@keyframes indeterminate-short-rtl {
		0% {
			left: 100%;
			right: -200%;
		}
		60% {
			left: -8%;
			right: 107%;
		}
		100% {
			left: -8%;
			right: 107%;
		}
	}

	@keyframes stream {
		to {
			transform: translateX(var(--v-progress-linear-stream-to));
		}
	}

	@keyframes progress-linear-stripes {
		0% {
			background-position-x: var(--v-progress-linear-height);
		}
	}
</style>
