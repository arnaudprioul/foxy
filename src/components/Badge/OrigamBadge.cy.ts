import { h } from "vue"
import OrigamBadge from './OrigamBadge.vue'

describe('<OrigamBadge />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(OrigamBadge), {})
    })
})
