import { h } from "vue"
import FoxyRatingField from './FoxyRatingField.vue'

describe('<FoxyRatingField />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(FoxyRatingField), {})
    })
})
