import { h } from "vue"
import OrigamRadio from './OrigamRadio.vue'

describe('<OrigamRadio />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(OrigamRadio), {})
    })
})
