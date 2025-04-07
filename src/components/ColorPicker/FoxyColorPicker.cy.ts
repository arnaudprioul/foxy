import FoxyColorPicker from './FoxyColorPicker.vue'
import { h } from "vue"

describe('<FoxyColorPicker />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(h(FoxyColorPicker), {})
  })
})
