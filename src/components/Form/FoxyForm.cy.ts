import FoxyForm from './FoxyForm.vue'
import { h } from "vue"

describe('<FoxyForm />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(h(FoxyForm), {})
  })
})
