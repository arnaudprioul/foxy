import { h } from "vue"
import FoxuiCol from './FoxuiCol.vue'

describe('<FoxuiCol />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(FoxuiCol), {})
    })
})
