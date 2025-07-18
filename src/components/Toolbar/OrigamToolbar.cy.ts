import { h } from "vue"
import OrigamToolbar from './OrigamToolbar.vue'

describe('<OrigamToolbar />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(OrigamToolbar), {})
    })
})
