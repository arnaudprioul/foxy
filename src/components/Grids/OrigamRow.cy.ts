import { h } from "vue"
import OrigamRow from './OrigamRow.vue'

describe('<OrigamRow />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(OrigamRow), {})
    })
})
