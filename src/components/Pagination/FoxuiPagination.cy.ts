import { h } from "vue"
import FoxuiPagination from './FoxuiPagination.vue'

describe('<FoxuiPagination />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(FoxuiPagination), {})
    })
})
