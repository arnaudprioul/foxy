import { h } from "vue"
import FoxuiForm from './FoxuiForm.vue'

describe('<FoxuiForm />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(FoxuiForm), {})
    })
})
