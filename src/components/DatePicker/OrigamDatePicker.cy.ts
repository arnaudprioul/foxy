import { h } from "vue"
import OrigamDatePicker from './OrigamDatePicker.vue'

describe('<OrigamDatePicker />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(OrigamDatePicker), {})
    })
})
