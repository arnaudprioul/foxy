<template>
	<component
			:is="tag"
			:class="slideGroupClasses"
			:style="slideGroupStyles"
			:tabindex="(isFocused || group.selected.value.length) ? -1 : 0"
			@focus="handleFocus"
	>
		<div
				v-if="hasAffixes"
				key="prev"
				:class="slideGroupPrevClasses"
				@click="handleFocusAffixes"
				@mousedown="hasPrev && scrollTo('prev')"
		>
			>
			<slot name="prev">
				<origam-fade>
					<origam-icon :icon="prevIcon"/>
				</origam-fade>
			</slot>
		</div>

		<div
				key="container"
				ref="containerRef"
				class="origam-slide-group__container"
				@scroll="handleScroll"
		>
			<div
					ref="contentRef"
					class="origam-slide-group__content"
					@focusin="handleFocusin"
					@focusout="handleFocusout"
					@keydown="handleKeydown"
			>
				<slot
						name="default"
						v-bind="slotProps"
				/>
			</div>
		</div>

		<div
				v-if="hasAffixes"
				key="next"
				:class="slideGroupNextClasses"
				@click="handleFocusAffixes"
				@mousedown="hasNext && scrollTo('next')"
		>
			>
			<slot name="next">
				<origam-fade>
					<origam-icon :icon="nextIcon"/>
				</origam-fade>
			</slot>
		</div>
	</component>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamFade, OrigamIcon } from "@origam/components"
	import {
		useBorder,
		useDisplay,
		useGoTo,
		useGroup,
		useMargin,
		usePadding,
		useProps,
		useResizeObserver,
		useRounded,
		useRtl
	} from "@origam/composables"

	import { IN_BROWSER, ORIGAM_SLIDE_GROUP_KEY } from "@origam/consts"

	import { DIRECTION, MDI_ICONS } from "@origam/enums"

	import type { IGoToOptions, ISlideGroupProps } from "@origam/interfaces"
	import {
		calculateCenteredTarget,
		calculateUpdatedTarget,
		focusableChildren,
		getClientSize,
		getOffsetSize,
		getScrollPosition,
		getScrollSize
	} from "@origam/utils"

	import { computed, shallowRef, StyleValue, watch } from "vue"

	const props = withDefaults(defineProps<ISlideGroupProps>(), {
		direction: DIRECTION.HORIZONTAL,
		prevIcon: MDI_ICONS.CHEVRON_RIGHT,
		nextIcon: MDI_ICONS.CHEVRON_LEFT,
		selectedClass: 'origam-slide-group-item--active'
	})

	defineEmits(['update:modelValue'])

	const {filterProps} = useProps<ISlideGroupProps>(props)

	const {roundedClasses, roundedStyles} = useRounded(props)
	const {borderClasses, borderStyles} = useBorder(props)
	const {paddingClasses, paddingStyles} = usePadding(props)
	const {marginClasses, marginStyles} = useMargin(props)

	const {displayClasses, mobile} = useDisplay(props)
	const group = useGroup(props, ORIGAM_SLIDE_GROUP_KEY)
	const isOverflowing = shallowRef(false)
	const scrollOffset = shallowRef(0)
	const containerSize = shallowRef(0)
	const contentSize = shallowRef(0)
	const isHorizontal = computed(() => props.direction === 'horizontal')

	const {resizeRef: containerRef, contentRect: containerRect} = useResizeObserver()
	const {resizeRef: contentRef, contentRect} = useResizeObserver()
	const {isRtl} = useRtl()

	const goTo = useGoTo()
	const goToOptions = computed(() => {
		return {
			container: containerRef.value,
			duration: 200,
			easing: 'easeOutQuart'
		} as Partial<IGoToOptions>
	})

	const firstSelectedIndex = computed(() => {
		if (!group.selected.value.length) return -1

		return group.items.value.findIndex(item => item.id === group.selected.value[0])
	})

	const lastSelectedIndex = computed(() => {
		if (!group.selected.value.length) return -1

		return group.items.value.findIndex(item => item.id === group.selected.value[group.selected.value.length - 1])
	})

	if (IN_BROWSER) {
		let frame = -1
		watch(() => [group.selected.value, containerRect.value, contentRect.value, isHorizontal.value], () => {
			cancelAnimationFrame(frame)
			frame = requestAnimationFrame(() => {
				if (containerRect.value && contentRect.value) {
					const sizeProperty = isHorizontal.value ? 'width' : 'height'

					containerSize.value = containerRect.value[sizeProperty]
					contentSize.value = contentRect.value[sizeProperty]

					isOverflowing.value = containerSize.value + 1 < contentSize.value
				}

				if (firstSelectedIndex.value >= 0 && contentRef.value) {
					// TODO: Is this too naive? Should we store element references in group composable?
					const selectedElement = contentRef.value.children[lastSelectedIndex.value] as HTMLElement

					scrollToChildren(selectedElement, props.centerActive)
				}
			})
		})
	}

	const isFocused = shallowRef(false)

	const scrollToChildren = (children: HTMLElement, center?: boolean) => {
		let target = calculateUpdatedTarget({
			containerElement: containerRef.value!,
			isHorizontal: isHorizontal.value,
			isRtl: isRtl.value,
			selectedElement: children
		})

		if (center) {
			target = calculateCenteredTarget({
				containerElement: containerRef.value!,
				isHorizontal: isHorizontal.value,
				selectedElement: children
			})
		}

		scrollToPosition(target)
	}

	const scrollToPosition = (newPosition: number) => {
		if (!IN_BROWSER || !containerRef.value) return

		const offsetSize = getOffsetSize(isHorizontal.value, containerRef.value)
		const scrollPosition = getScrollPosition(isHorizontal.value, isRtl.value, containerRef.value)
		const scrollSize = getScrollSize(isHorizontal.value, containerRef.value)

		if (
				scrollSize <= offsetSize ||
				// Prevent scrolling by only a couple of pixels, which doesn't look smooth
				Math.abs(newPosition - scrollPosition) < 16
		) return

		if (isHorizontal.value && containerRef.value) {
			const {scrollWidth, offsetWidth: containerWidth} = containerRef.value!

			newPosition = (scrollWidth - containerWidth) - newPosition
		}

		if (isHorizontal.value) {
			goTo.horizontal(newPosition, goToOptions.value)
		} else {
			goTo(newPosition, goToOptions.value)
		}
	}

	const handleScroll = (e: Event) => {
		const {scrollTop, scrollLeft} = e.target as HTMLElement

		scrollOffset.value = isHorizontal.value ? scrollLeft : scrollTop
	}

	const handleFocusin = (e: FocusEvent) => {
		isFocused.value = true

		if (!isOverflowing.value || !contentRef.value) return

		// Focused element is likely to be the root of an item, so a
		// breadth-first search will probably find it in the first iteration
		for (const el of e.composedPath()) {
			for (const item of contentRef.value.children) {
				if (item === el) {
					scrollToChildren(item as HTMLElement)
					return
				}
			}
		}
	}

	const handleFocusout = () => {
		isFocused.value = false
	}

	// Affix clicks produce onFocus that we have to ignore to avoid extra scrollToChildren
	let ignoreFocusEvent = false
	const handleFocus = (e: FocusEvent) => {
		if (!ignoreFocusEvent && !isFocused.value && !(e.relatedTarget && contentRef.value?.contains(e.relatedTarget as Node))) focus()

		ignoreFocusEvent = false
	}

	const handleFocusAffixes = () => {
		ignoreFocusEvent = true
	}

	const handleKeydown = (e: KeyboardEvent) => {
		if (!contentRef.value) return

		const toFocus = (location: Parameters<typeof focus>[0]) => {
			e.preventDefault()
			focus(location)
		}

		if (isHorizontal.value) {
			if (e.key === 'ArrowRight') {
				toFocus('next')
			} else if (e.key === 'ArrowLeft') {
				toFocus('prev')
			}
		} else {
			if (e.key === 'ArrowDown') {
				toFocus('next')
			} else if (e.key === 'ArrowUp') {
				toFocus('prev')
			}
		}

		if (e.key === 'Home') {
			toFocus('first')
		} else if (e.key === 'End') {
			toFocus('last')
		}
	}

	const focus = (location?: 'next' | 'prev' | 'first' | 'last') => {
		if (!contentRef.value) return

		let el: HTMLElement | undefined

		if (!location) {
			const focusable = focusableChildren(contentRef.value)
			el = focusable[0]
		} else if (location === 'next') {
			el = contentRef.value.querySelector(':focus')?.nextElementSibling as HTMLElement | undefined

			if (!el) return focus('first')
		} else if (location === 'prev') {
			el = contentRef.value.querySelector(':focus')?.previousElementSibling as HTMLElement | undefined

			if (!el) return focus('last')
		} else if (location === 'first') {
			el = (contentRef.value.firstElementChild as HTMLElement)
		} else if (location === 'last') {
			el = (contentRef.value.lastElementChild as HTMLElement)
		}

		if (el) {
			el.focus({preventScroll: true})
		}
	}

	const scrollTo = (location: 'prev' | 'next') => {
		const direction = 1

		const offsetStep = (location === 'prev' ? -direction : direction) * containerSize.value

		let newPosition = scrollOffset.value + offsetStep

		// TODO: improve it
		if (isHorizontal.value && containerRef.value) {
			const {scrollWidth, offsetWidth: containerWidth} = containerRef.value!

			newPosition += scrollWidth - containerWidth
		}

		scrollToPosition(newPosition)
	}

	const slotProps = computed(() => ({
		next: group.next,
		prev: group.prev,
		select: group.select,
		isSelected: group.isSelected
	}))

	const hasAffixes = computed(() => {
		switch (props.showArrows) {
				// Always show arrows on desktop & mobile
			case 'always':
				return true

				// Always show arrows on desktop
			case 'desktop':
				return !mobile.value

				// Show arrows on mobile when overflowing.
				// This matches the default 2.2 behavior
			case true:
				return isOverflowing.value || Math.abs(scrollOffset.value) > 0

				// Always show on mobile
			case 'mobile':
				return (
						mobile.value ||
						(isOverflowing.value || Math.abs(scrollOffset.value) > 0)
				)

				// https://material.io/components/tabs#scrollable-tabs
				// Always show arrows when
				// overflowed on desktop
			default:
				return (
						!mobile.value &&
						(isOverflowing.value || Math.abs(scrollOffset.value) > 0)
				)
		}
	})
	const hasPrev = computed(() => {
		// 1 pixel in reserve, may be lost after rounding
		return Math.abs(scrollOffset.value) > 1
	})
	const hasNext = computed(() => {
		if (!containerRef.value) return false

		const scrollSize = getScrollSize(isHorizontal.value, containerRef.value)
		const clientSize = getClientSize(isHorizontal.value, containerRef.value)

		const scrollSizeMax = scrollSize - clientSize

		// 1 pixel in reserve, may be lost after rounding
		return scrollSizeMax - Math.abs(scrollOffset.value) > 1
	})

	// CLASS & STYLES

	const slideGroupStyles = computed(() => {
		return [
			roundedStyles.value,
			borderStyles.value,
			paddingStyles.value,
			marginStyles.value,
			props.style
		] as StyleValue
	})
	const slideGroupClasses = computed(() => {
		return [
			'origam-slide-group',
			{
				'origam-slide-group--vertical': !isHorizontal.value,
				'origam-slide-group--has-affixes': hasAffixes.value,
				'origam-slide-group--is-overflowing': isOverflowing.value
			},
			displayClasses.value,
			roundedClasses.value,
			borderClasses.value,
			paddingClasses.value,
			marginClasses.value,
			props.class
		]
	})
	const slideGroupPrevClasses = computed(() => {
		return [
			'origam-slide-group__prev',
			{
				'origam-slide-group__prev--disabled': !hasPrev.value
			}
		]
	})
	const slideGroupNextClasses = computed(() => {
		return [
			'origam-slide-group__next',
			{
				'origam-slide-group__next--disabled': !hasPrev.value
			}
		]
	})

	// EXPOSE

	defineExpose({
		filterProps
	})
</script>
