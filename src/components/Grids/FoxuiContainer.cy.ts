import { h } from "vue"
import FoxuiContainer from './FoxuiContainer.vue'

describe('<FoxuiContainer />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(FoxuiContainer), {})
    })
})
