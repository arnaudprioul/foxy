import { h } from "vue"
import OrigamParallax from './OrigamParallax.vue'

describe('<OrigamParallax />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(OrigamParallax), {})
    })
})
