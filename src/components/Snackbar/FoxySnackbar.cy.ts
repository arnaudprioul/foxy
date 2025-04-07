import FoxySnackbar from './FoxySnackbar.vue'
import { h } from "vue"

describe('<FoxySnackbar />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(h(FoxySnackbar), {})
  })
})
