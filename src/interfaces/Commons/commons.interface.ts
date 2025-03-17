import { IDateOptions, IDisplayOptions, IGoToOptions, IRtlOptions } from '@foxy/interfaces'
import { ILocaleOptions } from "@foxy/interfaces/Commons/locale.interface.ts"

import { TIconOptions, TSSROptions } from '@foxy/types'
import { ComponentPropsOptions, ExtractPropTypes, StyleValue } from 'vue'

export interface IFoxyOptions {
  aliases?: any
  blueprint?: IBlueprint
  components?: any
  directives?: any
  icons?: TIconOptions
  display?: IDisplayOptions
  ssr?: TSSROptions
  goTo?: IGoToOptions
  date?: IDateOptions
  locale?: ILocaleOptions & IRtlOptions
}

export interface IBlueprint extends Omit<IFoxyOptions, 'blueprint'> {
}

export interface ICommonsComponentProps {
  id?: string,
  class?: string | Array<string> | Object,
  style?: string | Array<string> | Object | StyleValue
}

export interface ITagProps {
  tag?: string
}

export interface ISample {
  t: number
  d: number
}

export interface IIntersectionObserverInit {
  root?: Element | Document | null;
  rootMargin?: string;
  threshold?: number | Array<number>;
}

export interface IFilterPropsOptions<PropsOptions extends Readonly<ComponentPropsOptions>, Props = ExtractPropTypes<PropsOptions>> {
  filterProps<
      T extends Partial<Props>,
      U extends Extract<keyof T, string>
  > (properties: T, excludes?: string[]): Partial<Pick<T, U>>
  props: PropsOptions
}
