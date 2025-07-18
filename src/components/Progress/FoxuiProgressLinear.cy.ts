import { h } from "vue"
import FoxuiProgressLinear from './FoxuiProgressLinear.vue'

describe('<FoxuiProgressLinear />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(FoxuiProgressLinear), {})
    })
})
