import { h } from "vue"
import FoxyColorPicker from './FoxyColorPicker.vue'

describe('<FoxyColorPicker />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(FoxyColorPicker), {})
    })
})
