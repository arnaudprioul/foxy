import { h } from "vue"
import OrigamFileField from './OrigamFileField.vue'

describe('<OrigamFileField />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(OrigamFileField), {})
    })
})
