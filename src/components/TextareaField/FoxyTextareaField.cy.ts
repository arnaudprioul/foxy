import FoxyTextareaField from './FoxyTextareaField.vue'
import { h } from "vue"

describe('<FoxyTextareaField />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(h(FoxyTextareaField), {})
  })
})
