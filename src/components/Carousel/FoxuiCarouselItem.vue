<template>
	<foxui-window-item
			ref="foxuiWindowItemRef"
			:class="carouselItemClasses"
			:style="carouselItemStyles"
			v-bind="windowItemProps"
	>
		<template #default>
			<slot name="default">
				<foxui-img
						ref="foxuiImgRef"
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
				</foxui-img>
			</slot>
		</template>
	</foxui-window-item>
</template>

<script
		lang="ts"
		setup
>
	import { FoxuiImg, FoxuiWindowItem } from '@foxui/components'

	import { useProps } from '@foxui/composables'

	import type { ICarouselItemProps } from '@foxui/interfaces'

	import type { TFoxuiImg, TFoxuiWindowItem } from "@foxui/types"

	import { computed, ref, StyleValue, useAttrs, useSlots } from 'vue'

	const props = withDefaults(defineProps<ICarouselItemProps>(), {
		transition: undefined,
		reverseTransition: undefined
	})

	const {filterProps} = useProps<ICarouselItemProps>(props)

	const attrs = useAttrs()

	const foxuiWindowItemRef = ref<TFoxuiWindowItem>()
	const foxuiImgRef = ref<TFoxuiImg>()

	const windowItemProps = computed(() => {
		return foxuiWindowItemRef.value?.filterProps(props)
	})
	const imgProps = computed(() => {
		return foxuiImgRef.value?.filterProps(props)
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
			'foxui-carousel-item',
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
	.foxui-carousel-item {
		display: block;
		height: inherit;
		text-decoration: none;

		> .foxui-img {
			height: inherit;
		}
	}
</style>

<style>
	:root {

	}
</style>
