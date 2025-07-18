import { h } from "vue"
import OrigamProgressCircular from './OrigamProgressCircular.vue'

describe('<OrigamProgressCircular />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(h(OrigamProgressCircular), {})
    })
})
