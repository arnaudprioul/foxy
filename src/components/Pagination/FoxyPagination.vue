<template>
	<component
		:is="tag"
		ref="resizeRef"
		:class="paginationClasses"
		:style="paginationStyles"
		role="navigation"
		:aria-label="ariaLabel"
		@keydown="handleKeydown"
	>
		<ul class="foxy-pagination__list">
			<template v-if="showFirstLastPage">
				<li key="first" class="foxy-pagination__first">
					<slot name="first" v-bind="{...controls.first}">
						<foxy-btn v-bind="{...controls.first }" />
					</slot>
				</li>
			</template>

			<li key="prev" class="foxy-pagination__prev">
				<slot name="prev" v-bind="{...controls.prev}">
					<foxy-btn v-bind="{...controls.prev }" />
				</slot>
			</li>

			<template v-for="(item) in items" :key="item.key">
				<li
						class="foxy-pagination__item"
						:class="{'foxy-pagination__item--is-active': item.isActive}"
				>
					<slot :name="`item-${item.key}`">
						<slot name="item">
							<foxy-btn :text="item.page.toString()" v-bind="{ ...item.props }"/>
						</slot>
					</slot>
				</li>
			</template>

			<li key="next" class="foxy-pagination__next">
				<slot name="next" v-bind="{...controls.next}">
					<foxy-btn v-bind="{...controls.next }" />
				</slot>
			</li>

			<template v-if="showFirstLastPage">
				<li key="last" class="foxy-pagination__last">
					<slot name="last" v-bind="{...controls.last}">
						<foxy-btn v-bind="{...controls.last }" />
					</slot>
				</li>
			</template>
		</ul>
	</component>
</template>

