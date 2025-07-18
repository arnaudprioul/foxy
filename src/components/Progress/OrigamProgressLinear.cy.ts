import { h } from "vue"
import OrigamProgressLinear from './OrigamProgressLinear.vue'

describe('<OrigamProgressLinear />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(OrigamProgressLinear), {})
    })
})
