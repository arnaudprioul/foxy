import { h } from "vue"
import FoxuiDataTable from './FoxuiDataTable.vue'

describe('<FoxuiDataTable />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(FoxuiDataTable), {})
    })
})
