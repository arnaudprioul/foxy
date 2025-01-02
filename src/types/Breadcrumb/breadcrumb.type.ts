import { FoxyBreadcrumb } from "@foxy/components"
import { IBreadcrumbItemProps } from '@foxy/interfaces'

export type TBreadcrumbItem = string | Partial<IBreadcrumbItemProps> | never

export type TFoxyBreadcrumb = InstanceType<typeof FoxyBreadcrumb>
