import { h } from "vue"
import FoxyDataTable from './FoxyDataTable.vue'

describe('<FoxyDataTable />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(FoxyDataTable), {})
    })
})
