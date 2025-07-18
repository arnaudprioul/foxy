<template>
	<foxui-responsive
			v-intersect="intersect"
			:aria-label="props.alt"
			:aspect-ratio="aspectRatio"
			:class="imgClasses"
			:role="props.alt ? 'img' : undefined"
			:style="imgStyles"
			v-bind="responsiveProps"
	>
		<template #additional>
			<foxui-transition
					:transition="transition"
					appear
			>
				<img
						v-show="isLoaded"
						ref="image"
						:alt="alt"
						:class="imgPictureClasses"
						:crossorigin="crossorigin"
						:draggable="draggable"
						:referrerpolicy="referrerpolicy"
						:sizes="sizes"
						:src="normalisedSrc.src"
						:srcset="normalisedSrc.srcset"
						:style="imgContentStyles"
						@error="handleError"
						@load="handleLoad"
				/>
			</foxui-transition>
			<foxui-transition :transition="transition">
				<img
						v-if="normalisedSrc.lazySrc && !isLoaded"
						:alt="alt"
						:class="imgPictureClasses"
						:crossorigin="crossorigin"
						:draggable="draggable"
						:referrerpolicy="referrerpolicy"
						:src="normalisedSrc.lazySrc"
						:style="imgContentStyles"
				/>
			</foxui-transition>
			<foxui-transition
					:transition="transition"
					appear
			>
				<div
						v-if="(isLoading || (isError && !slots.error)) && slots.placeholder"
						class="foxui-img__placeholder"
				>
					<slot name="placeholder"/>
				</div>
			</foxui-transition>
			<foxui-transition
					:transition="transition"
					appear
			>
				<div
						v-if="isError && slots.error"
						class="foxui-img__error"
				>
					<slot name="error"/>
				</div>
			</foxui-transition>
			<div
					v-if="gradient"
					:style="imgGradientStyles"
					class="foxui-img__gradient"
			/>
		</template>

		<template
				v-if="hasContent"
				#default
		>
			<slot name="default"/>
		</template>
	</foxui-responsive>
</template>

<script
		lang="ts"
		setup
