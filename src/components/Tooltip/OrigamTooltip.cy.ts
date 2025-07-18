import { h } from "vue"
import OrigamTooltip from './OrigamTooltip.vue'

describe('<OrigamTooltip />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(OrigamTooltip), {})
    })
})
