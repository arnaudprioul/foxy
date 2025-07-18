import { h } from "vue"
import OrigamDivider from './OrigamDivider.vue'

describe('<OrigamDivider />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(OrigamDivider), {})
    })
})
