import { h } from "vue"
import FoxuiTitle from './FoxuiTitle.vue'

describe('<FoxuiTitle />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(FoxuiTitle), {})
    })
})
