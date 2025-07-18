import { h } from "vue"
import FoxuiToolbar from './FoxuiToolbar.vue'

describe('<FoxuiToolbar />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(FoxuiToolbar), {})
    })
})
