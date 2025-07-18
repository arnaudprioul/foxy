import { h } from "vue"
import FoxuiBreadcrumbDivider from './FoxuiBreadcrumbDivider.vue'

describe('<FoxuiBreadcrumbDivider />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(FoxuiBreadcrumbDivider), {})
    })
})
