<template>
  <div>
    <hst-select
        v-if="!multiple"
        v-model="direction"
        :options="locations"
        :title="getTitle"
        @update:model-value="handleChange"
    />

    <hst-select
        v-else
        v-model="direction"
        :options="locations"
        :title="getTitle"
        @update:model-value="handleChange"
    />
  </div>

</template>

<script
    lang="ts"
    setup
>
	import useTitle from '@stories/composables/title.composable'

	import { locationList, multipleLocationList } from '@stories/const/location.const'

	import type { TTitleProp } from '@stories/types/title.type'
	import { computed, Ref, ref } from 'vue'

	const props = defineProps<{
    modelValue?: string,
    multiple?: boolean
  } & TTitleProp>()

  const emit = defineEmits(['update:modelValue'])

  const { getTitle } = useTitle(props.title, 'Direction')

  const direction: Ref<string> = ref('')

  if (props.modelValue) {
    direction.value = props.modelValue
  }

  const locations = computed(() => {
    return props.multiple ? multipleLocationList : locationList
  })

  const handleChange = (value: string) => {
    emit('update:modelValue', value)
  }
</script>
