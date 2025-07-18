import { h } from "vue"
import FoxuiSnackbar from './FoxuiSnackbar.vue'

describe('<FoxuiSnackbar />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(FoxuiSnackbar), {})
    })
})
