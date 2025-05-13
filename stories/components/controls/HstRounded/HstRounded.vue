<template>
	<hst-select
			v-model="rounded"
			:options="[
				 { value: true, label: 'Rounded' },
				 { value: false, label: 'No Rounded' },
				 { value: '50%', label: 'Half Rounded' },
				 { value: '4px', label: '4px Rounded' },
				 { value: '8px', label: '8px Rounded' },
				 { value: '16px', label: '16px Rounded' },
		 ]"
			title="Rounded"
	/>
</template>

<script
    lang="ts"
    setup
>
	import { useVModel } from "@foxy/composables"

	const props = defineProps<{
    rounded?: boolean | number,
    hideTile?: boolean
  }>()

  const emit = defineEmits(['update:rounded', 'update:tile'])

	const rounded = useVModel(props, 'rounded', 0)

  const handleRoundedChange = (value: boolean) => {
    emit('update:rounded', value)
  }
</script>
