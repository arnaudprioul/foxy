import { h } from "vue"
import FoxuiInfiniteScroll from './FoxuiInfiniteScroll.vue'

describe('<FoxuiInfiniteScroll />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(FoxuiInfiniteScroll), {})
    })
})
