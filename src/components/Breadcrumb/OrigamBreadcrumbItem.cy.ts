import { h } from "vue"
import OrigamBreadcrumbItem from './OrigamBreadcrumbItem.vue'

describe('<OrigamBreadcrumbItem />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(OrigamBreadcrumbItem), {})
    })
})
