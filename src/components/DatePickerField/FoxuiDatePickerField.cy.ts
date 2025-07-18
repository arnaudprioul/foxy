import { h } from "vue"
import FoxuiDatePickerField from './FoxuiDatePickerField.vue'

describe('<FoxuiDatePickerField />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(FoxuiDatePickerField), {})
    })
})
