import { h } from "vue"
import OrigamTextareaField from './OrigamTextareaField.vue'

describe('<OrigamTextareaField />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(OrigamTextareaField), {})
    })
})
