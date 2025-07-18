import { h } from "vue"
import FoxuiChipGroup from './FoxuiChipGroup.vue'

describe('<FoxuiChipGroup />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(FoxuiChipGroup), {})
    })
})
