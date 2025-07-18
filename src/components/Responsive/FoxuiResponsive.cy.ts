import { h } from "vue"
import FoxuiResponsive from './FoxuiResponsive.vue'

describe('<FoxuiResponsive />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(FoxuiResponsive), {})
    })
})
