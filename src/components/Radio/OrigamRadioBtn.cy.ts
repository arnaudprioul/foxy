import { h } from "vue"
import OrigamRadioBtn from './OrigamRadioBtn.vue'

describe('<OrigamRadioBtn />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(OrigamRadioBtn), {})
    })
})
