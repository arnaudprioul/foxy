import FoxyPasswordField from './FoxyPasswordField.vue'
import { h } from "vue"

describe('<FoxyPasswordField />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(h(FoxyPasswordField), {})
  })
})
