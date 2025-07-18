import { h } from "vue"
import OrigamBottomNav from './OrigamBottomNav.vue'

describe('<OrigamBottomNav />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(OrigamBottomNav), {})
    })
})
