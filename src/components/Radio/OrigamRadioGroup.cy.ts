import { h } from "vue"
import OrigamRadioGroup from './OrigamRadioGroup.vue'

describe('<OrigamRadioGroup />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(OrigamRadioGroup), {})
    })
})
