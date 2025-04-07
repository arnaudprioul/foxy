import FoxyProgress from './FoxyProgress.vue'
import { h } from "vue"

describe('<FoxyProgress />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(h(FoxyProgress), {})
  })
})
