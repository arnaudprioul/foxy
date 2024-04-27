import { ComputedRef, Ref } from 'vue'
import { RouteLocationRaw, useLink as _useLink } from 'vue-router'

import { TEventProp } from '@foxy/types'

export interface ILinkProps {
  href?: string
  replace?: boolean
  to?: RouteLocationRaw
  exact?: boolean
}

export interface ILinkListenersProps {
  onClick?: TEventProp | undefined
  onClickOnce?: TEventProp | undefined
}

export interface ILink extends Omit<Partial<ReturnType<typeof _useLink>>, 'href'> {
  tag: string
  isLink: ComputedRef<boolean>
  isClickable: ComputedRef<boolean>
  href: Ref<string | undefined>
}