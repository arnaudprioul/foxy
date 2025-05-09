import { h } from "vue"
import FoxyCarousel from './FoxyCarousel.vue'

describe('<FoxyCarousel />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(FoxyCarousel), {})
    })
})
