import { h } from "vue"
import FoxySelectionControlGroup from './FoxySelectionControlGroup.vue'

describe('<FoxySelectionControlGroup />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(FoxySelectionControlGroup), {})
    })
})
