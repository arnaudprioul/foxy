<template>
	<div
			:class="dataTableFooterClasses"
			:style="dataTableFooterStyles"
	>
		<foxui-row>
			<slot name="prepend"/>

			<div class="foxui-data-table-footer__items-per-page">
				<span>{{ t(itemsPerPageText) }}</span>

				<foxui-select
						:density="DENSITY.COMPACT"
						:items="itemsPerPageOptions"
						:model-value="itemsPerPage"
						hide-details
						@update:model-value="handleUpdateItemsPerPage"
				/>
			</div>

			<div class="foxui-data-table-footer__info">
				<span>{{ t(pageText, !itemsLength ? 0 : startIndex + 1, stopIndex, itemsLength) }}</span>
			</div>

			<div class="foxui-data-table-footer__pagination">
				<foxui-pagination
						ref="foxuiPaginationRef"
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
		</foxui-row>
	</div>
</template>

<script
		lang="ts"
		setup
>
	import { FoxuiPagination, FoxuiRow, FoxuiSelect } from "@foxui/components"

	import { useLocale, usePagination, useProps } from "@foxui/composables"

	import { DENSITY } from "@foxui/enums"

	import type { IDataTableFooterProps } from "@foxui/interfaces"
	import type { TFoxuiPagination } from "@foxui/types"

	import { computed, ref, StyleValue } from "vue"

	const props = withDefaults(defineProps<IDataTableFooterProps>(), {
		itemsPerPageOptions: () => [
			{value: 10, title: '10'},
			{value: 25, title: '25'},
			{value: 50, title: '50'},
			{value: 100, title: '100'},
			{value: -1, title: 'foxui.dataFooter.itemsPerPageAll'}
		],
		itemsPerPageText: 'foxui.dataFooter.itemsPerPageText',
		pageText: 'foxui.dataFooter.pageText',
		firstPageLabel: 'foxui.dataFooter.firstPage',
		prevPageLabel: 'foxui.dataFooter.prevPage',
		nextPageLabel: 'foxui.dataFooter.nextPage',
		lastPageLabel: 'foxui.dataFooter.lastPage',
		showCurrentPage: true
	})

	const {filterProps} = useProps<IDataTableFooterProps>(props)
	const {t} = useLocale()

	const foxuiPaginationRef = ref<TFoxuiPagination>()

	const {page, pageCount, startIndex, stopIndex, itemsLength, itemsPerPage, setItemsPerPage} = usePagination()

	const itemsPerPageOptions = computed(() => (
			props.itemsPerPageOptions.map((option) => {
				if (typeof option === 'number') {
					return {
						value: option,
						title: option === -1
								? t('foxui.dataFooter.itemsPerPageAll')
								: String(option)
					}
				}

				return {
					...option,
					title: !isNaN(Number(option.title)) ? option.title : t(option.title)
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

	const handleUpdateItemsPerPage = (v: number) => {
		setItemsPerPage(Number(v))
	}

	const paginationProps = computed(() => {
		return foxuiPaginationRef.value?.filterProps(props, ['class', 'style', 'id', 'totalVisible', 'modelValue', 'length', 'rounded', 'showFirstLastPage', 'density'])
	})

	// CLASSES & STYLES

	const dataTableFooterClasses = computed(() => {
		return [
			'foxui-data-table-footer',
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

<style
		lang="scss"
		scoped
>

</style>
