import { h } from "vue"
import OrigamChipGroup from './OrigamChipGroup.vue'

describe('<OrigamChipGroup />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(OrigamChipGroup), {})
    })
})
