import FoxyFileField from './FoxyFileField.vue'
import { h } from "vue"

describe('<FoxyFileField />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(h(FoxyFileField), {})
  })
})
