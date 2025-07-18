import { h } from "vue"
import OrigamBreadcrumbDivider from './OrigamBreadcrumbDivider.vue'

describe('<OrigamBreadcrumbDivider />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(OrigamBreadcrumbDivider), {})
    })
})
