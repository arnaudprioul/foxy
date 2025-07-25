<template>
  <Story
      auto-props-disabled
      group="components"
      title="DataTable"
  >
    <Variant title="Default">
      <template #default>
	      <origam-container fullscreen>
		      <origam-row
              :align="ALIGN.CENTER"
              :justify="JUSTIFY.CENTER"
          >
			      <origam-col cols="auto">
				      <origam-data-table
                  v-bind="state"
                  @update:options="loadItems"
              />
			      </origam-col>
		      </origam-row>
	      </origam-container>
      </template>
      <template #controls>

      </template>
    </Variant>

  </Story>
</template>

<script
    lang="ts"
    setup
>
	import { OrigamCol, OrigamContainer, OrigamDataTable, OrigamRow } from '@origam/components'

	import { ALIGN, JUSTIFY } from '@origam/enums'

	import { reactive } from 'vue'

	const state: { [key: string]: any } = reactive({
    items: [],
    itemsPerPage: 5,
    itemsPerPageOptions: [
      { value: 5, title: '5' },
      { value: 10, title: '10' },
      { value: 20, title: '20' },
      { value: 30, title: '30' },
      { value: -1, title: 'All' }
    ],
    headers: [
      {
        title: 'Dessert (100g serving)',
        align: 'start',
        sortable: false,
        key: 'name'
      },
      { title: 'Calories', key: 'calories', align: 'end' },
      { title: 'Fat (g)', key: 'fat', align: 'end' },
      { title: 'Carbs (g)', key: 'carbs', align: 'end' },
      { title: 'Protein (g)', key: 'protein', align: 'end' },
      { title: 'Iron (%)', key: 'iron', align: 'end' }
    ],
    loading: true,
    itemLength: 0,
    itemValue: 'name'
  })

  const loadItems = ({ page, itemsPerPage, sortBy }) => {
    state.loading = true

    FakeAPI.fetch({ page, itemsPerPage, sortBy })
        .then(({ items, total }) => {
          state.items = items
          state.itemLength = total
        })
        .finally(() => {
          state.loading = false
        })
  }

  const desserts = [
    {
      name: 'Frozen Yogurt',
      calories: 159,
      fat: 6.0,
      carbs: 24,
      protein: 4.0,
      iron: '1'
    },
    {
      name: 'Jelly bean',
      calories: 375,
      fat: 0.0,
      carbs: 94,
      protein: 0.0,
      iron: '0'
    },
    {
      name: 'KitKat',
      calories: 518,
      fat: 26.0,
      carbs: 65,
      protein: 7,
      iron: '6'
    },
    {
      name: 'Eclair',
      calories: 262,
      fat: 16.0,
      carbs: 23,
      protein: 6.0,
      iron: '7'
    },
    {
      name: 'Gingerbread',
      calories: 356,
      fat: 16.0,
      carbs: 49,
      protein: 3.9,
      iron: '16'
    },
    {
      name: 'Ice cream sandwich',
      calories: 237,
      fat: 9.0,
      carbs: 37,
      protein: 4.3,
      iron: '1'
    },
    {
      name: 'Lollipop',
      calories: 392,
      fat: 0.2,
      carbs: 98,
      protein: 0,
      iron: '2'
    },
    {
      name: 'Cupcake',
      calories: 305,
      fat: 3.7,
      carbs: 67,
      protein: 4.3,
      iron: '8'
    },
    {
      name: 'Honeycomb',
      calories: 408,
      fat: 3.2,
      carbs: 87,
      protein: 6.5,
      iron: '45'
    },
    {
      name: 'Donut',
      calories: 452,
      fat: 25.0,
      carbs: 51,
      protein: 4.9,
      iron: '22'
    }
  ]

  const FakeAPI = {
    async fetch ({ page, itemsPerPage, sortBy }) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const start = (page - 1) * itemsPerPage
          const end = start + itemsPerPage
          const items = desserts.slice()

          if (sortBy.length) {
            const sortKey = sortBy[0].key
            const sortOrder = sortBy[0].order
            items.sort((a, b) => {
              const aValue = a[sortKey]
              const bValue = b[sortKey]
              return sortOrder === 'desc' ? bValue - aValue : aValue - bValue
            })
          }

          resolve({ items, total: items.length })
        }, 500)
      })
    }
  }
</script>
<docs lang="md">
Data Table Documentation
</docs>
