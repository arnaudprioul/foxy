import { h } from "vue"
import OrigamColorPickerField from './OrigamColorPickerField.vue'

describe('<OrigamColorPickerField />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(OrigamColorPickerField), {})
    })
})
