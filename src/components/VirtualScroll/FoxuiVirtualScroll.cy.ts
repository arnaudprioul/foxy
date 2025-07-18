import { h } from "vue"
import FoxuiVirtualScroll from './FoxuiVirtualScroll.vue'

describe('<FoxuiVirtualScroll />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(FoxuiVirtualScroll), {})
    })
})
