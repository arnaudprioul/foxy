<template>
	<component
			:is="tag"
			ref="rootEl"
			:class="infiniteScrollClasses"
			:style="infiniteScrollStyles"
	>
		<div class="foxy-infinite-scroll__side">
			<template v-if="hasStartIntersect">
				<slot
						name="error"
						v-bind="{side: INFINITE_SCROLL_SIDE.START, props: { onClick: () => intersecting(INFINITE_SCROLL_SIDE.START), color }}"
				/>

				<slot
						name="empty"
						v-bind="{side: INFINITE_SCROLL_SIDE.START, props: { onClick: () => intersecting(INFINITE_SCROLL_SIDE.START), color }}"
				>
					<span>No more</span>
				</slot>

				<template v-if="isManualMode">
					<template v-if="isLoading">
						<slot
								name="loading"
								v-bind="{side: INFINITE_SCROLL_SIDE.START, props: { onClick: () => intersecting(INFINITE_SCROLL_SIDE.START), color }}"
						>
							<foxy-progress
									:color="color"
									:type="PROGRESS_TYPE.CIRCULAR"
									indeterminate
							/>
						</slot>
					</template>

					<slot
							name="loadMore"
							v-bind="{side: INFINITE_SCROLL_SIDE.START, props: { onClick: () => intersecting(INFINITE_SCROLL_SIDE.START), color }}"
					>
						<foxy-btn
								:color="color"
								text="Load more"
								@click="intersecting(INFINITE_SCROLL_SIDE.START)"
						/>
					</slot>
				</template>
			</template>
		</div>

		<template v-if="rootEl && hasStartIntersect && isIntersectMode">
			<foxy-infinite-scroll-intersect
					:key="INFINITE_SCROLL_SIDE.START"
					:margin="margin"
					:root-ref="rootEl"
					:side="INFINITE_SCROLL_SIDE.START"
					@intersect="handleIntersect"
			/>
		</template>

		<slot name="default"/>

		<template v-if="rootEl && hasEndIntersect && isIntersectMode">
			<foxy-infinite-scroll-intersect
					:key="INFINITE_SCROLL_SIDE.END"
					:margin="margin"
					:root-ref="rootEl"
					:side="INFINITE_SCROLL_SIDE.END"
					@intersect="handleIntersect"
			/>
		</template>

		<div class="foxy-infinite-scroll__side">
			<template v-if="hasStartIntersect">
				<slot
						name="error"
						v-bind="{side: INFINITE_SCROLL_SIDE.END, props: { onClick: () => intersecting(INFINITE_SCROLL_SIDE.END), color }}"
				/>

				<slot
						name="empty"
						v-bind="{side: INFINITE_SCROLL_SIDE.END, props: { onClick: () => intersecting(INFINITE_SCROLL_SIDE.END), color }}"
				>
					<span>{{ t(emptyText) }}</span>
				</slot>

				<template v-if="isManualMode">
					<template v-if="isLoading">
						<slot
								name="loading"
								v-bind="{side: INFINITE_SCROLL_SIDE.END, props: { onClick: () => intersecting(INFINITE_SCROLL_SIDE.END), color }}"
						>
							<foxy-progress
									:color="color"
									:type="PROGRESS_TYPE.CIRCULAR"
									indeterminate
							/>
						</slot>
					</template>

					<slot
							name="loadMore"
							v-bind="{side: INFINITE_SCROLL_SIDE.END, props: { onClick: () => intersecting(INFINITE_SCROLL_SIDE.END), color }}"
					>
						<foxy-btn
								:color="color"
								:text="t(loadMoreText)"
								@click="intersecting(INFINITE_SCROLL_SIDE.END)"
						/>
					</slot>
				</template>
			</template>
		</div>
	</component>
</template>

<script
		lang="ts"
		setup
