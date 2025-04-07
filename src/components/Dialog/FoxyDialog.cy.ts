import FoxyDialog from './FoxyDialog.vue'
import { h } from "vue"

describe('<FoxyDialog />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(h(FoxyDialog), {})
  })
})
