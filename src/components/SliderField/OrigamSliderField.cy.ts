import { h } from "vue"
import OrigamSliderField from './OrigamSliderField.vue'

describe('<OrigamSliderField />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(OrigamSliderField), {})
    })
})
