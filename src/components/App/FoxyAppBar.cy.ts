import { h } from "vue"

import FoxyAppBar from './FoxyAppBar.vue'

describe('<FoxyAppBar />', () => {
    it('props: title', () => {
        cy.mount(h(FoxyAppBar, {
            title: 'Cypress',
            order: 1,
            name: 'appBar'
        }))
    })
})
