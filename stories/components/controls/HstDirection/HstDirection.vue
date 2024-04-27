<template>
  <hst-select
      v-model="state.direction"
      :options="directionList"
      :title="getTitle"
      @update:model-value="handleChange"
  ></hst-select>
</template>

<script lang="ts" setup>
import { Ref, ref } from 'vue'
import { directionList } from '@stories/const/direction.const'

import { TTitleProp } from '@stories/types/title.type'

import useTitle from '@stories/composables/title.composable'

const props = defineProps<{
  modelValue?: string
} & TTitleProp>()

const emit = defineEmits(['update:modelValue'])

const { getTitle } = useTitle(props.title, 'Direction')

const state: {
  direction?: Ref<string>
} = {
  direction: ref('')
}

if (props.modelValue) {
  state.direction = ref(props.modelValue)
}

const handleChange = (value: string) => {
  emit('update:modelValue', value)
}
</script>
