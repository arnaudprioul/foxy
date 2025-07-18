import { h } from "vue"
import FoxyChipGroup from './FoxyChipGroup.vue'

describe('<FoxyChipGroup />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(FoxyChipGroup), {})
    })
})
