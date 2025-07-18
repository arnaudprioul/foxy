import { h } from "vue"
import OrigamTitle from './OrigamTitle.vue'

describe('<OrigamTitle />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(OrigamTitle), {})
    })
})
