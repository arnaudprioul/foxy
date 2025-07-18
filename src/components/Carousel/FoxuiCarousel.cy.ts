import { h } from "vue"
import FoxuiCarousel from './FoxuiCarousel.vue'

describe('<FoxuiCarousel />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(FoxuiCarousel), {})
    })
})
