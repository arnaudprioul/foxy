import { h } from "vue"
import OrigamDataTable from './OrigamDataTable.vue'

describe('<OrigamDataTable />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(OrigamDataTable), {})
    })
})
