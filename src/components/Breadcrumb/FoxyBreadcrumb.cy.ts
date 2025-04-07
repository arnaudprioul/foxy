import FoxyBreadcrumb from './FoxyBreadcrumb.vue'
import { h } from "vue"

describe('<FoxyBreadcrumb />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(h(FoxyBreadcrumb), {})
  })
})
