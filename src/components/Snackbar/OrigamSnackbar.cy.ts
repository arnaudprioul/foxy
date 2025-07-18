import { h } from "vue"
import OrigamSnackbar from './OrigamSnackbar.vue'

describe('<OrigamSnackbar />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(OrigamSnackbar), {})
    })
})
