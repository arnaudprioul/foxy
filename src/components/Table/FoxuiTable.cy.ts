import { h } from "vue"
import FoxuiTable from './FoxuiTable.vue'

describe('<FoxuiTable />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(FoxuiTable), {})
    })
})
