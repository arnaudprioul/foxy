import { h } from "vue"
import OrigamChip from './OrigamChip.vue'

describe('<OrigamChip />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(OrigamChip), {})
    })
})
