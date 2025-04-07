import FoxyDialogConfirmation from './FoxyDialogConfirmation.vue'
import { h } from "vue"

describe('<FoxyDialogConfirmation />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(h(FoxyDialogConfirmation), {})
  })
})
