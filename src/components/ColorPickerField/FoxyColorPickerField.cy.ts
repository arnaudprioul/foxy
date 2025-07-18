import { h } from "vue"
import FoxyColorPickerField from './FoxyColorPickerField.vue'

describe('<FoxyColorPickerField />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(FoxyColorPickerField), {})
    })
})
