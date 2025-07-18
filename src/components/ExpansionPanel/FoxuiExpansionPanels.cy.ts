import { h } from "vue"
import FoxuiExpansionPanels from './FoxuiExpansionPanels.vue'

describe('<FoxuiExpansionPanels />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(FoxuiExpansionPanels), {})
    })
})
