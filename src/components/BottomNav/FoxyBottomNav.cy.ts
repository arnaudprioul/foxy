import { h } from "vue"
import FoxyBottomNav from './FoxyBottomNav.vue'

describe('<FoxyBottomNav />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(FoxyBottomNav), {})
    })
})
