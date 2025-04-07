import FoxyRatingField from './FoxyRatingField.vue'
import { h } from "vue"

describe('<FoxyRatingField />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(h(FoxyRatingField), {})
  })
})
