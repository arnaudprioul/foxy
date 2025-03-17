<template>
  <div>
    <hst-checkbox
        v-if="!props.tile"
        v-model="rounded"
        title="Rounded"
        @update:model-value="handleRoundedChange"
    />
  </div>
</template>

<script
    lang="ts"
    setup
>
  import { ref, Ref } from 'vue'

  const props = defineProps<{
    rounded?: boolean | number,
    tile?: boolean,
    hideTile?: boolean
  }>()

  const emit = defineEmits(['update:rounded', 'update:tile'])

  const rounded: Ref<boolean | string> = ref(false)
  const tile: Ref<boolean> = ref(false)
  const hideTile: Ref<boolean> = ref(false)

  if (props.tile) {
    tile.value = props.tile
  }

  if (props.hideTile) {
    hideTile.value = props.hideTile
  }

  if (typeof props.rounded === 'boolean') {
    rounded.value = Boolean(props.rounded)
  }

  const handleRoundedChange = (value: boolean) => {
    emit('update:rounded', value)
  }

  const handleTileChange = (value: boolean) => {
    rounded.value = value ? '0' : false

    emit('update:rounded', value ? '0' : false)
    emit('update:tile', value)
  }
</script>
