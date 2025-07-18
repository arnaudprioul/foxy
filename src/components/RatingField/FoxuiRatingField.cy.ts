import { h } from "vue"
import FoxuiRatingField from './FoxuiRatingField.vue'

describe('<FoxuiRatingField />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(FoxuiRatingField), {})
    })
})
