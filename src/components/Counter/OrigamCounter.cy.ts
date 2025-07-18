import { h } from "vue"
import OrigamCounter from './OrigamCounter.vue'

describe('<OrigamCounter />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(OrigamCounter), {})
    })
})
