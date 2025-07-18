import { h } from "vue"
import OrigamVirtualScroll from './OrigamVirtualScroll.vue'

describe('<OrigamVirtualScroll />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(OrigamVirtualScroll), {})
    })
})
