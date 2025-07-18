import { h } from "vue"
import OrigamContainer from './OrigamContainer.vue'

describe('<OrigamContainer />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(OrigamContainer), {})
    })
})
