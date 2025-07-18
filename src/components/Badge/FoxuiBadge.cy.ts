import { h } from "vue"
import FoxuiBadge from './FoxuiBadge.vue'

describe('<FoxuiBadge />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(FoxuiBadge), {})
    })
})
