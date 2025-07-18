import { h } from "vue"
import FoxyCounter from './FoxyCounter.vue'

describe('<FoxyCounter />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(FoxyCounter), {})
    })
})
