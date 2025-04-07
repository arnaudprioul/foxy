import FoxyOtpInputField from './FoxyOtpInputField.vue'
import { h } from "vue"

describe('<FoxyOtpInputField />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(h(FoxyOtpInputField), {})
  })
})
