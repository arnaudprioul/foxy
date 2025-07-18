import { h } from "vue"
import OrigamPasswordField from './OrigamPasswordField.vue'

describe('<OrigamPasswordField />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(OrigamPasswordField), {})
    })
})
