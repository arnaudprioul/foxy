<template>
  <Story
      group="pageBuilder"
      title="Edit Wrapper"
  >
    <template #default>
	    <foxui-main>
		    <foxui-edit-wrapper>
			    <foxui-btn text="test"/>
		    </foxui-edit-wrapper>
	    </foxui-main>
    </template>
  </Story>
</template>

<script
    lang="ts"
    setup
>
	import { FoxuiBtn, FoxuiEditWrapper } from '@foxui/components'
</script>
<docs lang="md">
Css Box Documentation
</docs>
