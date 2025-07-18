import { h } from "vue"
import OrigamTable from './OrigamTable.vue'

describe('<OrigamTable />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(OrigamTable), {})
    })
})
