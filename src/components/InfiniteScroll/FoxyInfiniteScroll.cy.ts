import { h } from "vue"
import FoxyInfiniteScroll from './FoxyInfiniteScroll.vue'

describe('<FoxyInfiniteScroll />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(FoxyInfiniteScroll), {})
    })
})
