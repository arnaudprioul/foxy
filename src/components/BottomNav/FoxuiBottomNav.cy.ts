import { h } from "vue"
import FoxuiBottomNav from './FoxuiBottomNav.vue'

describe('<FoxuiBottomNav />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(FoxuiBottomNav), {})
    })
})
