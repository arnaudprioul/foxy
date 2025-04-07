import FoxyTooltip from './FoxyTooltip.vue'
import { h } from "vue"

describe('<FoxyTooltip />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(h(FoxyTooltip), {})
  })
})
