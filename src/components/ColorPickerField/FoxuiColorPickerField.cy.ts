import { h } from "vue"
import FoxuiColorPickerField from './FoxuiColorPickerField.vue'

describe('<FoxuiColorPickerField />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(FoxuiColorPickerField), {})
    })
})
