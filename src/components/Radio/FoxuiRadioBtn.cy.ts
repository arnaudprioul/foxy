import { h } from "vue"
import FoxuiRadioBtn from './FoxuiRadioBtn.vue'

describe('<FoxuiRadioBtn />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(FoxuiRadioBtn), {})
    })
})