<script lang="ts" setup>
	import { FoxyBtn } from "@foxy/components"

	import { useDisplay, useProps, useResizeObserver, useVModel, useRefs } from "@foxy/composables"

	import { KEYBOARD_VALUES } from "@foxy/enums"

  import { IPaginationProps } from "@foxy/interfaces"

	import { createRange } from "@foxy/utils"

	import { ComponentPublicInstance, computed, nextTick, shallowRef, StyleValue } from "vue"

  const props = withDefaults(defineProps<IPaginationProps>(), {
	  prevIcon: '$prev',
	  nextIcon: '$next',
	  firstIcon: '$first',
	  lastIcon: '$last',
	  tag: 'div',
	  ellipsis: '...',
	  length: 1,
	  start: 1,
	  ariaLabel: 'Pagination Navigation',
	  pageAriaLabel: 'Go to page',
	  currentPageAriaLabel: 'Current page - Page',
	  firstAriaLabel: 'First page',
	  previousAriaLabel: 'Previous page',
	  nextAriaLabel: 'Next page',
	  lastAriaLabel: 'Last page'
  })

  const emits = defineEmits([
			'update:modelValue',
		  'first',
		  'next',
		  'prev',
		  'last'
  ])

  const {filterProps} = useProps<IPaginationProps>(props)

  const page = useVModel(props, 'modelValue', props.start)
  const { width } = useDisplay()
  const maxButtons = shallowRef(-1)

	const { resizeRef } = useResizeObserver((entries: ResizeObserverEntry[]) => {
		if (!entries.length) return

		const { target, contentRect } = entries[0]

		const firstItem = target.querySelector('.foxy-pagination__list > *') as HTMLElement

		if (!firstItem) return

		const totalWidth = contentRect.width
		const itemWidth =
				firstItem.offsetWidth +
				parseFloat(getComputedStyle(firstItem).marginRight) * 2

		maxButtons.value = getMax(totalWidth, itemWidth)
	})
	const { refs, updateRef } = useRefs<ComponentPublicInstance>()

	const length = computed(() => {
		return parseInt(props.length, 10)
	})
	const start = computed(() => {
		return parseInt(props.start, 10)
	})
	const totalVisible = computed(() => {
		if (props.totalVisible != null) {
			return parseInt(props.totalVisible, 10)
		}

		if (maxButtons.value >= 0) {
			return maxButtons.value
		}

		return getMax(width.value, 58)
	})
	const range = computed(() => {
		if (length.value <= 0 || isNaN(length.value) || length.value > Number.MAX_SAFE_INTEGER) return []

		if (totalVisible.value <= 0) return []
		else if (totalVisible.value === 1) return [page.value]

		if (length.value <= totalVisible.value) {
			return createRange(length.value, start.value)
		}

		const even = totalVisible.value % 2 === 0
		const middle = even ? totalVisible.value / 2 : Math.floor(totalVisible.value / 2)
		const left = even ? middle : middle + 1
		const right = length.value - middle

		if (left - page.value >= 0) {
			return [...createRange(Math.max(1, totalVisible.value - 1), start.value), props.ellipsis, length.value]
		} else if (page.value - right >= (even ? 1 : 0)) {
			const rangeLength = totalVisible.value - 1
			const rangeStart = length.value - rangeLength + start.value
			return [start.value, props.ellipsis, ...createRange(rangeLength, rangeStart)]
		} else {
			const rangeLength = Math.max(1, totalVisible.value - 3)
			const rangeStart = rangeLength === 1 ? page.value : page.value - Math.ceil(rangeLength / 2) + start.value
			return [start.value, props.ellipsis, ...createRange(rangeLength, rangeStart), props.ellipsis, length.value]
		}
	})
	const items = computed(() => {
		return range.value.map((item, index) => {
			const ref = (e: any) => updateRef(e, index)

			if (typeof item === 'string') {
				return {
					isActive: false,
					key: `ellipsis-${index}`,
					page: item,
					props: {
						ref,
						ellipsis: true,
						icon: true,
						disabled: true,
					},
				}
			} else {
				const isActive = item === page.value
				return {
					isActive,
					key: item,
					page: item,
					props: {
						ref,
						ellipsis: false,
						icon: true,
						disabled: !!props.disabled || +props.length < 2,
						color: isActive ? props.activeColor : props.color,
						'aria-current': isActive,
						'aria-label': isActive ? props.currentPageAriaLabel : props.pageAriaLabel, item,
						onClick: (e: Event) => setValue(e, item),
					},
				}
			}
		})
	})
	const controls = computed(() => {
		const prevDisabled = !!props.disabled || page.value <= start.value
		const nextDisabled = !!props.disabled || page.value >= start.value + length.value - 1

		return {
			first: {
				icon: props.firstIcon,
				onClick: (e: Event) => setValue(e, start.value, 'first'),
				disabled: prevDisabled,
				'aria-label': props.firstAriaLabel,
				'aria-disabled': prevDisabled,
			},
			prev: {
				icon: props.prevIcon,
				onClick: (e: Event) => setValue(e, page.value - 1, 'prev'),
				disabled: prevDisabled,
				'aria-label': props.previousAriaLabel,
				'aria-disabled': prevDisabled,
			},
			next: {
				icon: props.nextIcon,
				onClick: (e: Event) => setValue(e, page.value + 1, 'next'),
				disabled: nextDisabled,
				'aria-label': props.nextAriaLabel,
				'aria-disabled': nextDisabled,
			},
			last: {
				icon: props.lastIcon,
				onClick: (e: Event) => setValue(e, start.value + length.value - 1, 'last'),
				disabled: nextDisabled,
				'aria-label': props.lastAriaLabel,
				'aria-disabled': nextDisabled,
			},
		}
	})

	const getMax = (totalWidth: number, itemWidth: number) => {
		const minButtons = props.showFirstLastPage ? 5 : 3
		return Math.max(0, Math.floor(
				// Round to two decimal places to avoid floating point errors
				+((totalWidth - itemWidth * minButtons) / itemWidth).toFixed(2)
		))
	}
	const setValue = (e: Event, value: number, event?: any) => {
		e.preventDefault()
		page.value = value
		event && emits(event, value)
	}
	const updateFocus = () => {
		const currentIndex = page.value - start.value

		refs.value[currentIndex]?.$el.focus()
	}
	const handleKeydown = (e: KeyboardEvent) => {
		if (e.key === KEYBOARD_VALUES.LEFT && !props.disabled && page.value > +props.start) {
			page.value = page.value - 1
			nextTick(updateFocus)
		} else if (e.key === KEYBOARD_VALUES.RIGHT && !props.disabled && page.value < start.value + length.value - 1) {
			page.value = page.value + 1
			nextTick(updateFocus)
		}
	}

	// CLASS & STYLES

	const paginationClasses = computed(() => {
		return [
			'foxy-pagination',
			props.class,
		]
	})
	const paginationStyles = computed(() => {
		return [
			props.style
		] as StyleValue
	})

  // EXPOSE

  defineExpose({
	  filterProps
  })
</script>

<style lang="scss" scoped>
	.foxy-pagination {

		&__list {
			display: inline-flex;
			list-style-type: none;
			justify-content: center;
			width: 100%;
		}

		&__item {
			&--is-active {
				:deep(.foxy-btn__overlay) {
					opacity: var(--foxy-pagination__item--is-active---border-opacity)
				}
			}
		}

		&__item,
		&__first,
		&__prev,
		&__next,
		&__last {
			margin: .3rem;
		}

		:deep(.foxy-btn) {
			border-radius: 4px;
		}

		:deep(.foxy-btn--rounded) {
			border-radius: 50%;
		}

		:deep(.foxy-btn__overlay) {
			transition: none;
		}
	}
</style>

<style>
  :root {
	  --foxy-pagination__item--is-active---border-opacity: 0.12;
  }
</style>
