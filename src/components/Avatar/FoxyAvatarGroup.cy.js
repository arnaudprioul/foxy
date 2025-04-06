import FoxyAvatarGroup from './FoxyAvatarGroup.vue'
import { h } from "vue";

describe('<FoxyAvatarGroup />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(h(FoxyAvatarGroup), {})
  })
})
