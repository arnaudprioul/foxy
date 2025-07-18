import { h } from "vue"
import FoxyToolbar from './FoxyToolbar.vue'

describe('<FoxyToolbar />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(FoxyToolbar), {})
    })
})
