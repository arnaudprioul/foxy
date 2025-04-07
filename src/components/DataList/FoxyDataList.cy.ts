import FoxyDataList from './FoxyDataList.vue'
import { h } from "vue"

describe('<FoxyDataList />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(h(FoxyDataList), {})
  })
})
