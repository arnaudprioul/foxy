import { h } from "vue"
import OrigamHighlight from './OrigamHighlight.vue'

describe('<OrigamHighlight />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(OrigamHighlight), {})
    })
})
