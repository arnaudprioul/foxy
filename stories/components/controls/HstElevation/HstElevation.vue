<template>
  <hst-slider
      v-model="state.elevation"
      :max="24"
      :min="0"
      :title="getTitle"
      @update:model-value="handleChange"
  ></hst-slider>
</template>

<script lang="ts" setup>
import { Ref, ref } from 'vue'

import { titleProp } from '@stories/const/title.const'

import useTitle from '@stories/composables/title.composable'

const props = defineProps({
  modelValue: {
    type: [Number, String],
    validator (v) {
      const value = parseInt(v)
      return !isNaN(value) && value >= 0 && value <= 24
    }
  },
  ...titleProp
})

const emit = defineEmits(['update:modelValue'])

const { getTitle } = useTitle(props.title, 'Elevation')

const state: {
  elevation?: Ref<string | number>
} = {
  elevation: ref('')
}

if (props.modelValue) {
  state.elevation = ref(props.modelValue)
}

const handleChange = (value: string) => {
  emit('update:modelValue', value || undefined)
}
</script>
