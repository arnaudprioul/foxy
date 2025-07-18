<template>
  <Story
      group="pageBuilder"
      title="Edit Wrapper"
  >
    <template #default>
	    <origam-main>
		    <origam-edit-wrapper>
			    <origam-btn text="test"/>
		    </origam-edit-wrapper>
	    </origam-main>
    </template>
  </Story>
</template>

<script
    lang="ts"
    setup
>
	import { OrigamBtn, OrigamEditWrapper } from '@origam/components'
</script>
<docs lang="md">
Css Box Documentation
</docs>
