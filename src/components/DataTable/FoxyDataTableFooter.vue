<template>
	<div
			:class="dataTableFooterClasses"
			:style="dataTableFooterStyles"
	>
		<foxy-row>
			<slot name="prepend"/>

			<div class="foxy-data-table-footer__items-per-page">
				<span>{{ props.itemsPerPageText }}</span>

				<foxy-select
						:density="DENSITY.COMPACT"
						:items="itemsPerPageOptions"
						:model-value="itemsPerPage"
						hide-details
						@update:model-value="handleUpdateItemsPerPage"
				/>
			</div>

			<div class="foxy-data-table-footer__info">
				<span>{{ props.pageText }}</span>
			</div>

			<div class="foxy-data-table-footer__pagination">
				<foxy-pagination
						ref="foxyPaginationRef"
						v-model:model-value="currentPage"
						:density="DENSITY.COMPACT"
						:length="length"
						:total-visible="showCurrentPage ? 0 : 1"
						rounded
						show-first-last-page
						v-bind="paginationProps"
				/>
			</div>

			<slot name="append"/>
		</foxy-row>
	</div>
</template>

<script lang="ts" setup>
	import { FoxyPagination, FoxyRow, FoxySelect } from "@foxy/components"

	import { usePagination, useProps } from "@foxy/composables"

	import { DENSITY } from "@foxy/enums"

	import { IDataTableFooterProps } from "@foxy/interfaces"
	import { TFoxyPagination } from "@foxy/types"

	import { computed, ref, StyleValue } from "vue"

	const props = withDefaults(defineProps<IDataTableFooterProps>(), {
		itemsPerPageOptions: [
			{value: 10, title: '10'},
			{value: 25, title: '25'},
			{value: 50, title: '50'},
			{value: 100, title: '100'},
			{value: -1, title: 'All'}
		],
		itemsPerPageText: 'Items per page:',
		showCurrentPage: true
	})

	const {filterProps} = useProps<IDataTableFooterProps>(props)

	const foxyPaginationRef = ref<TFoxyPagination>()

	const {page, pageCount, startIndex, stopIndex, itemsLength, itemsPerPage, setItemsPerPage} = usePagination()

	const itemsPerPageOptions = computed(() => (
			props.itemsPerPageOptions.map((option) => {
				if (typeof option === 'number') {
					return {
						value: option,
						title: option === -1
								? 'All' // TODO - Create translation
								: String(option)
					}
				}

				return {
					...option,
					title: !isNaN(Number(option.title)) ? option.title : option.title // TODO - Prepare to translation
				}
			})
	))
	const length = computed(() => {
		return pageCount.value
	})
	const currentPage = computed({
		get: () => {
			return page.value
		},
		set: (value) => {
			page.value = value
		}
	})

	const handleUpdateItemsPerPage = (v) => {
		setItemsPerPage(Number(v))
	}

	const paginationProps = computed(() => {
		return foxyPaginationRef.value?.filterProps(props, ['class', 'style', 'id', 'totalVisible', 'modelValue', 'length', 'rounded', 'showFirstLastPage', 'density'])
	})

	// CLASSES & STYLES

	const dataTableFooterClasses = computed(() => {
		return [
			'foxy-data-table-footer',
			props.class
		]
	})
	const dataTableFooterStyles = computed(() => {
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

</style>