>
	import { FoxuiResponsive, FoxuiTransition } from '@foxui/components'

	import { useBorder, useBothColor, useMargin, usePadding, useProps, useRounded } from '@foxui/composables'

	import { SUPPORTS_INTERSECTION } from '@foxui/consts'

	import { vIntersect } from '@foxui/directives'

	import { IMG_STATE } from '@foxui/enums'

	import type { IImgProps, ISrcObject } from '@foxui/interfaces'

	import type { TImgState } from '@foxui/types'

	import { convertToUnit, getCurrentInstance, pick } from '@foxui/utils'

	import {
		computed,
		nextTick,
		onBeforeMount,
		onBeforeUnmount,
		ref,
		shallowRef,
		StyleValue,
		toRef,
		useSlots,
		watch
	} from 'vue'

	const props = withDefaults(defineProps<IImgProps>(), {})

	const emits = defineEmits(['loadstart', 'load', 'error'])

	const {filterProps} = useProps<IImgProps>(props)

	const {colorStyles} = useBothColor(toRef(props, 'bgColor'), toRef(props, 'color'))
	const {roundedClasses, roundedStyles} = useRounded(props)
	const {borderClasses, borderStyles} = useBorder(props)
	const {paddingClasses, paddingStyles} = usePadding(props)
	const {marginClasses, marginStyles} = useMargin(props)
	const slots = useSlots()

	const vm = getCurrentInstance('FoxuiImg')
	const currentSrc = shallowRef('') // Set from srcset
	const image = ref<HTMLImageElement>()
	const state = shallowRef<TImgState>(props.eager ? IMG_STATE.LOADING : IMG_STATE.IDLE)
	const naturalWidth = shallowRef<number>()
	const naturalHeight = shallowRef<number>()

	const normalisedSrc = computed<ISrcObject>(() => {
		return props.src && typeof props.src === 'object'
				? {
					src: props.src.src,
					srcset: props.srcset || props.src.srcset,
					lazySrc: props.lazySrc || props.src.lazySrc,
					aspectRatio: Number(props.aspectRatio || props.src.aspectRatio || 0)
				} : {
					src: props.src,
					srcset: props.srcset,
					lazySrc: props.lazySrc,
					aspectRatio: Number(props.aspectRatio || 0)
				}
	})
	const aspectRatio = computed(() => {
		return normalisedSrc.value.aspectRatio || naturalWidth.value! / naturalHeight.value! || 0
	})

	const responsiveProps = pick(props, ['aspectRatio', 'contentClass', 'inline', 'height', 'maxHeight', 'maxWidth', 'minHeight', 'minWidth', 'width', 'class', 'style'])

	watch(() => props.src, () => {
		init(state.value !== IMG_STATE.IDLE)
	})
	watch(aspectRatio, (val, oldVal) => {
		if (!val && oldVal && image.value) {
			pollForSize(image.value)
		}
	})

	onBeforeMount(() => init())

	const init = (isIntersecting?: boolean) => {
		if (props.eager && isIntersecting) return
		if (SUPPORTS_INTERSECTION && !isIntersecting && !props.eager) return

		state.value = IMG_STATE.LOADING

		if (normalisedSrc.value.lazySrc) {
			const lazyImg = new Image()
			lazyImg.src = normalisedSrc.value.lazySrc
			pollForSize(lazyImg, null)
		}

		if (!normalisedSrc.value.src) return

		nextTick(() => {
			emits('loadstart', image.value?.currentSrc || normalisedSrc.value.src)

			setTimeout(() => {
				if (vm.isUnmounted) return

				if (image.value?.complete) {
					if (!image.value.naturalWidth) {
						onError()
					}

					if (state.value === IMG_STATE.ERROR) return

					if (!aspectRatio.value) pollForSize(image.value, null)
					if (state.value === IMG_STATE.LOADING) onLoad()
				} else {
					if (!aspectRatio.value) pollForSize(image.value!)
					getSrc()
				}
			})
		})
	}

	const onLoad = () => {
		if (vm.isUnmounted) return

		getSrc()
		pollForSize(image.value!)

		state.value = 'loaded'

		emits('load', image.value?.currentSrc || normalisedSrc.value.src)
	}

	const handleLoad = () => {
		onLoad()
	}

	const onError = () => {
		if (vm.isUnmounted) return

		state.value = 'error'

		emits('error', image.value?.currentSrc || normalisedSrc.value.src)
	}

	const handleError = () => {
		onError()
	}

	const getSrc = () => {
		const img = image.value

		if (img) currentSrc.value = img.currentSrc || img.src
	}

	let timer = -1

	onBeforeUnmount(() => {
		clearTimeout(timer)
	})

	const pollForSize = (img: HTMLImageElement, timeout: number | null = 100) => {
		const poll = () => {
			clearTimeout(timer)
			if (vm.isUnmounted) return

			const {naturalHeight: imgHeight, naturalWidth: imgWidth} = img

			if (imgHeight || imgWidth) {
				naturalWidth.value = imgWidth
				naturalHeight.value = imgHeight
			} else if (!img.complete && state.value === IMG_STATE.LOADING && timeout != null) {
				timer = window.setTimeout(poll, timeout)
			} else if (img.currentSrc.endsWith('.svg') || img.currentSrc.startsWith('data:image/svg+xml')) {
				naturalWidth.value = 1
				naturalHeight.value = 1
			}
		}

		poll()
	}

	const isBooted = shallowRef(false)

	const stop = watch(aspectRatio, (val) => {
		if (val) {
			// Doesn't work with nextTick, idk why
			requestAnimationFrame(() => {
				requestAnimationFrame(() => {
					isBooted.value = true
				})
			})
			stop()
		}
	})

	const intersect = ref([{
		handler: init,
		options: props.options
	}, null, ['once']])

	// STATE

	const isLoaded = computed(() => {
		return state.value === IMG_STATE.LOADED
	})
	const isLoading = computed(() => {
		return state.value === IMG_STATE.LOADING
	})
	const isError = computed(() => {
		return state.value === IMG_STATE.ERROR && !slots.error
	})
	const hasContent = computed(() => {
		return slots.default
	})

	// CLASS & STYLES

	const imgStyles = computed(() => {
		return [
			{'width': convertToUnit(props.width === 'auto' ? naturalWidth.value : props.width)},
			colorStyles.value,
			roundedStyles.value,
			borderStyles.value,
			paddingStyles.value,
			marginStyles.value,
			props.style
		] as StyleValue
	})
	const imgClasses = computed(() => {
		return [
			'foxui-img',
			{'foxui-img--booting': !isBooted.value},
			roundedClasses.value,
			borderClasses.value,
			paddingClasses.value,
			marginClasses.value,
			props.class
		]
	})
	const imgPictureClasses = computed(() => {
		return [
			'foxui-img__picture',
			{
				'foxui-img__picture--cover': props.cover,
				'foxui-img__picture--contain': !props.cover,
				'foxui-img__picture--preload': normalisedSrc.value.lazySrc && !isLoaded.value
			}
		]
	})
	const imgContentStyles = computed(() => {
		return [
			{objectPosition: props.position}
		]
	})
	const imgGradientStyles = computed(() => {
		return [
			`backgroundImage: linear-gradient(${props.gradient})`
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
	.foxui-img {
		$this: &;

		z-index: var(--foxui-img---z-index);

		&--booting {
			&:deep(.foxui-responsive__sizer) {
				transition: var(--foxui-img--booting---transition);
			}
		}

		&--rounded {
			border-radius: var(--foxui-img--rounded---border-radius);
		}

		&__picture {
			z-index: var(--foxui-img__picture---z-index);
			position: var(--foxui-img__picture---position);
			top: var(--foxui-img__picture---top);
			left: var(--foxui-img__picture---left);
			width: var(--foxui-img__picture---width);
			height: var(--foxui-img__picture---height);

			&--preload {
				filter: var(--foxui-img__picture--preload---filter);
			}

			&--contain {
				object-fit: var(--foxui-img__picture--contain---object-fit);
			}

			&--cover {
				object-fit: var(--foxui-img__picture--cover---object-fit);
			}
		}

		&__gradient {
			z-index: var(--foxui-img__gradient---z-index);
			position: var(--foxui-img__gradient---position);
			top: var(--foxui-img__gradient---top);
			left: var(--foxui-img__gradient---left);
			width: var(--foxui-img__gradient---width);
			height: var(--foxui-img__gradient---height);
			background-repeat: var(--foxui-img__gradient---background-repeat);
		}

		&__placeholder {
			z-index: var(--foxui-img__placeholder---z-index);
			position: var(--foxui-img__placeholder---position);
			top: var(--foxui-img__placeholder---top);
			left: var(--foxui-img__placeholder---left);
			width: var(--foxui-img__placeholder---width);
			height: var(--foxui-img__placeholder---height);
		}

		&__error {
			z-index: var(--foxui-img__error---z-index);
			position: var(--foxui-img__error---position);
			top: var(--foxui-img__error---top);
			left: var(--foxui-img__error---left);
			width: var(--foxui-img__error---width);
			height: var(--foxui-img__error---height);
		}
	}
</style>

<style>
	:root {
		--foxui-img---z-index: 0;

		--foxui-img--booting---transition: none;

		--foxui-img--rounded---border-radius: 4px;

		--foxui-img__content---z-index: -1;
		--foxui-img__content---position: absolute;
		--foxui-img__content---top: 0;
		--foxui-img__content---left: 0;
		--foxui-img__content---width: 100%;
		--foxui-img__content---height: 100%;

		--foxui-img__picture---z-index: -1;
		--foxui-img__picture---position: absolute;
		--foxui-img__picture---top: 0;
		--foxui-img__picture---left: 0;
		--foxui-img__picture---width: 100%;
		--foxui-img__picture---height: 100%;

		--foxui-img__picture--preload---filter: blur(4px);

		--foxui-img__picture--contain---object-fit: contain;

		--foxui-img__picture--cover---object-fit: cover;

		--foxui-img__gradient---z-index: -1;
		--foxui-img__gradient---position: absolute;
		--foxui-img__gradient---top: 0;
		--foxui-img__gradient---left: 0;
		--foxui-img__gradient---width: 100%;
		--foxui-img__gradient---height: 100%;
		--foxui-img__gradient---background-repeat: no-repeat;

		--foxui-img__placeholder---z-index: -1;
		--foxui-img__placeholder---position: absolute;
		--foxui-img__placeholder---top: 0;
		--foxui-img__placeholder---left: 0;
		--foxui-img__placeholder---width: 100%;
		--foxui-img__placeholder---height: 100%;

		--foxui-img__error---z-index: -1;
		--foxui-img__error---position: absolute;
		--foxui-img__error---top: 0;
		--foxui-img__error---left: 0;
		--foxui-img__error---width: 100%;
		--foxui-img__error---height: 100%;
	}
</style>