>
	import { FoxyBtn, FoxyInfiniteScrollIntersect, FoxyProgress } from '@foxy/components'

	import { useBothColor, useDimension, useLocale, useProps } from '@foxy/composables'

	import {
		DIRECTION,
		INFINITE_SCROLL_MODE,
		INFINITE_SCROLL_SIDE,
		INFINITE_SCROLL_STATUS,
		PROGRESS_TYPE
	} from '@foxy/enums'

	import { IInfiniteScrollProps } from '@foxy/interfaces'

	import { TInfiniteScrollSide, TInfiniteScrollStatus } from '@foxy/types'

	import { computed, nextTick, onMounted, ref, shallowRef, StyleValue, toRef } from 'vue'

	const props = withDefaults(defineProps<IInfiniteScrollProps>(), {
		direction: DIRECTION.VERTICAL,
		side: INFINITE_SCROLL_SIDE.END,
		mode: INFINITE_SCROLL_MODE.INTERSECT,
		tag: 'div',
		loadMoreText: 'foxy.infiniteScroll.loadMore',
		emptyText: 'foxy.infiniteScroll.empty'
	})

	const emits = defineEmits(['load'])

	const {filterProps} = useProps<IInfiniteScrollProps>(props)

	const {t} = useLocale()

	const {dimensionStyles} = useDimension(props)
	const {colorStyles} = useBothColor(toRef(props, 'bgColor'), toRef(props, 'color'))

	const rootEl = ref<HTMLDivElement>()
	const isIntersecting = shallowRef(false)

	const propertyDirection = computed(() => {
		return props.direction === DIRECTION.VERTICAL ? 'scrollTop' : 'scrollLeft'
	})
	const propertySize = computed(() => {
		return props.direction === DIRECTION.VERTICAL ? 'scrollHeight' : 'scrollWidth'
	})
	const propertyContainerSize = computed(() => {
		return props.direction === DIRECTION.VERTICAL ? 'clientHeight' : 'clientWidth'
	})

	const getScrollAmount = () => {
		if (!rootEl.value) return 0

		return rootEl.value[propertyDirection.value]
	}
	const setScrollAmount = (amount: number) => {
		if (!rootEl.value) return

		rootEl.value[propertyDirection.value] = amount
	}

	const getScrollSize = () => {
		if (!rootEl.value) return 0

		return rootEl.value[propertySize.value]
	}
	const getContainerSize = () => {
		if (!rootEl.value) return 0

		return rootEl.value[propertyContainerSize.value]
	}

	onMounted(() => {
		if (!rootEl.value) return

		if (props.side === INFINITE_SCROLL_SIDE.START) {
			setScrollAmount(getScrollSize())
		} else if (props.side === INFINITE_SCROLL_SIDE.BOTH) {
			setScrollAmount(getScrollSize() / 2 - getContainerSize() / 2)
		}
	})

	const currentSide = shallowRef<TInfiniteScrollSide>(INFINITE_SCROLL_SIDE.START)
	const startStatus = shallowRef<TInfiniteScrollStatus>(INFINITE_SCROLL_STATUS.OK)
	const endStatus = shallowRef<TInfiniteScrollStatus>(INFINITE_SCROLL_STATUS.OK)
	const status = computed({
		get () {
			return currentSide.value === INFINITE_SCROLL_SIDE.START ? startStatus.value : endStatus.value
		},
		set (status: TInfiniteScrollStatus) {
			if (currentSide.value === INFINITE_SCROLL_SIDE.START) {
				startStatus.value = status
			} else if (currentSide.value === INFINITE_SCROLL_SIDE.END) {
				endStatus.value = status
			}
		}
	})

	let previousScrollSize = 0
	const handleIntersect = (side: TInfiniteScrollSide, _isIntersecting: boolean) => {
		isIntersecting.value = _isIntersecting

		if (isIntersecting.value) {
			intersecting(side)
		}
	}

	const done = (_status: TInfiniteScrollStatus) => {
		status.value = _status

		nextTick(() => {
			if (status.value === INFINITE_SCROLL_STATUS.EMPTY || status.value === INFINITE_SCROLL_STATUS.ERROR) return

			if (status.value === INFINITE_SCROLL_STATUS.OK && currentSide.value === INFINITE_SCROLL_SIDE.START) {
				setScrollAmount(getScrollSize() - previousScrollSize + getScrollAmount())
			}

			if (props.mode !== INFINITE_SCROLL_MODE.MANUAL) {
				nextTick(() => {
					window.requestAnimationFrame(() => {
						window.requestAnimationFrame(() => {
							window.requestAnimationFrame(() => {
								intersecting(currentSide.value)
							})
						})
					})
				})
			}
		})
	}
	const intersecting = (side: TInfiniteScrollSide) => {
		if (props.mode !== 'manual' && !isIntersecting.value) return

		currentSide.value = side

		if (!rootEl.value || isLoading.value) return

		previousScrollSize = getScrollSize()
		status.value = INFINITE_SCROLL_STATUS.LOADING

		emits('load', {side: currentSide.value, done})
	}

	const hasStartIntersect = computed(() => {
		return props.side === INFINITE_SCROLL_SIDE.START || props.side === INFINITE_SCROLL_SIDE.BOTH
	})
	const hasEndIntersect = computed(() => {
		return props.side === INFINITE_SCROLL_SIDE.END || INFINITE_SCROLL_SIDE.BOTH
	})
	const isIntersectMode = computed(() => {
		return props.mode === INFINITE_SCROLL_MODE.INTERSECT
	})
	const isManualMode = computed(() => {
		return props.mode === INFINITE_SCROLL_MODE.MANUAL
	})
	const isLoading = computed(() => {
		return status.value === INFINITE_SCROLL_STATUS.LOADING
	})

	// CLASS & STYLES

	const infiniteScrollStyles = computed(() => {
		return [
			colorStyles.value,
			dimensionStyles.value,
			props.style
		] as StyleValue
	})
	const infiniteScrollClasses = computed(() => {
		return [
			'foxy-infinite-scroll',
			`foxy-infinite-scroll--${props.direction}`,
			{
				'foxy-infinite-scroll--start': hasStartIntersect.value,
				'foxy-infinite-scroll--end': hasEndIntersect.value
			},
			props.class
		]
	})

	// EXPOSE

	defineExpose({
		filterProps
	})
</script>
