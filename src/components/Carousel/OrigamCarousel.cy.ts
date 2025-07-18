import { h } from "vue"
import OrigamCarousel from './OrigamCarousel.vue'

describe('<OrigamCarousel />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(OrigamCarousel), {})
    })
})
