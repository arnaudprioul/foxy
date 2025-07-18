import { h } from "vue"
import OrigamResponsive from './OrigamResponsive.vue'

describe('<OrigamResponsive />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(OrigamResponsive), {})
    })
})
