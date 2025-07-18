import { h } from "vue"
import OrigamInfiniteScroll from './OrigamInfiniteScroll.vue'

describe('<OrigamInfiniteScroll />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(OrigamInfiniteScroll), {})
    })
})
