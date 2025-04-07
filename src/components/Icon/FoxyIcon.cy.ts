import FoxyIcon from './FoxyIcon.vue'
import { h } from "vue"

describe('<FoxyIcon />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(h(FoxyIcon), {})
  })
})
