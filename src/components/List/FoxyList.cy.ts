import FoxyList from './FoxyList.vue'
import { h } from "vue"

describe('<FoxyList />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(h(FoxyList), {})
  })
})
