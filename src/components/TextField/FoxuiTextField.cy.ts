import { h } from "vue"
import FoxuiTextField from './FoxuiTextField.vue'

describe('<FoxuiTextField />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(FoxuiTextField), {})
    })
})
