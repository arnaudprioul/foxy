import { h } from "vue"
import FoxuiParallax from './FoxuiParallax.vue'

describe('<FoxuiParallax />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(FoxuiParallax), {})
    })
})
