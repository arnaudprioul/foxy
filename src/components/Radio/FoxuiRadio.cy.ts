import { h } from "vue"
import FoxuiRadio from './FoxuiRadio.vue'

describe('<FoxuiRadio />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(FoxuiRadio), {})
    })
})
