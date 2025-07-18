import { h } from "vue"
import OrigamBreadcrumb from './OrigamBreadcrumb.vue'

describe('<OrigamBreadcrumb />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(OrigamBreadcrumb), {})
    })
})
