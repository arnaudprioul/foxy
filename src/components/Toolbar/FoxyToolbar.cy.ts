import FoxyToolbar from './FoxyToolbar.vue'
import { h } from "vue"

describe('<FoxyToolbar />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(h(FoxyToolbar), {})
  })
})
