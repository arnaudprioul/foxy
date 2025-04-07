import FoxySheet from './FoxySheet.vue'
import { h } from "vue"

describe('<FoxySheet />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(h(FoxySheet), {})
  })
})
