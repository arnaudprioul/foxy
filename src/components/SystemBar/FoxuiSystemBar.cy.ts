import { h } from "vue"
import FoxuiSystemBar from './FoxuiSystemBar.vue'

describe('<FoxuiSystemBar />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(FoxuiSystemBar), {})
    })
})
