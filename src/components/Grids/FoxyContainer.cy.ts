import { h } from "vue"
import FoxyContainer from './FoxyContainer.vue'

describe('<FoxyContainer />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(FoxyContainer), {})
    })
})
