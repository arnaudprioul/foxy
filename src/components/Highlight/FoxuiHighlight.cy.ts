import { h } from "vue"
import FoxuiHighlight from './FoxuiHighlight.vue'

describe('<FoxuiHighlight />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(FoxuiHighlight), {})
    })
})
