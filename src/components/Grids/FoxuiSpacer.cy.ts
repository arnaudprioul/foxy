import { h } from "vue"
import FoxuiSpacer from './FoxuiSpacer.vue'

describe('<FoxuiSpacer />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(FoxuiSpacer), {})
    })
})
