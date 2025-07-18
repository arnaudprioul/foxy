import { h } from "vue"
import FoxuiRow from './FoxuiRow.vue'

describe('<FoxuiRow />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(FoxuiRow), {})
    })
})
