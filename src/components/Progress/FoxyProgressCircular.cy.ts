import FoxyProgressCircular from './FoxyProgressCircular.vue'
import { h } from "vue"

describe('<FoxyProgressCircular />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(h(FoxyProgressCircular), {})
  })
})
