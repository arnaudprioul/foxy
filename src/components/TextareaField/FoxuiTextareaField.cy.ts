import { h } from "vue"
import FoxuiTextareaField from './FoxuiTextareaField.vue'

describe('<FoxuiTextareaField />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(FoxuiTextareaField), {})
    })
})
