import { h } from "vue"
import FoxySnackbar from './FoxySnackbar.vue'

describe('<FoxySnackbar />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(FoxySnackbar), {})
    })
})
