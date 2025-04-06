<template>
  <hst-select
      v-model="icon"
      :options="iconList"
      :title="getTitle"
      @update:model-value="handleChange"
  ></hst-select>
</template>

<script
    lang="ts"
    setup
>
  import { TIcon } from '@foxy/types'

  import useTitle from '@stories/composables/title.composable'

  import { iconList } from '@stories/const/icon.const'

  import { TTitleProp } from '@stories/types/title.type'

  import { Ref, ref } from 'vue'

  const props = defineProps<{
    modelValue?: string,
  } & TTitleProp>()

  const emit = defineEmits(['update:modelValue'])

  const { getTitle } = useTitle(props.title, 'Icon')

  const icon: Ref<TIcon> = ref('')

  if (props.modelValue) {
    icon.value = props.modelValue
  }

  const handleChange = (value: string) => {
    emit('update:modelValue', value || undefined)
  }
</script>
