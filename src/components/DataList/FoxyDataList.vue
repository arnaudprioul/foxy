<template>
	<dl
			:class="dataListClasses"
			:style="dataListStyles"
	>
		<template v-if="slots.default || hasItems">
			<slot
					name="default"
					v-bind="{items}"
			>
				<template
						v-for="(item, index) in items as Array<IDataItem>"
						:key="index"
				>
					<slot
							:name="`item-${index}`"
							v-bind="{item, index}"
					>
						<slot
								name="item"
								v-bind="{item, index}"
						>
							<template v-if="item.title">
								<foxy-data-title
										:append-avatar="appendAvatar"
										:append-icon="appendIcon"
										:density="density"
										:prepend-avatar="prependAvatar"
										:prepend-icon="prependIcon"
										class="foxy-data-list__title"
										v-bind="{...item.title}"
								>
									<template
											v-if="slots['item.title.append'] || slots[`item-${index}.title.append`]"
											#append
									>
										<slot :name="`item-${index}.title.append`">
											<slot name="item.title.append"/>
										</slot>
									</template>

									<template
											v-if="slots['item.title'] || slots[`item-${index}.title`]"
											#default="props"
									>
										<slot
												:name="`item-${index}.title`"
												v-bind="props"
										>
											<slot
													name="item.title"
													v-bind="props"
											/>
										</slot>
									</template>

									<template
											v-if="slots['item.title.prepend'] || slots[`item-${index}.title.prepend`]"
											#prepend
									>
										<slot :name="`item-${index}.title.prepend`">
											<slot name="item.title.prepend"/>
										</slot>
									</template>
								</foxy-data-title>
							</template>

							<template v-if="item.text">
								<template
										v-for="(data, i) in item.text as Array<IDataTextProps>"
										:key="i"
								>
									<foxy-data-text
											:id="`${i}-data-text`"
											:density="density"
											class="foxy-data-list__text"
											v-bind="{...data}"
									>
										<template
												v-if="slots['item.text.append'] || slots[`item-${index}.text.append`]"
												#append
										>
											<slot :name="`item-${index}.text.append`">
												<slot name="item.text.append"/>
											</slot>
										</template>

										<template #default>
											<slot :name="`item-${index}.text`">
												<slot name="item.text"/>
											</slot>
										</template>

										<template
												v-if="slots['item.text.prepend'] || slots[`item-${index}.text.prepend`]"
												#prepend
										>
											<slot :name="`item-${index}.text.prepend`">
												<slot name="item.text.prepend"/>
											</slot>
										</template>
									</foxy-data-text>
								</template>
							</template>
						</slot>
					</slot>
				</template>
			</slot>
		</template>
	</dl>
</template>

<script
		lang="ts"
		setup
>
	import { FoxyDataText, FoxyDataTitle } from "@foxy/components"

	import {
		useBorder,
		useBothColor,
		useDensity,
		useElevation,
		useLoader,
		useMargin,
		usePadding,
		useProps,
		useRounded
	} from "@foxy/composables"
	import type { IDataItem, IDataListProps, IDataTextProps } from "@foxy/interfaces"

	import { isEmpty } from "@foxy/utils"

	import { computed, StyleValue, toRef, useSlots } from "vue"

	const props = withDefaults(defineProps<IDataListProps>(), {})

	const {filterProps} = useProps<IDataListProps>(props)

	const slots = useSlots()

	const {densityClasses} = useDensity(props)
	const {elevationClasses} = useElevation(props)
	const {loaderClasses} = useLoader(props)
	const {roundedClasses, roundedStyles} = useRounded(props)
	const {borderClasses, borderStyles} = useBorder(props)
	const {paddingClasses, paddingStyles} = usePadding(props)
	const {marginClasses, marginStyles} = useMargin(props)

	const hasItems = computed(() => {
		return !isEmpty(props.items)
	})

	const {colorStyles} = useBothColor(toRef(props.bgColor), toRef(props.color))

	// CLASS & STYLES

	const dataListStyles = computed(() => {
		return [
			borderStyles.value,
			paddingStyles.value,
			marginStyles.value,
			colorStyles.value,
			roundedStyles.value,
			props.style
		] as StyleValue
	})
	const dataListClasses = computed(() => {
		return [
			'foxy-data-list',
			borderClasses.value,
			paddingClasses.value,
			marginClasses.value,
			densityClasses.value,
			elevationClasses.value,
			loaderClasses.value,
			roundedClasses.value,
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
	.foxy-data-list {

	}
</style>

<style lang="scss">

</style>
