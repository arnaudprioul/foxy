import { h } from "vue"
import FoxuiBreadcrumb from './FoxuiBreadcrumb.vue'

describe('<FoxuiBreadcrumb />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(FoxuiBreadcrumb), {})
    })
})
