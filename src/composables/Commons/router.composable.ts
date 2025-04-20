import { useGoTo } from "@foxy/composables"
import { IN_BROWSER } from '@foxy/consts'
import { ILink, ILinkProps, IScrollToProps, ITagProps } from '@foxy/interfaces'
import { deepEqual, getCurrentInstance, getTargetBox, hasEvent } from '@foxy/utils'

import { computed, nextTick, onScopeDispose, Ref, resolveDynamicComponent, SetupContext, toRef } from 'vue'
import {
  NavigationGuardNext,
  RouteLocationNormalizedLoaded,
  Router,
  RouterLink as _RouterLink,
  UseLinkOptions
} from 'vue-router'


export function useRoute (): Ref<RouteLocationNormalizedLoaded | undefined> {
    const vm = getCurrentInstance('useRoute')

    // @ts-expect-error TODO
    return computed(() => vm?.proxy?.$route)
}

export function useRouter (): Router | undefined {
    // @ts-expect-error TODO
    return getCurrentInstance('useRouter')?.proxy?.$router
}

export function useLink (props: ILinkProps & ITagProps & IScrollToProps, attrs: SetupContext['attrs']): ILink {
    const RouterLink = resolveDynamicComponent('RouterLink') as typeof _RouterLink | string

    const goTo = useGoTo()

    const isLink = computed(() => !!(props.href || props.to))
    const isClickable = computed(() => {
        return isLink?.value || hasEvent(attrs, 'click') || hasEvent(props, 'click')
    })
    const tag = isLink.value ? 'a' : props.tag ?? 'div'

    if (typeof RouterLink === 'string') {
        return {
            tag,
            isLink,
            isClickable,
            href: toRef(props, 'href')
        }
    }

    const link = props.to ? RouterLink.useLink(props as UseLinkOptions) : undefined
    const route = useRoute()

    return {
        tag,
        isLink,
        isClickable,
        route: link?.route,
        navigate: props.internalScrollable ? goTo : link?.navigate,
        isActive: link && computed(() => {
            if (!props.exact) return link.isActive?.value
            if (!route.value) return link.isExactActive?.value
            if (props.internalScrollable && props.href) {
                const idMatchResult = /#([^#]+)$/.exec(props.href)

                if (idMatchResult) {
                    const linkEl = document.getElementById(idMatchResult[1])

                    if (linkEl) {
                        const targetBox = getTargetBox(linkEl)

                        // TODO - Set active when anchor box target is in viewport
                        console.log(targetBox)
                    }
                }
            }

            return link.isExactActive?.value && deepEqual(link.route.value.query, route.value.query)
        }),
        href: computed(() => props.to ? link?.route.value.href : props.href)
    }
}

let inTransition = false

export function useBackButton (router: Router | undefined, cb: (next: NavigationGuardNext) => void) {
    let popped = false
    let removeBefore: (() => void) | undefined
    let removeAfter: (() => void) | undefined

    if (IN_BROWSER) {
        nextTick(() => {
            window.addEventListener('popstate', onPopstate)
            if (router) {
                removeBefore = router.beforeEach((_to, _from, next) => {
                    if (!inTransition) {
                        setTimeout(() => {
                            if (popped) {
                                cb(next)
                            } else {
                                next()
                            }
                        })
                    } else {
                        if (popped) {
                            cb(next)
                        } else {
                            next()
                        }
                    }
                    inTransition = true
                })
                removeAfter = router.afterEach(() => {
                    inTransition = false
                })
            }
        })
        onScopeDispose(() => {
            window.removeEventListener('popstate', onPopstate)
            removeBefore?.()
            removeAfter?.()
        })
    }

    const onPopstate = (e: PopStateEvent) => {
        if (e.state?.replaced) return

        popped = true
        setTimeout(() => (popped = false))
    }
}
