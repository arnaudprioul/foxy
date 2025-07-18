import { h } from "vue"
import OrigamOtpInputField from './OrigamOtpInputField.vue'

describe('<OrigamOtpInputField />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(OrigamOtpInputField), {})
    })
})
