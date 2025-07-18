import { h } from "vue"
import OrigamRatingField from './OrigamRatingField.vue'

describe('<OrigamRatingField />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(OrigamRatingField), {})
    })
})
