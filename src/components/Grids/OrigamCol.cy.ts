import { h } from "vue"
import OrigamCol from './OrigamCol.vue'

describe('<OrigamCol />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(OrigamCol), {})
    })
})
