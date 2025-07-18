import { h } from "vue"
import OrigamLoader from './OrigamLoader.vue'

describe('<OrigamLoader />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(OrigamLoader), {})
    })
})
