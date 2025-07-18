import { FoxuiBreadcrumb } from "@foxui/components"
import type { IBreadcrumbItemProps } from '@foxui/interfaces'

export type TBreadcrumbItem = string | Partial<IBreadcrumbItemProps> | never

export type TFoxuiBreadcrumb = InstanceType<typeof FoxuiBreadcrumb>
