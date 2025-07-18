import { h } from "vue"
import OrigamSystemBar from './OrigamSystemBar.vue'

describe('<OrigamSystemBar />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(OrigamSystemBar), {})
    })
})
