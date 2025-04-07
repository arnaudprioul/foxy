import FoxySelectionControlGroup from './FoxySelectionControlGroup.vue'
import { h } from "vue"

describe('<FoxySelectionControlGroup />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(h(FoxySelectionControlGroup), {})
  })
})
