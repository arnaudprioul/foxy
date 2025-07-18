import { h } from "vue"
import FoxyTitle from './FoxyTitle.vue'

describe('<FoxyTitle />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(FoxyTitle), {})
    })
})
