import { h } from "vue"
import OrigamDatePickerField from './OrigamDatePickerField.vue'

describe('<OrigamDatePickerField />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(OrigamDatePickerField), {})
    })
})
