import { h } from "vue"
import OrigamExpansionPanels from './OrigamExpansionPanels.vue'

describe('<OrigamExpansionPanels />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(OrigamExpansionPanels), {})
    })
})
