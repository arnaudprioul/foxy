import { h } from "vue"
import OrigamSelect from './OrigamSelect.vue'

describe('<OrigamSelect />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(OrigamSelect), {})
    })
})
