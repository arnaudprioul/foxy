import { h } from "vue"
import FoxuiOtpInputField from './FoxuiOtpInputField.vue'

describe('<FoxuiOtpInputField />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(FoxuiOtpInputField), {})
    })
})
