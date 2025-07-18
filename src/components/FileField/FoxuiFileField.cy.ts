import { h } from "vue"
import FoxuiFileField from './FoxuiFileField.vue'

describe('<FoxuiFileField />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(FoxuiFileField), {})
    })
})
