import { h } from "vue"
import FoxuiTooltip from './FoxuiTooltip.vue'

describe('<FoxuiTooltip />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(FoxuiTooltip), {})
    })
})
