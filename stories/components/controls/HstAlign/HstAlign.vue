<template>
  <hst-select
      v-model="align"
      :options="alignList"
      :title="getTitle"
      @update:model-value="handleChange"
  />
</template>

<script lang="ts" setup>
import { Ref, ref } from 'vue'

import { alignList } from '@stories/const/align.const'

import { TTitleProp } from '@stories/types/title.type'

import useTitle from '@stories/composables/title.composable'

const props = defineProps<{
  modelValue?: string
} & TTitleProp>()

const emit = defineEmits(['update:modelValue'])

const { getTitle } = useTitle(props.title, 'Variant')

const variant: Ref<string> = ref('start')

if (props.modelValue) {
  variant.value = props.modelValue
}

const handleChange = (value: string) => {
  emit('update:modelValue', value)
}
</script>
