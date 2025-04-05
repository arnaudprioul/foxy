import { h } from "vue"
import FoxyContextualMenu from './FoxyContextualMenu.vue'

describe('<FoxyContextualMenu />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(h(FoxyContextualMenu, {

    }))
  })
})
