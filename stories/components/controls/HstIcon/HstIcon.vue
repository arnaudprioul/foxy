<template>
  <hst-select
      v-model="icon"
      :options="iconList"
      :title="getTitle"
      @update:model-value="handleChange"
  ></hst-select>
</template>

<script lang="ts" setup>
import { Ref, ref } from 'vue'

import { iconList } from '@stories/const/icon.const'

import { TTitleProp } from '@stories/types/title.type'

import useTitle from '@stories/composables/title.composable'

const props = defineProps<{
  modelValue?: string,
} & TTitleProp>()

const emit = defineEmits(['update:modelValue'])

const { getTitle } = useTitle(props.title, 'Icon')

const icon: Ref<string> = ref('')

if (props.modelValue) {
  icon.value = props.modelValue
}

const handleChange = (value: string) => {
  emit('update:modelValue', value || undefined)
}
</script>
