import { h } from "vue"
import FoxySpacer from './FoxySpacer.vue'

describe('<FoxySpacer />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(FoxySpacer), {})
    })
})
