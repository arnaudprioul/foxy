import { h } from "vue"
import FoxyBreadcrumbItem from './FoxyBreadcrumbItem.vue'

describe('<FoxyBreadcrumbItem />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(FoxyBreadcrumbItem), {})
    })
})
