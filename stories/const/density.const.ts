import { DENSITY } from '@foxy/enums'

import { ref } from 'vue'

export const densityList = ref([
    {
        label: 'Default',
        value: DENSITY.DEFAULT
    },
    {
        label: 'Compact',
        value: DENSITY.COMPACT
    }
])
