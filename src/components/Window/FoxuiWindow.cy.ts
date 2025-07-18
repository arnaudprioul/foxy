import { h } from "vue"
import FoxuiWindow from './FoxuiWindow.vue'

describe('<FoxuiWindow />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(FoxuiWindow), {})
    })
})
