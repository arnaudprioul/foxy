import { h } from "vue"
import OrigamPagination from './OrigamPagination.vue'

describe('<OrigamPagination />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(OrigamPagination), {})
    })
})
