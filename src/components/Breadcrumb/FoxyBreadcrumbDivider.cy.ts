import { h } from "vue"
import FoxyBreadcrumbDivider from './FoxyBreadcrumbDivider.vue'

describe('<FoxyBreadcrumbDivider />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(FoxyBreadcrumbDivider), {})
    })
})
