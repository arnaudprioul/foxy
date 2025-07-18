import { h } from "vue"
import FoxuiCounter from './FoxuiCounter.vue'

describe('<FoxuiCounter />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(FoxuiCounter), {})
    })
})
