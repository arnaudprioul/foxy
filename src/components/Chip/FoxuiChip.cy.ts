import { h } from "vue"
import FoxuiChip from './FoxuiChip.vue'

describe('<FoxuiChip />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(FoxuiChip), {})
    })
})
