import { computed } from 'vue'

export default function useTitle (title: string | undefined, defaultTitle: string) {
    const getTitle = computed(() => title ?? defaultTitle)

    return { getTitle }
}
