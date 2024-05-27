<template>
  <hst-select
      v-model="state.density"
      :options="densityList"
      :title="getTitle"
      @update:model-value="handleChange"
  ></hst-select>
</template>

<script lang="ts" setup>
import { Ref, ref } from 'vue'

import { densityList } from '@stories/const/density.const'
import { TTitleProp } from '@stories/types/title.type'
import useTitle from '@stories/composables/title.composable'

const props = defineProps<{
  modelValue?: string
} & TTitleProp>()

const emit = defineEmits(['update:modelValue'])

const { getTitle } = useTitle(props.title, 'Density')

const state: {
  density?: Ref<string>
} = {
  density: ref('default')
}

if (props.modelValue) {
  state.density = ref(props.modelValue)
}

const handleChange = (value: string) => {
  emit('update:modelValue', value)
}
</script>
