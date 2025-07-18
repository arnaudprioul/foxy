import { h } from "vue"
import FoxuiDivider from './FoxuiDivider.vue'

describe('<FoxuiDivider />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(FoxuiDivider), {})
    })
})
