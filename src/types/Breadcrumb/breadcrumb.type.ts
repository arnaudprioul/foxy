import { FoxyBreadcrumb } from "@foxy/components"
import type { IBreadcrumbItemProps } from '@foxy/interfaces'

export type TBreadcrumbItem = string | Partial<IBreadcrumbItemProps> | never

export type TFoxyBreadcrumb = InstanceType<typeof FoxyBreadcrumb>
