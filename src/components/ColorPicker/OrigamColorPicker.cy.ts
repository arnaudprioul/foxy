import { h } from "vue"
import OrigamColorPicker from './OrigamColorPicker.vue'

describe('<OrigamColorPicker />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(OrigamColorPicker), {})
    })
})
