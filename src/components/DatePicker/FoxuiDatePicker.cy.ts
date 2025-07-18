import { h } from "vue"
import FoxuiDatePicker from './FoxuiDatePicker.vue'

describe('<FoxuiDatePicker />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(FoxuiDatePicker), {})
    })
})
