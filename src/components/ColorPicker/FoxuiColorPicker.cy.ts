import { h } from "vue"
import FoxuiColorPicker from './FoxuiColorPicker.vue'

describe('<FoxuiColorPicker />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(FoxuiColorPicker), {})
    })
})
