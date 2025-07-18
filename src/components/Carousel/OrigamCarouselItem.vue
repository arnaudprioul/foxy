<template>
	<origam-window-item
			ref="origamWindowItemRef"
			:class="carouselItemClasses"
			:style="carouselItemStyles"
			v-bind="windowItemProps"
	>
		<template #default>
			<slot name="default">
				<origam-img
						ref="origamImgRef"
						v-bind="{...attrs , ...imgProps}"
				>
					<template
							v-if="slots.content"
							#default
					>
						<slot name="content"/>
					</template>

					<template
							v-if="slots.error"
							#error
					>
						<slot name="error"/>
					</template>

					<template
							v-if="slots.placeholder"
							#placeholder
					>
						<slot name="placeholder"/>
					</template>
				</origam-img>
			</slot>
		</template>
	</origam-window-item>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamImg, OrigamWindowItem } from '@origam/components'

	import { useProps } from '@origam/composables'

	import type { ICarouselItemProps } from '@origam/interfaces'

	import type { TOrigamImg, TOrigamWindowItem } from "@origam/types"

	import { computed, ref, StyleValue, useAttrs, useSlots } from 'vue'

	const props = withDefaults(defineProps<ICarouselItemProps>(), {
		transition: undefined,
		reverseTransition: undefined
	})

	const {filterProps} = useProps<ICarouselItemProps>(props)

	const attrs = useAttrs()

	const origamWindowItemRef = ref<TOrigamWindowItem>()
	const origamImgRef = ref<TOrigamImg>()

	const windowItemProps = computed(() => {
		return origamWindowItemRef.value?.filterProps(props)
	})
	const imgProps = computed(() => {
		return origamImgRef.value?.filterProps(props)
	})

	const slots = useSlots()

	// CLASS & STYLES

	const carouselItemStyles = computed(() => {
		return [
			props.style
		] as StyleValue
	})
	const carouselItemClasses = computed(() => {
		return [
			'origam-carousel-item',
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
	.origam-carousel-item {
		display: block;
		height: inherit;
		text-decoration: none;

		> .origam-img {
			height: inherit;
		}
	}
</style>

<style>
	:root {

	}
</style>
